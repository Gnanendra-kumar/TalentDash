/* ──────────────────────────────────────────────
   /compare — Side-by-side salary comparison
   ISR: revalidates every 300s (5 minutes).
   ────────────────────────────────────────────── */

import type { Metadata } from "next";
import { Suspense } from "react";
import type { Currency, LevelStandard, Salary } from "@/types";
import { prisma } from "@/lib/db";
import { safeQuery } from "@/lib/safe-query";
import { CompareView } from "@/components/features/CompareView";

export const revalidate = 300;

const LEVEL_DB_TO_DISPLAY: Record<string, LevelStandard> = {
  L3: "L3", L4: "L4", L5: "L5", L6: "L6",
  SDE_I: "SDE-I", SDE_II: "SDE-II", SDE_III: "SDE-III",
  STAFF: "Staff", PRINCIPAL: "Principal", IC4: "IC4", IC5: "IC5",
};

export const metadata: Metadata = {
  title: "Compare Salaries",
  description:
    "Compare two salary records side by side. See the delta in base salary, stock, bonus, and total compensation.",
};

export default async function ComparePage() {
  const dbSalaries = await safeQuery(
    () => prisma.salary.findMany({
      include: { company: { select: { name: true, slug: true } } },
      orderBy: { totalCompensation: "desc" },
    }),
    []
  );

  const salaries: Salary[] = dbSalaries.map((s) => ({
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

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#222222] sm:text-3xl">
          Compare Salaries
        </h1>
        <p className="mt-1 text-sm text-[#717171]">
          Select two salary records to see a detailed side-by-side comparison
        </p>
      </div>

      <Suspense
        fallback={
          <div className="flex items-center justify-center py-16">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#EBEBEB] border-t-[#FF5A5F]" />
          </div>
        }
      >
        <CompareView salaries={salaries} />
      </Suspense>
    </div>
  );
}
