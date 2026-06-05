/* ──────────────────────────────────────────────
   JobsClient — Client-side interactive
   ────────────────────────────────────────────── */

"use client";

import { useState } from "react";
import Link from "next/link";
import { LogoImg } from "@/components/ui/CompanyLogo";

interface CompanyInfo {
  name: string;
  slug: string;
  industry: string;
  headquarters: string;
  salaryCount: number;
  avgTC: string;
  minTC: string;
  maxTC: string;
}

const JOB_CATEGORIES = [
  { label: "Engineering", count: "Software, Backend, Frontend", icon: "💻" },
  { label: "Product", count: "Product Management", icon: "📦" },
  { label: "Design", count: "Product Design, UX", icon: "🎨" },
  { label: "Data Science", count: "ML, Data Analytics", icon: "📊" },
  { label: "DevOps / SRE", count: "Infrastructure, Cloud", icon: "⚙️" },
  { label: "QA", count: "Testing, Quality", icon: "🧪" },
];

export default function JobsClient({ companies }: { companies: CompanyInfo[] }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCompanies = companies.filter((c) => {
    if (searchQuery === "") return true;
    return c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.industry.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <>
      {/* ── Hero ── */}
      <section className="jobs-hero">
        <div className="mx-auto max-w-6xl" style={{ padding: "0 32px" }}>
          <div className="reviews-hero-badge" style={{ background: "#ECFDF5", color: "#10B981" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25" /></svg>
            Explore Opportunities
          </div>
          <h1>Compare salaries at <span style={{ color: "#10B981" }}>top companies</span></h1>
          <p className="reviews-hero-sub">
            Browse {companies.length} companies with salary data. Compare compensation and find the right fit for your career.
          </p>

          <div className="jobs-search-bar">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#717171" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
            <input type="text" placeholder="Search by company or industry..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>

          <div className="reviews-stats-row" style={{ marginTop: 24 }}>
            <div className="reviews-stat"><div className="reviews-stat-value" style={{ color: "#10B981" }}>{companies.length}</div><div className="reviews-stat-label">Companies</div></div>
            <div className="reviews-stat"><div className="reviews-stat-value" style={{ color: "#10B981" }}>{companies.reduce((a, c) => a + c.salaryCount, 0)}</div><div className="reviews-stat-label">Salary Records</div></div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl" style={{ padding: "0 32px" }}>
        {/* ── Categories ── */}
        <section style={{ marginBottom: 32 }}>
          <div className="reviews-browse-grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))" }}>
            {JOB_CATEGORIES.map((cat) => (
              <div key={cat.label} className="job-category-card">
                <span style={{ fontSize: 24 }}>{cat.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "#222" }}>{cat.label}</div>
                  <div style={{ fontSize: 12, color: "#717171" }}>{cat.count}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Company Listings (from DB) ── */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#222", marginBottom: 20, letterSpacing: "-0.02em" }}>
            Companies with Salary Data
          </h2>
          <div className="jobs-list">
            {filteredCompanies.map((c) => (
              <Link key={c.slug} href={`/companies/${c.slug}`} className="job-card" style={{ textDecoration: "none", color: "inherit" }}>
                <div className="review-card-header">
                  <LogoImg slug={c.slug} name={c.name} size={44} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 15, color: "#222" }}>{c.name}</div>
                    <div className="review-card-meta">{c.industry} · {c.headquarters}</div>
                  </div>
                  <span style={{ padding: "3px 10px", borderRadius: 50, background: "#ECFDF5", color: "#10B981", fontSize: 11, fontWeight: 600 }}>
                    {c.salaryCount} records
                  </span>
                </div>
                <div className="job-card-details">
                  <div className="job-card-salary">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    {c.minTC} – {c.maxTC}
                  </div>
                  <span style={{ fontSize: 12, color: "#717171" }}>Avg: {c.avgTC}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
