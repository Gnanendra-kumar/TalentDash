/* ──────────────────────────────────────────────
   /workplace-index — Best Workplaces Ranking
   Server component fetches real company data.
   ────────────────────────────────────────────── */

import { getCompaniesWithStats } from "@/lib/page-data";
import { formatCurrency } from "@/lib/utils";
import WorkplaceIndexClient from "./WorkplaceIndexClient";

export const revalidate = 3600;

export default async function WorkplaceIndexPage() {
  const companies = await getCompaniesWithStats();

  const rankedCompanies = companies
    .filter((c) => c.salaryCount > 0)
    .sort((a, b) => b.avgTC - a.avgTC)
    .slice(0, 10)
    .map((c, i) => ({
      rank: i + 1,
      name: c.name,
      slug: c.slug,
      industry: c.industry,
      salaryCount: c.salaryCount,
      avgTC: formatCurrency(c.avgTC, "INR"),
      avgTCRaw: c.avgTC,
    }));

  return (
    <WorkplaceIndexClient
      rankings={rankedCompanies}
      totalCompanies={companies.filter((c) => c.salaryCount > 0).length}
      totalRecords={companies.reduce((a, c) => a + c.salaryCount, 0)}
    />
  );
}
