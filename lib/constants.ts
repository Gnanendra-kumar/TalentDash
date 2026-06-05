/* ──────────────────────────────────────────────
   TalentDash — Constants & Configuration
   ────────────────────────────────────────────── */

import type { LevelStandard, Currency } from "@/types";

/* ─── Level Badge Colors (Tailwind classes) ── */

export const LEVEL_BADGE_STYLES: Record<
  LevelStandard,
  { bg: string; text: string }
> = {
  L3:        { bg: "bg-slate-100",  text: "text-slate-700" },
  "SDE-I":   { bg: "bg-slate-100",  text: "text-slate-700" },
  L4:        { bg: "bg-blue-100",   text: "text-blue-700" },
  "SDE-II":  { bg: "bg-blue-100",   text: "text-blue-700" },
  L5:        { bg: "bg-indigo-100", text: "text-indigo-700" },
  "SDE-III": { bg: "bg-indigo-100", text: "text-indigo-700" },
  L6:        { bg: "bg-purple-100", text: "text-purple-700" },
  Staff:     { bg: "bg-purple-100", text: "text-purple-700" },
  Principal: { bg: "bg-[#1e3a5f]/10", text: "text-[#1e3a5f]" },
  IC4:       { bg: "bg-blue-100",   text: "text-blue-700" },
  IC5:       { bg: "bg-indigo-100", text: "text-indigo-700" },
};

/* ─── Level Ordering (for sorting) ───────────── */

export const LEVEL_ORDER: Record<LevelStandard, number> = {
  L3: 1,
  "SDE-I": 1,
  L4: 2,
  "SDE-II": 2,
  IC4: 2,
  L5: 3,
  "SDE-III": 3,
  IC5: 3,
  L6: 4,
  Staff: 4,
  Principal: 5,
};

/* ─── Currency ───────────────────────────────── */

/** Conversion rates to INR (base currency) */
export const CURRENCY_RATES: Record<Currency, number> = {
  INR: 1,
  USD: 83,
  GBP: 105,
  EUR: 90,
};

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  INR: "₹",
  USD: "$",
  GBP: "£",
  EUR: "€",
};

/* ─── Pagination ─────────────────────────────── */

export const PER_PAGE = 25;
export const MAX_API_LIMIT = 100;

/* ─── Search / Debounce ──────────────────────── */

export const DEBOUNCE_MS = 300;

/* ─── Dropdown Options ───────────────────────── */

export const ROLE_OPTIONS = [
  "Software Engineer",
  "Senior Software Engineer",
  "Frontend Engineer",
  "Backend Engineer",
  "Full Stack Engineer",
  "Data Engineer",
  "Data Scientist",
  "Machine Learning Engineer",
  "DevOps Engineer",
  "Product Manager",
  "Engineering Manager",
  "Product Designer",
  "Data Analyst",
  "QA Engineer",
  "Site Reliability Engineer",
] as const;

export const LOCATION_OPTIONS = [
  "Bengaluru",
  "Mumbai",
  "Hyderabad",
  "Gurgaon",
  "Pune",
  "Chennai",
  "Noida",
  "Delhi",
  "San Francisco",
  "Seattle",
  "Sydney",
  "London",
  "Remote",
] as const;

export const LEVEL_OPTIONS: LevelStandard[] = [
  "L3",
  "SDE-I",
  "L4",
  "SDE-II",
  "IC4",
  "L5",
  "SDE-III",
  "IC5",
  "L6",
  "Staff",
  "Principal",
];

export const CURRENCY_OPTIONS: Currency[] = ["INR", "USD"];

/* ─── Level Distribution Bar Colors ──────────── */

export const LEVEL_BAR_COLORS: Record<LevelStandard, string> = {
  L3:        "#94a3b8",
  "SDE-I":   "#94a3b8",
  L4:        "#60a5fa",
  "SDE-II":  "#60a5fa",
  L5:        "#818cf8",
  "SDE-III": "#818cf8",
  IC4:       "#60a5fa",
  IC5:       "#818cf8",
  L6:        "#a78bfa",
  Staff:     "#a78bfa",
  Principal: "#1e3a5f",
};

/* ─── Site Config ────────────────────────────── */

export const SITE_URL = "https://talentdash.com";
export const SITE_NAME = "TalentDash";
export const SITE_DESCRIPTION =
  "India's compensation intelligence platform. Compare salaries by company, role, and level.";
