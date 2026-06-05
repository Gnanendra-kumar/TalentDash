/* ──────────────────────────────────────────────
   TalentDash — Core Type Definitions
   ────────────────────────────────────────────── */

/** Standardised engineering levels */
export type LevelStandard =
  | "L3"
  | "L4"
  | "L5"
  | "L6"
  | "SDE-I"
  | "SDE-II"
  | "SDE-III"
  | "Staff"
  | "Principal"
  | "IC4"
  | "IC5";

/** Supported currencies */
export type Currency = "INR" | "USD" | "GBP" | "EUR";

/** Data source origin */
export type Source = "CONTRIBUTOR" | "SCRAPED" | "AI_INFERRED";

/* ─── Company ───────────────────────────────── */

export interface Company {
  id: string;
  name: string;
  slug: string;
  normalized_name: string;
  industry: string;
  headquarters: string;
  founded_year: number | null;
  headcount_range: string | null;
  created_at: string;
  updated_at: string;
}

/* ─── Salary ────────────────────────────────── */

export interface Salary {
  id: string;
  company_id: string;
  company_name: string;
  company_slug: string;
  role: string;
  level: LevelStandard;
  location: string;
  currency: Currency;
  experience_years: number;
  base_salary: number;
  bonus: number;
  stock: number;
  total_compensation: number;
  source: Source;
  confidence_score: number;
  is_verified: boolean;
  submitted_at: string;
}

/* ─── Filter / Sort / Pagination ────────────── */

export interface FilterParams {
  company?: string;
  role?: string;
  level?: LevelStandard[];
  location?: string;
  currency?: Currency;
}

export type SortField =
  | "company_name"
  | "role"
  | "level"
  | "location"
  | "experience_years"
  | "base_salary"
  | "stock"
  | "total_compensation";

export type SortDirection = "asc" | "desc";

export interface SortConfig {
  field: SortField;
  direction: SortDirection;
}

export interface PaginationResult<T> {
  data: T[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

/* ─── Level Distribution (company page) ────── */

export interface LevelCount {
  level: LevelStandard;
  count: number;
  percentage: number;
}

/* ─── Compare ────────────────────────────────── */

export interface ComparisonDelta {
  field: string;
  label: string;
  value1: number;
  value2: number;
  delta: number;
  percentage: number;
}

/* ─── API Responses ──────────────────────────── */

export interface ApiError {
  error: string;
  details?: Record<string, string>;
}

export interface CompanyDetail extends Company {
  salaries: Salary[];
  median_compensation: number;
  min_compensation: number;
  max_compensation: number;
  record_count: number;
  level_distribution: LevelCount[];
}
