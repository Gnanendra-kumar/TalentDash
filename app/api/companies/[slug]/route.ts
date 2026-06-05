/* ──────────────────────────────────────────────
   GET /api/companies/:slug
   
   Returns company metadata, full salary list,
   server-side computed median TC, and level
   distribution counts.
   ────────────────────────────────────────────── */

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export async function GET(_request: NextRequest, context: RouteContext) {
  const { slug } = await context.params;

  /* ── Find company ────────────────────────── */
  const company = await prisma.company.findUnique({
    where: { slug },
    include: {
      salaries: {
        orderBy: { totalCompensation: "desc" },
      },
    },
  });

  if (!company) {
    return NextResponse.json(
      { error: true, message: "Company not found" },
      { status: 404 }
    );
  }

  /* ── Compute median total compensation ───── */
  const tcValues = company.salaries
    .map((s) => Number(s.totalCompensation))
    .sort((a, b) => a - b);

  let medianTotalCompensation = 0;
  if (tcValues.length > 0) {
    const mid = Math.floor(tcValues.length / 2);
    medianTotalCompensation =
      tcValues.length % 2 === 0
        ? Math.round((tcValues[mid - 1] + tcValues[mid]) / 2)
        : tcValues[mid];
  }

  /* ── Compute level distribution ──────────── */
  const levelDistribution: Record<string, number> = {};
  for (const salary of company.salaries) {
    levelDistribution[salary.level] =
      (levelDistribution[salary.level] ?? 0) + 1;
  }

  /* ── Serialize ───────────────────────────── */
  const salaryData = company.salaries.map((s) => ({
    id: s.id,
    company_id: s.companyId,
    role: s.role,
    level: s.level,
    location: s.location,
    currency: s.currency,
    experience_years: s.experienceYears,
    base_salary: Number(s.baseSalary),
    bonus: Number(s.bonus),
    stock: Number(s.stock),
    total_compensation: Number(s.totalCompensation),
    source: s.source,
    confidence_score: Number(s.confidenceScore),
    is_verified: s.isVerified,
    submitted_at: s.submittedAt.toISOString(),
  }));

  return NextResponse.json(
    {
      id: company.id,
      name: company.name,
      slug: company.slug,
      normalized_name: company.normalizedName,
      industry: company.industry,
      headquarters: company.headquarters,
      founded_year: company.foundedYear,
      headcount_range: company.headcountRange,
      created_at: company.createdAt.toISOString(),
      updated_at: company.updatedAt.toISOString(),
      salaries: salaryData,
      median_total_compensation: medianTotalCompensation,
      level_distribution: levelDistribution,
      record_count: company.salaries.length,
    },
    {
      headers: {
        "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
      },
    }
  );
}
