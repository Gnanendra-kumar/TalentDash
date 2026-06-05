/* ──────────────────────────────────────────────
   Pagination — Prev / Next with record count
   ────────────────────────────────────────────── */

"use client";

interface PaginationProps {
  page: number;
  totalPages: number;
  total: number;
  perPage: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  page,
  totalPages,
  total,
  perPage,
  onPageChange,
}: PaginationProps) {
  const start = (page - 1) * perPage + 1;
  const end = Math.min(page * perPage, total);

  return (
    <div className="flex items-center justify-between border-t border-[#EBEBEB] px-4 py-3 sm:px-6">
      {/* Record count */}
      <p className="text-sm text-[#717171]">
        Showing{" "}
        <span className="font-medium text-[#222222]">{start}</span>
        –
        <span className="font-medium text-[#222222]">{end}</span>
        {" "}of{" "}
        <span className="font-medium text-[#222222]">{total}</span>
        {" "}records
      </p>

      {/* Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="inline-flex items-center rounded-lg border border-[#EBEBEB] bg-white px-3 py-1.5 text-sm font-medium text-[#484848] transition-colors hover:bg-[#F2F2F2] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>

        <span className="px-2 text-sm text-[#717171]">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className="inline-flex items-center rounded-lg border border-[#EBEBEB] bg-white px-3 py-1.5 text-sm font-medium text-[#484848] transition-colors hover:bg-[#F2F2F2] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
