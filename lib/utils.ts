/* ──────────────────────────────────────────────
   TalentDash — Utility Functions
   ────────────────────────────────────────────── */

import type { Currency, Salary, LevelStandard, LevelCount } from "@/types";
import { CURRENCY_RATES, CURRENCY_SYMBOLS } from "@/lib/constants";

/* ─── Class Names ────────────────────────────── */

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

/* ─── Currency Formatting ────────────────────── */

/**
 * Format amount in Indian numbering system (lakh/crore) for INR,
 * or standard international commas for other currencies.
 *
 * Amounts are stored in base units (paise for INR, cents for USD).
 * We convert to major units first.
 */
export function formatCurrency(
  amountInBaseUnits: number,
  currency: Currency
): string {
  const symbol = CURRENCY_SYMBOLS[currency];
  const majorUnits = amountInBaseUnits / 100;

  if (currency === "INR") {
    return `${symbol}${formatIndianNumber(majorUnits)}`;
  }

  return `${symbol}${majorUnits.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
}

/**
 * Format a number using Indian comma system:
 * 1,00,000 (1 lakh) / 1,00,00,000 (1 crore)
 */
function formatIndianNumber(num: number): string {
  const str = Math.round(num).toString();
  if (str.length <= 3) return str;

  let result = str.slice(-3);
  let remaining = str.slice(0, -3);

  while (remaining.length > 0) {
    const chunk = remaining.slice(-2);
    result = chunk + "," + result;
    remaining = remaining.slice(0, -2);
  }

  return result;
}

/**
 * Convert amount from one currency to another.
 * Both amounts are in base units (paise/cents).
 */
export function convertCurrency(
  amountInBaseUnits: number,
  from: Currency,
  to: Currency
): number {
  if (from === to) return amountInBaseUnits;

  // Convert to INR base units first, then to target
  const inINR = (amountInBaseUnits / 100) * CURRENCY_RATES[from];
  const inTarget = inINR / CURRENCY_RATES[to];

  return Math.round(inTarget * 100);
}

/**
 * Format a salary amount for display. Returns em-dash for 0.
 */
export function formatSalaryField(
  amountInBaseUnits: number,
  currency: Currency
): string {
  if (amountInBaseUnits === 0) return "—";
  return formatCurrency(amountInBaseUnits, currency);
}

/* ─── Statistics ─────────────────────────────── */

/**
 * Compute median of an array of numbers.
 */
export function computeMedian(values: number[]): number {
  if (values.length === 0) return 0;

  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return Math.round((sorted[mid - 1] + sorted[mid]) / 2);
  }

  return sorted[mid];
}

/**
 * Compute level distribution for a set of salary records.
 */
export function computeLevelDistribution(salaries: Salary[]): LevelCount[] {
  const counts = new Map<LevelStandard, number>();

  for (const s of salaries) {
    counts.set(s.level, (counts.get(s.level) ?? 0) + 1);
  }

  const total = salaries.length;

  return Array.from(counts.entries())
    .map(([level, count]) => ({
      level,
      count,
      percentage: total > 0 ? Math.round((count / total) * 100) : 0,
    }))
    .sort((a, b) => b.count - a.count);
}

/* ─── Slug ───────────────────────────────────── */

/**
 * Generate URL-safe slug from company name.
 */
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/* ─── Formatting ─────────────────────────────── */

/**
 * Format experience years for display.
 */
export function formatExperience(years: number): string {
  if (years === 1) return "1 yr";
  return `${years} yrs`;
}

/**
 * Compute total compensation server-side.
 * RULE: base + (bonus ?? 0) + (stock ?? 0)
 */
export function computeTotalCompensation(
  base: number,
  bonus: number,
  stock: number
): number {
  return base + (bonus ?? 0) + (stock ?? 0);
}
