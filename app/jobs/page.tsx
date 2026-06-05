/* ──────────────────────────────────────────────
   /jobs — Job Listings
   Server component fetches real company data.
   ────────────────────────────────────────────── */

import { getCompaniesWithStats } from "@/lib/page-data";
import { formatCurrency } from "@/lib/utils";
import JobsClient from "./JobsClient";

export const revalidate = 3600;

export default async function JobsPage() {
  const companies = await getCompaniesWithStats();

  const companyList = companies
    .filter((c) => c.salaryCount > 0)
    .sort((a, b) => b.salaryCount - a.salaryCount)
    .map((c) => ({
      name: c.name,
      slug: c.slug,
      industry: c.industry,
      headquarters: c.headquarters,
      salaryCount: c.salaryCount,
      avgTC: formatCurrency(c.avgTC, "INR"),
      minTC: formatCurrency(c.minTC, "INR"),
      maxTC: formatCurrency(c.maxTC, "INR"),
    }));

  return <JobsClient companies={companyList} />;
}
