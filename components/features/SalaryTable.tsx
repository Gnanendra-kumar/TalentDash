/* ──────────────────────────────────────────────
   SalaryTable — Server-renderable salary table
   with sortable column headers
   ────────────────────────────────────────────── */

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { Salary, Currency, SortField, SortDirection } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Pagination } from "@/components/ui/Pagination";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatCurrency, formatSalaryField, formatExperience } from "@/lib/utils";
import { PER_PAGE } from "@/lib/constants";
import Link from "next/link";

interface SalaryTableProps {
  salaries: Salary[];
  total: number;
  page: number;
  totalPages: number;
  currency: Currency;
  sortField: SortField;
  sortDirection: SortDirection;
  showCompanyLink?: boolean;
}

/* ─── Column definitions ─────────────────────── */

interface Column {
  key: SortField;
  label: string;
  sortable: boolean;
  className?: string;
}

const COLUMNS: Column[] = [
  { key: "company_name", label: "Company", sortable: true },
  { key: "role", label: "Role", sortable: true },
  { key: "level", label: "Level", sortable: true },
  { key: "location", label: "Location", sortable: true },
  { key: "experience_years", label: "Experience", sortable: true, className: "text-center" },
  { key: "base_salary", label: "Base Salary", sortable: true, className: "text-right" },
  { key: "stock", label: "Stock", sortable: true, className: "text-right" },
  { key: "total_compensation", label: "Total Comp", sortable: true, className: "text-right" },
];

export function SalaryTable({
  salaries,
  total,
  page,
  totalPages,
  currency,
  sortField,
  sortDirection,
  showCompanyLink = true,
}: SalaryTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  /* ── Sort handler → URL ───────────────────── */
  function handleSort(field: SortField) {
    const params = new URLSearchParams(searchParams.toString());
    if (field === sortField) {
      params.set("sortDir", sortDirection === "asc" ? "desc" : "asc");
    } else {
      params.set("sort", field);
      params.set("sortDir", "desc");
    }
    params.delete("page");
    router.push(`?${params.toString()}`, { scroll: false });
  }

  /* ── Page handler → URL ───────────────────── */
  function handlePageChange(newPage: number) {
    const params = new URLSearchParams(searchParams.toString());
    if (newPage <= 1) {
      params.delete("page");
    } else {
      params.set("page", String(newPage));
    }
    router.push(`?${params.toString()}`, { scroll: false });
  }

  if (salaries.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="overflow-hidden rounded-xl border border-[#EBEBEB] bg-white shadow-sm">
      {/* Table wrapper with horizontal scroll on mobile */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-sm">
          {/* Header */}
          <thead>
            <tr className="border-b border-[#EBEBEB] bg-[#FAFAFA]">
              {COLUMNS.map((col) => (
                <th
                  key={col.key}
                  className={`whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#717171] ${col.className ?? ""}`}
                >
                  {col.sortable ? (
                    <button
                      onClick={() => handleSort(col.key)}
                      className="group inline-flex items-center gap-1 transition-colors hover:text-[#222222]"
                    >
                      {col.label}
                      <SortIndicator
                        active={sortField === col.key}
                        direction={sortField === col.key ? sortDirection : "desc"}
                      />
                    </button>
                  ) : (
                    col.label
                  )}
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-[#EBEBEB]">
            {salaries.map((salary) => (
              <tr
                key={salary.id}
                className="transition-colors hover:bg-[#F2F2F2]"
              >
                {/* Company */}
                <td className="whitespace-nowrap px-4 py-3">
                  {showCompanyLink ? (
                    <Link
                      href={`/companies/${salary.company_slug}`}
                      className="font-medium text-[#222222] transition-colors hover:text-[#FF5A5F]"
                    >
                      {salary.company_name}
                    </Link>
                  ) : (
                    <span className="font-medium text-[#222222]">
                      {salary.company_name}
                    </span>
                  )}
                  {!salary.is_verified && (
                    <span className="ml-1.5 inline-flex items-center rounded bg-amber-50 px-1 py-0.5 text-[10px] font-medium text-amber-600">
                      Unverified
                    </span>
                  )}
                </td>

                {/* Role */}
                <td className="whitespace-nowrap px-4 py-3 text-[#484848]">
                  <span className="max-w-[180px] truncate inline-block align-middle">
                    {salary.role}
                  </span>
                </td>

                {/* Level */}
                <td className="whitespace-nowrap px-4 py-3">
                  <Badge level={salary.level} />
                </td>

                {/* Location */}
                <td className="whitespace-nowrap px-4 py-3 text-[#484848]">
                  {salary.location}
                </td>

                {/* Experience */}
                <td className="whitespace-nowrap px-4 py-3 text-center text-[#484848]">
                  {formatExperience(salary.experience_years)}
                </td>

                {/* Base Salary */}
                <td className="whitespace-nowrap px-4 py-3 text-right font-medium text-[#484848]">
                  {formatCurrency(salary.base_salary, currency)}
                </td>

                {/* Stock */}
                <td className="whitespace-nowrap px-4 py-3 text-right text-[#484848]">
                  {formatSalaryField(salary.stock, currency)}
                </td>

                {/* Total Comp — dominant */}
                <td className="whitespace-nowrap px-4 py-3 text-right">
                  <span className="text-base font-bold text-[#0369A1]">
                    {formatCurrency(salary.total_compensation, currency)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {total > PER_PAGE && (
        <Pagination
          page={page}
          totalPages={totalPages}
          total={total}
          perPage={PER_PAGE}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}

/* ─── Sort Indicator ─────────────────────────── */

function SortIndicator({
  active,
  direction,
}: {
  active: boolean;
  direction: SortDirection;
}) {
  return (
    <span className={`ml-0.5 ${active ? "text-[#FF5A5F]" : "text-[#EBEBEB]"}`}>
      {direction === "asc" ? "↑" : "↓"}
    </span>
  );
}
