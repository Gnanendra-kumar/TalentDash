/* ──────────────────────────────────────────────
   /reviews — Company Reviews & Culture
   
   Server component: fetches real company data
   from the database. Review content is curated
   but company links point to real company pages.
   ────────────────────────────────────────────── */

import Link from "next/link";
import { getCompaniesWithStats } from "@/lib/page-data";
import { formatCurrency } from "@/lib/utils";
import ReviewsClient from "./ReviewsClient";

export const revalidate = 3600;

export default async function ReviewsPage() {
  const companies = await getCompaniesWithStats();

  // Build browse-by-company list from real DB companies
  const browseCompanies = companies
    .filter((c) => c.salaryCount > 0)
    .sort((a, b) => b.salaryCount - a.salaryCount)
    .slice(0, 8)
    .map((c) => ({
      name: c.name,
      slug: c.slug,
      salaryCount: c.salaryCount,
      avgTC: formatCurrency(c.avgTC, "INR"),
    }));

  return <ReviewsClient companies={browseCompanies} />;
}
