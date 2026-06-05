/* ──────────────────────────────────────────────
   EmptyState — No-results message with CTA
   ────────────────────────────────────────────── */

import Link from "next/link";

interface EmptyStateProps {
  message?: string;
  clearHref?: string;
}

export function EmptyState({
  message = "No records found for these filters.",
  clearHref = "/salaries",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      {/* Icon */}
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#F7F7F7]">
        <svg
          className="h-8 w-8 text-[#717171]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </div>

      <p className="text-base font-medium text-[#484848] text-center">
        {message}
      </p>
      <p className="mt-1 text-sm text-[#717171]">
        Try removing a filter.
      </p>

      <Link
        href={clearHref}
        className="mt-4 inline-flex items-center rounded-lg bg-[#FF5A5F] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#E04E53]"
      >
        Clear all filters
      </Link>
    </div>
  );
}
