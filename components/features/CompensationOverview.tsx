/* ──────────────────────────────────────────────
   CompensationOverview — Median, Min, Max cards
   ────────────────────────────────────────────── */

import { formatCurrency } from "@/lib/utils";
import type { Currency } from "@/types";

interface CompensationOverviewProps {
  median: number;
  min: number;
  max: number;
  recordCount: number;
  currency: Currency;
}

export function CompensationOverview({
  median,
  min,
  max,
  recordCount,
  currency,
}: CompensationOverviewProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* Median TC */}
      <div className="rounded-xl border border-[#EBEBEB] bg-white p-5 shadow-sm">
        <p className="text-xs font-medium uppercase tracking-wider text-[#717171]">
          Median Total Comp
        </p>
        <p className="mt-2 text-3xl font-bold text-[#0369A1]">
          {formatCurrency(median, currency)}
        </p>
      </div>

      {/* Min TC */}
      <div className="rounded-xl border border-[#EBEBEB] bg-white p-5 shadow-sm">
        <p className="text-xs font-medium uppercase tracking-wider text-[#717171]">
          Min Total Comp
        </p>
        <p className="mt-2 text-2xl font-bold text-[#484848]">
          {formatCurrency(min, currency)}
        </p>
      </div>

      {/* Max TC */}
      <div className="rounded-xl border border-[#EBEBEB] bg-white p-5 shadow-sm">
        <p className="text-xs font-medium uppercase tracking-wider text-[#717171]">
          Max Total Comp
        </p>
        <p className="mt-2 text-2xl font-bold text-[#484848]">
          {formatCurrency(max, currency)}
        </p>
      </div>

      {/* Record count */}
      <div className="rounded-xl border border-[#EBEBEB] bg-white p-5 shadow-sm">
        <p className="text-xs font-medium uppercase tracking-wider text-[#717171]">
          Salary Records
        </p>
        <p className="mt-2 text-2xl font-bold text-[#222222]">
          {recordCount}
        </p>
        <p className="mt-1 text-xs text-[#717171]">
          verified &amp; unverified
        </p>
      </div>
    </div>
  );
}
