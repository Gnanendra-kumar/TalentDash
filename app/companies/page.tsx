/* ──────────────────────────────────────────────
   /companies — Company listing page
   Queries real database for all companies with
   computed stats (median TC, record count, roles).
   
   ISR: revalidates every 3600s (1 hour).
   ────────────────────────────────────────────── */

import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { safeQuery } from "@/lib/safe-query";
import { formatCurrency } from "@/lib/utils";

export const revalidate = 3600; // ISR: revalidate every 1 hour

export const metadata: Metadata = {
  title: "Companies",
  description:
    "Browse salary data by company. See compensation stats for Google, Amazon, Meta, Microsoft, NVIDIA, and more.",
};

export default async function CompaniesPage() {
  /* ── Fetch all companies with salary data ───── */
  const dbCompanies = await safeQuery(
    () => prisma.company.findMany({
      include: {
        salaries: {
          select: { totalCompensation: true, role: true },
        },
      },
      orderBy: { name: "asc" },
    }),
    []
  );

  /* ── Compute per-company stats ─────────────── */
  const companyStats = dbCompanies.map((company) => {
    const tcValues = company.salaries
      .map((s) => Number(s.totalCompensation))
      .sort((a, b) => a - b);

    let median = 0;
    if (tcValues.length > 0) {
      const mid = Math.floor(tcValues.length / 2);
      median =
        tcValues.length % 2 === 0
          ? Math.round((tcValues[mid - 1] + tcValues[mid]) / 2)
          : tcValues[mid];
    }

    const recordCount = company.salaries.length;
    const roles = new Set(company.salaries.map((s) => s.role)).size;

    return { company, median, recordCount, roles };
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#222222] sm:text-3xl">
          Companies
        </h1>
        <p className="mt-1 text-sm text-[#717171]">
          Browse salary data across {dbCompanies.length} companies
        </p>
      </div>

      {dbCompanies.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#F7F7F7]">
            <svg className="h-8 w-8 text-[#717171]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
            </svg>
          </div>
          <h3 className="text-base font-semibold text-[#222222]">No companies yet</h3>
          <p className="mt-1 text-sm text-[#717171]">Run <code className="rounded bg-[#F7F7F7] px-1.5 py-0.5 text-xs">npx prisma db seed</code> to populate the database.</p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {companyStats.map(({ company, median, recordCount, roles }) => (
          <Link
            key={company.id}
            href={`/companies/${company.slug}`}
            className="group flex flex-col rounded-2xl border border-[#EBEBEB] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-[#FF5A5F]/30"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F7F7F7] text-lg font-bold text-[#484848] transition-colors group-hover:bg-[#FF5A5F]/10 group-hover:text-[#FF5A5F]">
                {company.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-base font-semibold text-[#222222] group-hover:text-[#FF5A5F] transition-colors">
                  {company.name}
                </h2>
                <span className="text-xs text-[#717171]">
                  {company.industry}
                </span>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3 border-t border-[#EBEBEB] pt-4">
              <div>
                <p className="text-xs font-medium text-[#717171]">Median TC</p>
                <p className="mt-0.5 text-sm font-bold text-[#0369A1]">
                  {formatCurrency(median, "INR")}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-[#717171]">Records</p>
                <p className="mt-0.5 text-sm font-bold text-[#222222]">
                  {recordCount}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-[#717171]">Roles</p>
                <p className="mt-0.5 text-sm font-bold text-[#222222]">
                  {roles}
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3 text-xs text-[#717171]">
              <span className="flex items-center gap-1">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                {company.headquarters}
              </span>
              <span>·</span>
              <span>{company.headcountRange ?? "—"}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
