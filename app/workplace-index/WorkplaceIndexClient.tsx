"use client";

import Link from "next/link";
import { LogoImg } from "@/components/ui/CompanyLogo";

interface RankedCompany {
  rank: number;
  name: string;
  slug: string;
  industry: string;
  salaryCount: number;
  avgTC: string;
  avgTCRaw: number;
}

export default function WorkplaceIndexClient({
  rankings,
  totalCompanies,
  totalRecords,
}: {
  rankings: RankedCompany[];
  totalCompanies: number;
  totalRecords: number;
}) {
  return (
    <div className="mx-auto max-w-6xl" style={{ padding: "0 32px" }}>
      <section className="reviews-hero" style={{ paddingTop: 24, paddingBottom: 24 }}>
        <div className="reviews-hero-badge" style={{ background: "#EFF6FF", color: "#1D4ED8" }}>
          Best Workplaces
        </div>
        <h1 style={{ fontSize: 40, lineHeight: 1.05, marginTop: 18, maxWidth: 760 }}>
          Discover the highest paying companies in the TalentDash workplace index.
        </h1>
        <p className="reviews-hero-sub" style={{ maxWidth: 640, marginTop: 18 }}>
          Browse the top-ranked companies by average total compensation, salary records, and industry.
          These rankings are updated hourly from real salary submissions.
        </p>

        <div className="reviews-stats-row" style={{ marginTop: 28 }}>
          <div className="reviews-stat">
            <div className="reviews-stat-value" style={{ color: "#1D4ED8" }}>{totalCompanies}</div>
            <div className="reviews-stat-label">Ranked companies</div>
          </div>
          <div className="reviews-stat">
            <div className="reviews-stat-value" style={{ color: "#1D4ED8" }}>{totalRecords}</div>
            <div className="reviews-stat-label">Salary records</div>
          </div>
        </div>
      </section>

      <section style={{ marginTop: 24, marginBottom: 48 }}>
        <div style={{ display: "grid", gap: 16 }}>
          {rankings.map((company) => (
            <Link
              key={company.slug}
              href={`/companies/${company.slug}`}
              className="review-card"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="review-card-header" style={{ alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div className="rank-pill" style={{ minWidth: 36, height: 36, borderRadius: 999, background: "#DBEAFE", color: "#1D4ED8", fontWeight: 700, display: "grid", placeItems: "center" }}>
                    {company.rank}
                  </div>
                  <LogoImg slug={company.slug} name={company.name} size={42} />
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 700 }}>{company.name}</div>
                    <div className="review-card-meta" style={{ color: "#6B7280" }}>{company.industry}</div>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 14, color: "#6B7280" }}>Average pay</div>
                  <div style={{ fontSize: 18, fontWeight: 700 }}>{company.avgTC}</div>
                </div>
              </div>

              <div className="review-card-details" style={{ marginTop: 14, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
                <span style={{ fontSize: 13, color: "#4B5563" }}>{company.salaryCount} salary records</span>
                <span style={{ fontSize: 13, color: "#4B5563" }}>Rank {company.rank}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
