/* ──────────────────────────────────────────────
   /salaries — Primary product page
   Server component that reads URL search params,
   queries the real PostgreSQL database via Prisma,
   then renders FilterBar + SalaryTable.
   
   ISR: revalidates every 300s (5 minutes).
   ────────────────────────────────────────────── */

import type { Metadata } from "next";
import { Suspense } from "react";
import type { Currency, SortField, SortDirection, LevelStandard, Salary } from "@/types";
import { prisma } from "@/lib/db";
import { safeQuery } from "@/lib/safe-query";
import { filterSalaries, sortSalaries, paginateSalaries, convertSalariesToCurrency } from "@/lib/filters";
import { FilterBar } from "@/components/features/FilterBar";
import { SalaryTable } from "@/components/features/SalaryTable";
import { PER_PAGE } from "@/lib/constants";

export const revalidate = 300; // ISR: revalidate every 5 minutes

export const metadata: Metadata = {
  title: "Salaries",
  description:
    "Browse and compare tech salaries across India's top companies. Filter by company, role, level, and location.",
};

interface SalariesPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

/* ── Level enum mapping (Prisma uses SDE_I, frontend uses SDE-I) */
const LEVEL_DB_TO_DISPLAY: Record<string, LevelStandard> = {
  L3: "L3", L4: "L4", L5: "L5", L6: "L6",
  SDE_I: "SDE-I", SDE_II: "SDE-II", SDE_III: "SDE-III",
  STAFF: "Staff", PRINCIPAL: "Principal", IC4: "IC4", IC5: "IC5",
};

export default async function SalariesPage({ searchParams }: SalariesPageProps) {
  const params = await searchParams;

  /* ── Parse search params ───────────────────── */
  const company = typeof params.company === "string" ? params.company : "";
  const role = typeof params.role === "string" ? params.role : "";
  const levelParam = typeof params.level === "string" ? params.level : "";
  const levels = levelParam
    ? (levelParam.split(",") as LevelStandard[])
    : [];
  const location = typeof params.location === "string" ? params.location : "";
  const currency: Currency =
    (typeof params.currency === "string" ? params.currency : "INR") as Currency;
  const sortField: SortField =
    (typeof params.sort === "string" ? params.sort : "total_compensation") as SortField;
  const sortDirection: SortDirection =
    (typeof params.sortDir === "string" ? params.sortDir : "desc") as SortDirection;
  const page = Math.max(
    1,
    parseInt(typeof params.page === "string" ? params.page : "1", 10) || 1
  );

  /* ── Query database (safe — returns [] if no DB) */
  const dbSalaries = await safeQuery(
    () => prisma.salary.findMany({
      include: { company: { select: { name: true, slug: true } } },
      orderBy: { totalCompensation: "desc" },
    }),
    []
  );

  /* ── Transform to frontend Salary type ─────── */
  const allSalaries: Salary[] = dbSalaries.map((s) => ({
    id: s.id,
    company_id: s.companyId,
    company_name: s.company.name,
    company_slug: s.company.slug,
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

  /* ── Pipeline: filter → convert → sort → paginate */
  const filtered = filterSalaries(allSalaries, {
    company,
    role,
    level: levels.length > 0 ? levels : undefined,
    location,
    currency,
  });

  const converted = convertSalariesToCurrency(filtered, currency);

  const sorted = sortSalaries(converted, {
    field: sortField,
    direction: sortDirection,
  });

  const { data, total, page: safePage, total_pages } = paginateSalaries(
    sorted,
    page,
    PER_PAGE
  );

  /* ── Unique roles / locations for filter dropdowns */
  const uniqueRoles = [...new Set(allSalaries.map((s) => s.role))].sort();
  const uniqueLocations = [...new Set(allSalaries.map((s) => s.location))].sort();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Page title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#222222] sm:text-3xl">
          Salary Explorer
        </h1>
        <p className="mt-1 text-sm text-[#717171]">
          Browse {allSalaries.length} verified salary records across{" "}
          {new Set(allSalaries.map((s) => s.company_name)).size} companies
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6">
        <Suspense
          fallback={
            <div className="h-[72px] animate-pulse rounded-xl border border-[#EBEBEB] bg-white" />
          }
        >
          <FilterBar roles={uniqueRoles} locations={uniqueLocations} />
        </Suspense>
      </div>

      {/* Table */}
      <Suspense
        fallback={
          <div className="flex items-center justify-center py-16">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#EBEBEB] border-t-[#FF5A5F]" />
          </div>
        }
      >
        <SalaryTable
          salaries={data}
          total={total}
          page={safePage}
          totalPages={total_pages}
          currency={currency}
          sortField={sortField}
          sortDirection={sortDirection}
        />
      </Suspense>
    </div>
  );
}
