/* ──────────────────────────────────────────────
   /companies/[slug] — Company detail page
   
   generateStaticParams queries real database at
   build time — new companies auto-deploy.
   
   ISR: revalidates every 3600s (1 hour).
   ────────────────────────────────────────────── */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Currency, SortField, SortDirection, LevelStandard, Salary, Company } from "@/types";
import { prisma } from "@/lib/db";
import { safeQuery } from "@/lib/safe-query";
import { sortSalaries, paginateSalaries, convertSalariesToCurrency } from "@/lib/filters";
import { computeMedian, computeLevelDistribution } from "@/lib/utils";
import { CompanyHeader } from "@/components/features/CompanyHeader";
import { CompensationOverview } from "@/components/features/CompensationOverview";
import { LevelDistribution } from "@/components/features/LevelDistribution";
import { SalaryTable } from "@/components/features/SalaryTable";
import { PER_PAGE } from "@/lib/constants";

export const revalidate = 3600; // ISR: revalidate every 1 hour

/* ── Level enum mapping ──────────────────────── */
const LEVEL_DB_TO_DISPLAY: Record<string, LevelStandard> = {
  L3: "L3", L4: "L4", L5: "L5", L6: "L6",
  SDE_I: "SDE-I", SDE_II: "SDE-II", SDE_III: "SDE-III",
  STAFF: "Staff", PRINCIPAL: "Principal", IC4: "IC4", IC5: "IC5",
};

/* ── Dynamic Metadata ────────────────────────── */

interface CompanyPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata({
  params,
}: CompanyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const company = await safeQuery(
    () => prisma.company.findUnique({ where: { slug } }),
    null
  );

  if (!company) {
    return { title: "Company Not Found" };
  }

  return {
    title: `${company.name} Salaries`,
    description: `Explore salary data for ${company.name}. See compensation breakdown by level, role, and location.`,
  };
}

/* ── Static Params from REAL DATABASE ────────── */

export async function generateStaticParams() {
  const companies = await safeQuery(
    () => prisma.company.findMany({ select: { slug: true } }),
    []
  );
  return companies.map((c) => ({ slug: c.slug }));
}

/* ── Page Component ──────────────────────────── */

export default async function CompanyPage({
  params,
  searchParams,
}: CompanyPageProps) {
  const { slug } = await params;
  const sp = await searchParams;

  /* ── Fetch company + salaries from database ─── */
  const dbCompany = await safeQuery(
    () => prisma.company.findUnique({
      where: { slug },
      include: {
        salaries: { orderBy: { totalCompensation: "desc" } },
      },
    }),
    null
  );

  if (!dbCompany) notFound();

  /* ── Map to frontend Company type ──────────── */
  const company: Company = {
    id: dbCompany.id,
    name: dbCompany.name,
    slug: dbCompany.slug,
    normalized_name: dbCompany.normalizedName,
    industry: dbCompany.industry,
    headquarters: dbCompany.headquarters,
    founded_year: dbCompany.foundedYear,
    headcount_range: dbCompany.headcountRange,
    created_at: dbCompany.createdAt.toISOString(),
    updated_at: dbCompany.updatedAt.toISOString(),
  };

  /* ── Map salaries to frontend Salary type ───── */
  const companySalaries: Salary[] = dbCompany.salaries.map((s) => ({
    id: s.id,
    company_id: s.companyId,
    company_name: dbCompany.name,
    company_slug: dbCompany.slug,
    role: s.role,
    level: LEVEL_DB_TO_DISPLAY[s.level] ?? s.level as LevelStandard,
    location: s.location,
    currency: s.currency as Currency,
    experience_years: s.experienceYears,
    base_salary: Number(s.baseSalary),
    bonus: Number(s.bonus),
    stock: Number(s.stock),
    total_compensation: Number(s.totalCompensation),
    source: s.source as "CONTRIBUTOR" | "SCRAPED" | "AI_INFERRED",
    confidence_score: Number(s.confidenceScore),
    is_verified: s.isVerified,
    submitted_at: s.submittedAt.toISOString(),
  }));

  /* ── Parse sort / pagination params ────────── */
  const currency: Currency =
    (typeof sp.currency === "string" ? sp.currency : "INR") as Currency;
  const sortField: SortField =
    (typeof sp.sort === "string" ? sp.sort : "total_compensation") as SortField;
  const sortDirection: SortDirection =
    (typeof sp.sortDir === "string" ? sp.sortDir : "desc") as SortDirection;
  const page = Math.max(
    1,
    parseInt(typeof sp.page === "string" ? sp.page : "1", 10) || 1
  );

  /* ── Pipeline: convert → sort → paginate ───── */
  const converted = convertSalariesToCurrency(companySalaries, currency);
  const sorted = sortSalaries(converted, {
    field: sortField,
    direction: sortDirection,
  });
  const { data, total, page: safePage, total_pages } = paginateSalaries(
    sorted,
    page,
    PER_PAGE
  );

  /* ── Statistics ────────────────────────────── */
  const tcValues = converted.map((s) => s.total_compensation);
  const median = computeMedian(tcValues);
  const min = tcValues.length > 0 ? Math.min(...tcValues) : 0;
  const max = tcValues.length > 0 ? Math.max(...tcValues) : 0;

  /* ── Level Distribution ────────────────────── */
  const distribution = computeLevelDistribution(companySalaries);

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
      <CompanyHeader company={company} />

      <CompensationOverview
        median={median}
        min={min}
        max={max}
        recordCount={companySalaries.length}
        currency={currency}
      />

      <LevelDistribution distribution={distribution} />

      <div>
        <h2 className="mb-4 text-lg font-semibold text-[#222222]">
          All Salary Records
        </h2>
        <SalaryTable
          salaries={data}
          total={total}
          page={safePage}
          totalPages={total_pages}
          currency={currency}
          sortField={sortField}
          sortDirection={sortDirection}
          showCompanyLink={false}
        />
      </div>
    </div>
  );
}
