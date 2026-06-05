/* ──────────────────────────────────────────────
   Shared data helpers for page sections
   
   Provides real company + salary stats from the
   database. Falls back gracefully during build.
   ────────────────────────────────────────────── */

import { prisma } from "@/lib/db";
import { safeQuery } from "@/lib/safe-query";

export interface CompanySummary {
  name: string;
  slug: string;
  industry: string;
  headquarters: string;
  salaryCount: number;
  avgTC: number;  // average total compensation (in paise/cents)
  minTC: number;
  maxTC: number;
}

/**
 * Get all companies with salary stats from the database.
 */
export async function getCompaniesWithStats(): Promise<CompanySummary[]> {
  const companies = await safeQuery(
    () =>
      prisma.company.findMany({
        include: {
          salaries: {
            select: {
              totalCompensation: true,
            },
          },
        },
        orderBy: { name: "asc" },
      }),
    []
  );

  return companies.map((c) => {
    const tcs = c.salaries.map((s) => Number(s.totalCompensation));
    const total = tcs.reduce((a, b) => a + b, 0);
    return {
      name: c.name,
      slug: c.slug,
      industry: c.industry,
      headquarters: c.headquarters,
      salaryCount: c.salaries.length,
      avgTC: tcs.length > 0 ? Math.round(total / tcs.length) : 0,
      minTC: tcs.length > 0 ? Math.min(...tcs) : 0,
      maxTC: tcs.length > 0 ? Math.max(...tcs) : 0,
    };
  });
}

/**
 * Get global stats across all salary records.
 */
export async function getGlobalStats() {
  const [companyCount, salaryCount] = await Promise.all([
    safeQuery(() => prisma.company.count(), 0),
    safeQuery(() => prisma.salary.count(), 0),
  ]);

  const salaries = await safeQuery(
    () =>
      prisma.salary.findMany({
        select: { totalCompensation: true },
      }),
    []
  );

  const tcs = salaries.map((s) => Number(s.totalCompensation));
  const total = tcs.reduce((a, b) => a + b, 0);
  const avgTC = tcs.length > 0 ? Math.round(total / tcs.length) : 0;

  return {
    companyCount,
    salaryCount,
    avgTC,
  };
}
