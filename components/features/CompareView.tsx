/* ──────────────────────────────────────────────
   CompareView — Side-by-side salary comparison
   Client component with URL state
   ────────────────────────────────────────────── */

"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Salary, Currency } from "@/types";
import { Badge } from "@/components/ui/Badge";
import {
  formatCurrency,
  formatSalaryField,
  formatExperience,
} from "@/lib/utils";

interface CompareViewProps {
  salaries: Salary[];
}

interface ComparisonRow {
  label: string;
  value1: string;
  value2: string;
  delta?: number;
  isNumeric: boolean;
}

export function CompareView({ salaries }: CompareViewProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [id1, setId1] = useState(searchParams.get("s1") ?? "");
  const [id2, setId2] = useState(searchParams.get("s2") ?? "");
  const [currency] = useState<Currency>("INR");

  const record1 = salaries.find((s) => s.id === id1);
  const record2 = salaries.find((s) => s.id === id2);

  /* ── URL sync ─────────────────────────────── */
  const updateURL = useCallback(
    (s1: string, s2: string) => {
      const params = new URLSearchParams();
      if (s1) params.set("s1", s1);
      if (s2) params.set("s2", s2);
      const query = params.toString();
      router.push(query ? `/compare?${query}` : "/compare", {
        scroll: false,
      });
    },
    [router]
  );

  /* ── Pre-select from company page ─────────── */
  useEffect(() => {
    const companyParam = searchParams.get("company");
    if (companyParam && !id1) {
      const first = salaries.find((s) => s.company_slug === companyParam);
      if (first) {
        setId1(first.id);
        updateURL(first.id, id2);
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Build comparison rows ─────────────────── */
  function buildRows(): ComparisonRow[] {
    if (!record1 || !record2) return [];

    const rows: ComparisonRow[] = [
      {
        label: "Company",
        value1: record1.company_name,
        value2: record2.company_name,
        isNumeric: false,
      },
      {
        label: "Role",
        value1: record1.role,
        value2: record2.role,
        isNumeric: false,
      },
      {
        label: "Level",
        value1: record1.level,
        value2: record2.level,
        isNumeric: false,
      },
      {
        label: "Location",
        value1: record1.location,
        value2: record2.location,
        isNumeric: false,
      },
      {
        label: "Experience",
        value1: formatExperience(record1.experience_years),
        value2: formatExperience(record2.experience_years),
        delta: record1.experience_years - record2.experience_years,
        isNumeric: true,
      },
      {
        label: "Base Salary",
        value1: formatCurrency(record1.base_salary, currency),
        value2: formatCurrency(record2.base_salary, currency),
        delta: record1.base_salary - record2.base_salary,
        isNumeric: true,
      },
      {
        label: "Bonus",
        value1: formatSalaryField(record1.bonus, currency),
        value2: formatSalaryField(record2.bonus, currency),
        delta: record1.bonus - record2.bonus,
        isNumeric: true,
      },
      {
        label: "Stock",
        value1: formatSalaryField(record1.stock, currency),
        value2: formatSalaryField(record2.stock, currency),
        delta: record1.stock - record2.stock,
        isNumeric: true,
      },
      {
        label: "Total Compensation",
        value1: formatCurrency(record1.total_compensation, currency),
        value2: formatCurrency(record2.total_compensation, currency),
        delta: record1.total_compensation - record2.total_compensation,
        isNumeric: true,
      },
    ];

    return rows;
  }

  const rows = buildRows();
  const winner =
    record1 && record2
      ? record1.total_compensation >= record2.total_compensation
        ? 1
        : 2
      : null;

  /* ── Salary record label for dropdown ──────── */
  function getLabel(s: Salary) {
    return `${s.company_name} · ${s.role} · ${s.level} · ${s.location}`;
  }

  return (
    <div className="space-y-6">
      {/* Selectors */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Record A */}
        <div className="rounded-xl border border-[#EBEBEB] bg-white p-4 shadow-sm">
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#717171]">
            Record A
          </label>
          <select
            id="compare-record-a"
            value={id1}
            onChange={(e) => {
              setId1(e.target.value);
              updateURL(e.target.value, id2);
            }}
            className="w-full cursor-pointer rounded-lg border border-[#EBEBEB] bg-white py-2.5 pl-3 pr-8 text-sm text-[#222222] transition-colors focus:border-[#FF5A5F] focus:outline-none focus:ring-1 focus:ring-[#FF5A5F]/30"
          >
            <option value="">Select a salary record</option>
            {salaries.map((s) => (
              <option key={s.id} value={s.id}>
                {getLabel(s)}
              </option>
            ))}
          </select>
          {record1 && winner === 1 && (
            <span className="mt-2 inline-flex items-center rounded-full bg-[#0369A1]/10 px-2.5 py-0.5 text-xs font-semibold text-[#0369A1]">
              ✓ Higher TC
            </span>
          )}
        </div>

        {/* Record B */}
        <div className="rounded-xl border border-[#EBEBEB] bg-white p-4 shadow-sm">
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#717171]">
            Record B
          </label>
          <select
            id="compare-record-b"
            value={id2}
            onChange={(e) => {
              setId2(e.target.value);
              updateURL(id1, e.target.value);
            }}
            className="w-full cursor-pointer rounded-lg border border-[#EBEBEB] bg-white py-2.5 pl-3 pr-8 text-sm text-[#222222] transition-colors focus:border-[#FF5A5F] focus:outline-none focus:ring-1 focus:ring-[#FF5A5F]/30"
          >
            <option value="">Select a salary record</option>
            {salaries.map((s) => (
              <option key={s.id} value={s.id}>
                {getLabel(s)}
              </option>
            ))}
          </select>
          {record2 && winner === 2 && (
            <span className="mt-2 inline-flex items-center rounded-full bg-[#0369A1]/10 px-2.5 py-0.5 text-xs font-semibold text-[#0369A1]">
              ✓ Higher TC
            </span>
          )}
        </div>
      </div>

      {/* Comparison table */}
      {record1 && record2 ? (
        <div className="overflow-hidden rounded-xl border border-[#EBEBEB] bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#EBEBEB] bg-[#FAFAFA]">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#717171]">
                  Field
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-[#717171]">
                  Record A
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-[#717171]">
                  Record B
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-[#717171]">
                  Delta
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EBEBEB]">
              {rows.map((row) => (
                <tr
                  key={row.label}
                  className={`transition-colors hover:bg-[#F2F2F2] ${
                    row.label === "Total Compensation"
                      ? "bg-[#F7FBFF]"
                      : ""
                  }`}
                >
                  <td className="px-4 py-3 font-medium text-[#222222]">
                    {row.label}
                  </td>
                  <td className="px-4 py-3 text-right text-[#484848]">
                    {row.label === "Level" && record1 ? (
                      <Badge level={record1.level} />
                    ) : row.label === "Total Compensation" ? (
                      <span className="text-base font-bold text-[#0369A1]">
                        {row.value1}
                      </span>
                    ) : (
                      row.value1
                    )}
                  </td>
                  <td className="px-4 py-3 text-right text-[#484848]">
                    {row.label === "Level" && record2 ? (
                      <Badge level={record2.level} />
                    ) : row.label === "Total Compensation" ? (
                      <span className="text-base font-bold text-[#0369A1]">
                        {row.value2}
                      </span>
                    ) : (
                      row.value2
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {row.isNumeric && row.delta !== undefined ? (
                      <DeltaDisplay
                        delta={row.delta}
                        currency={currency}
                        isExperience={row.label === "Experience"}
                      />
                    ) : (
                      <span className="text-[#717171]">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-[#EBEBEB] bg-white py-16">
          <svg
            className="mb-3 h-12 w-12 text-[#EBEBEB]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
            />
          </svg>
          <p className="text-sm text-[#717171]">
            Select two salary records above to compare
          </p>
        </div>
      )}
    </div>
  );
}

/* ─── Delta Display ──────────────────────────── */

function DeltaDisplay({
  delta,
  currency,
  isExperience,
}: {
  delta: number;
  currency: Currency;
  isExperience: boolean;
}) {
  if (delta === 0) {
    return <span className="text-[#717171]">—</span>;
  }

  const isPositive = delta > 0;
  const color = isPositive ? "text-[#008A05]" : "text-[#D93025]";
  const sign = isPositive ? "+" : "";

  if (isExperience) {
    return (
      <span className={`font-medium ${color}`}>
        {sign}{delta} yrs
      </span>
    );
  }

  return (
    <span className={`font-medium ${color}`}>
      {sign}{formatCurrency(Math.abs(delta), currency)}
    </span>
  );
}
