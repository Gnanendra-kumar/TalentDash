/* ──────────────────────────────────────────────
   /interviews — Interview Experiences
   Server component fetches real company data.
   ────────────────────────────────────────────── */

import { getCompaniesWithStats } from "@/lib/page-data";
import { formatCurrency } from "@/lib/utils";
import InterviewsClient from "./InterviewsClient";

export const revalidate = 3600;

export default async function InterviewsPage() {
  const companies = await getCompaniesWithStats();

  const topCompanies = companies
    .filter((c) => c.salaryCount > 0)
    .sort((a, b) => b.salaryCount - a.salaryCount)
    .slice(0, 8)
    .map((c) => ({
      name: c.name,
      slug: c.slug,
      salaryCount: c.salaryCount,
      avgTC: formatCurrency(c.avgTC, "INR"),
    }));

  return <InterviewsClient companies={topCompanies} />;
}
