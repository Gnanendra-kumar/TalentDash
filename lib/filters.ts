/* ──────────────────────────────────────────────
   TalentDash — Filter, Sort & Pagination Logic
   ────────────────────────────────────────────── */

import type {
  Salary,
  FilterParams,
  SortConfig,
  SortField,
  PaginationResult,
  Currency,
} from "@/types";
import { LEVEL_ORDER } from "@/lib/constants";
import { convertCurrency } from "@/lib/utils";

/* ─── Filter ─────────────────────────────────── */

export function filterSalaries(
  salaries: Salary[],
  params: FilterParams
): Salary[] {
  let result = [...salaries];

  // Company text search (case-insensitive partial match)
  if (params.company) {
    const query = params.company.toLowerCase().trim();
    result = result.filter((s) =>
      s.company_name.toLowerCase().includes(query)
    );
  }

  // Role exact match
  if (params.role) {
    result = result.filter((s) => s.role === params.role);
  }

  // Level multi-select
  if (params.level && params.level.length > 0) {
    result = result.filter((s) => params.level!.includes(s.level));
  }

  // Location exact match
  if (params.location) {
    result = result.filter((s) => s.location === params.location);
  }

  return result;
}

/* ─── Currency Conversion ────────────────────── */

/**
 * Convert all salary figures to the display currency.
 */
export function convertSalariesToCurrency(
  salaries: Salary[],
  targetCurrency: Currency
): Salary[] {
  return salaries.map((s) => {
    if (s.currency === targetCurrency) return s;

    return {
      ...s,
      base_salary: convertCurrency(s.base_salary, s.currency, targetCurrency),
      bonus: convertCurrency(s.bonus, s.currency, targetCurrency),
      stock: convertCurrency(s.stock, s.currency, targetCurrency),
      total_compensation: convertCurrency(
        s.total_compensation,
        s.currency,
        targetCurrency
      ),
      currency: targetCurrency,
    };
  });
}

/* ─── Sort ───────────────────────────────────── */

export function sortSalaries(
  salaries: Salary[],
  config: SortConfig
): Salary[] {
  const { field, direction } = config;
  const multiplier = direction === "asc" ? 1 : -1;

  return [...salaries].sort((a, b) => {
    const valA = getSortValue(a, field);
    const valB = getSortValue(b, field);

    if (typeof valA === "string" && typeof valB === "string") {
      return valA.localeCompare(valB) * multiplier;
    }

    return ((valA as number) - (valB as number)) * multiplier;
  });
}

function getSortValue(
  salary: Salary,
  field: SortField
): string | number {
  switch (field) {
    case "company_name":
      return salary.company_name;
    case "role":
      return salary.role;
    case "level":
      return LEVEL_ORDER[salary.level] ?? 0;
    case "location":
      return salary.location;
    case "experience_years":
      return salary.experience_years;
    case "base_salary":
      return salary.base_salary;
    case "stock":
      return salary.stock;
    case "total_compensation":
      return salary.total_compensation;
  }
}

/* ─── Paginate ───────────────────────────────── */

export function paginateSalaries<T>(
  items: T[],
  page: number,
  perPage: number
): PaginationResult<T> {
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * perPage;
  const end = start + perPage;

  return {
    data: items.slice(start, end),
    total,
    page: safePage,
    per_page: perPage,
    total_pages: totalPages,
  };
}
