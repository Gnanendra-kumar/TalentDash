/* ──────────────────────────────────────────────
   /companies — Company listing page (redesigned)
   Features: Search, Popular/AI/Indian company grids,
   funding stage pills, compare section, explore section.
   ────────────────────────────────────────────── */

import type { Metadata } from "next";
import Link from "next/link";
import CompanyLogo, { LogoImg } from "@/components/ui/CompanyLogo";
import { prisma } from "@/lib/db";
import { safeQuery } from "@/lib/safe-query";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Companies",
  description:
    "Search companies to explore salaries, benefits, and more. Browse popular companies, top AI companies, and top Indian companies.",
};

/* ── Company brand colors for logo backgrounds ── */
const COMPANY_COLORS: Record<string, { bg: string; text: string }> = {
  Google: { bg: "#4285F4", text: "#FFF" },
  Amazon: { bg: "#FF9900", text: "#FFF" },
  Apple: { bg: "#000000", text: "#FFF" },
  Microsoft: { bg: "#00A4EF", text: "#FFF" },
  Meta: { bg: "#0668E1", text: "#FFF" },
  Netflix: { bg: "#E50914", text: "#FFF" },
  Adobe: { bg: "#FF0000", text: "#FFF" },
  Salesforce: { bg: "#00A1E0", text: "#FFF" },
  Infosys: { bg: "#007CC3", text: "#FFF" },
  TCS: { bg: "#2B2D42", text: "#FFF" },
  IBM: { bg: "#054ADA", text: "#FFF" },
  Oracle: { bg: "#F80000", text: "#FFF" },
  SAP: { bg: "#0FAAFF", text: "#FFF" },
  HCL: { bg: "#0073CF", text: "#FFF" },
  Wipro: { bg: "#44125C", text: "#FFF" },
  NVIDIA: { bg: "#76B900", text: "#FFF" },
  Flipkart: { bg: "#2874F0", text: "#FFF" },
  Razorpay: { bg: "#3395FF", text: "#FFF" },
  Swiggy: { bg: "#FC8019", text: "#FFF" },
  Zomato: { bg: "#E23744", text: "#FFF" },
};

const FUNDING_STAGES = ["Pre-Seed", "Seed", "Series A", "Series B", "Series C", "Series D", "Series E+", "Post IPO"];

const EXPLORE_CATEGORIES = [
  { title: "Top paying companies", count: "8,245", color: "#FF5A5F" },
  { title: "Remote friendly companies", count: "2,930", color: "#3B82F6" },
  { title: "Highly rated companies", count: "6,511", color: "#10B981" },
  { title: "Fast growing companies", count: "4,100", color: "#F97316" },
  { title: "Product based companies", count: "5,832", color: "#8B5CF6" },
  { title: "AI & tech companies", count: "1,620", color: "#EC4899" },
];

const COMPARE_PAIRS = [
  { a: "Google", b: "Meta", desc: "Compensation & Benefits" },
  { a: "Amazon", b: "Microsoft", desc: "Career Growth" },
  { a: "TCS", b: "Infosys", desc: "Salaries & Benefits" },
  { a: "Apple", b: "Google", desc: "Culture & Work-Life" },
];

function getCompanyColor(name: string) {
  return COMPANY_COLORS[name] || { bg: "#F7F7F7", text: "#484848" };
}

export default async function CompaniesPage() {
  const dbCompanies = await safeQuery(
    () => prisma.company.findMany({
      include: {
        salaries: {
          select: { totalCompensation: true, role: true },
        },
      },
      orderBy: { name: "asc" },
    }),
    []
  );

  const companyStats = dbCompanies.map((company) => {
    const tcValues = company.salaries
      .map((s) => Number(s.totalCompensation))
      .sort((a, b) => a - b);

    let median = 0;
    if (tcValues.length > 0) {
      const mid = Math.floor(tcValues.length / 2);
      median =
        tcValues.length % 2 === 0
          ? Math.round((tcValues[mid - 1] + tcValues[mid]) / 2)
          : tcValues[mid];
    }

    return { company, median, recordCount: company.salaries.length };
  });

  return (
    <>
      {/* ── Hero ───────────────────────────────── */}
      <div className="companies-hero">
        <div className="companies-hero-label">Companies</div>
        <h1>
          Search for <span>Company</span>
        </h1>
        <p style={{ color: "#717171", fontSize: 14, marginTop: 8 }}>
          Search companies to explore salaries, benefits, and more.
        </p>
        <div className="company-search">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#717171" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input type="text" placeholder="Search for a company..." />
        </div>
      </div>

      {/* ── Popular Companies ──────────────────── */}
      <div className="company-grid-section mx-auto max-w-6xl">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div className="company-grid-title">Popular Companies</div>
          <Link href="/companies" className="view-all-link">View all companies →</Link>
        </div>
        <div className="company-grid">
          {companyStats.length > 0 ? (
            companyStats.map(({ company }) => {
              const colors = getCompanyColor(company.name);
              return (
                <Link key={company.id} href={`/companies/${company.slug}`} className="company-chip">
                  <CompanyLogo
                    slug={company.slug}
                    name={company.name}
                    bg={colors.bg}
                    text={colors.text}
                  />
                  <span className="company-chip-name">{company.name}</span>
                  <svg className="company-chip-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </Link>
              );
            })
          ) : (
            /* Fallback popular companies */
            ["Google", "Amazon", "Apple", "Microsoft", "Meta", "Netflix", "Adobe", "Salesforce", "Infosys", "TCS", "IBM", "Oracle"].map((name) => {
              const colors = getCompanyColor(name);
              return (
                <div key={name} className="company-chip" style={{ cursor: "default" }}>
                  <div className="company-chip-logo" style={{ background: colors.bg, color: colors.text }}>
                    {name.charAt(0)}
                  </div>
                  <span className="company-chip-name">{name}</span>
                  <svg className="company-chip-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* ── Startups by Funding Stage ──────────── */}
      <div className="company-grid-section mx-auto max-w-6xl">
        <div className="company-grid-title">Startups by Funding Stage</div>
        <div className="funding-pills">
          {FUNDING_STAGES.map((stage) => (
            <button key={stage} className="funding-pill">{stage}</button>
          ))}
        </div>
      </div>

      {/* ── Compare Section ────────────────────── */}
      <div className="compare-section">
        <div className="mx-auto max-w-6xl">
          <h2>Compare companies. Make <strong>better</strong> career moves.</h2>
          <p style={{ color: "#717171", fontSize: 14, marginTop: 8, maxWidth: 520, marginLeft: "auto", marginRight: "auto" }}>
            Compare salaries, benefits, culture, growth and more to find the right workplace for you.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 24, marginBottom: 8 }}>
            <div style={{ width: 56, height: 56, borderRadius: 16, border: "2px dashed #EBEBEB", display: "flex", alignItems: "center", justifyContent: "center", color: "#AFAFAF", fontSize: 24 }}>+</div>
            <div style={{ display: "flex", alignItems: "center", fontWeight: 700, color: "#717171", fontSize: 14 }}>vs</div>
            <div style={{ width: 56, height: 56, borderRadius: 16, border: "2px dashed #EBEBEB", display: "flex", alignItems: "center", justifyContent: "center", color: "#AFAFAF", fontSize: 24 }}>+</div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 8 }}>
            <Link href="/compare" className="view-all-link">View all comparisons →</Link>
          </div>

          <div className="compare-grid" style={{ textAlign: "left" }}>
            {COMPARE_PAIRS.map((pair) => {
              const colA = getCompanyColor(pair.a);
              const colB = getCompanyColor(pair.b);
              return (
                <Link key={`${pair.a}-${pair.b}`} href="/compare" className="compare-card">
                  <div className="compare-card-logos">
                    <LogoImg slug={pair.a.toLowerCase()} name={pair.a} size={32} />
                    <span className="compare-card-vs">vs</span>
                    <LogoImg slug={pair.b.toLowerCase()} name={pair.b} size={32} />
                  </div>
                  <div className="compare-card-title">{pair.a} vs {pair.b}</div>
                  <div className="compare-card-subtitle">{pair.desc}</div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Explore Section ────────────────────── */}
      <div className="explore-section mx-auto max-w-6xl">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <span className="placeholder-badge" style={{ marginTop: 0, marginBottom: 12, display: "inline-flex" }}>Discover companies</span>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: "#222", letterSpacing: "-0.02em" }}>
              Explore companies your way
            </h2>
            <p style={{ fontSize: 14, color: "#717171", marginTop: 4 }}>
              Find the right companies based on what matters to you.
            </p>
          </div>
          <Link href="/companies" className="view-all-link">View all companies →</Link>
        </div>

        <div className="explore-categories">
          {EXPLORE_CATEGORIES.map((cat) => (
            <div key={cat.title} className="explore-category-card">
              <h3>{cat.title}</h3>
              <p>{cat.count} companies</p>
              <div className="explore-category-bar" style={{ background: cat.color }} />
            </div>
          ))}
        </div>

        {/* Quick ways to explore */}
        <div style={{ marginTop: 40 }}>
          <div className="company-grid-title">Quick ways to explore</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12, marginTop: 16 }}>
            {[
              { label: "By experience", sub: "Internship to Leadership", icon: "📊" },
              { label: "By location", sub: "Top cities & remote", icon: "📍" },
              { label: "By company size", sub: "Start-ups to enterprises", icon: "🏢" },
              { label: "By industry", sub: "Tech, Finance, Healthcare & more", icon: "🏭" },
              { label: "By rating", sub: "4★ & above companies", icon: "⭐" },
              { label: "By funding stage", sub: "Pre-seed to Unicorn", icon: "💰" },
              { label: "By known for", sub: "Benefits, Culture & more", icon: "🎯" },
              { label: "By badges", sub: "Verified & featured", icon: "🏅" },
            ].map((item) => (
              <div key={item.label} className="company-chip" style={{ cursor: "pointer" }}>
                <span style={{ fontSize: 18 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#222" }}>{item.label}</div>
                  <div style={{ fontSize: 11, color: "#717171" }}>{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA Banner ─────────────────────────── */}
      <div style={{ margin: "32px", padding: "20px 24px", background: "#FFF0F0", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: "calc(100% - 64px)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF5A5F" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
          <span style={{ fontSize: 13, color: "#484848" }}>
            Not sure where to start? Check out our <strong>Top 50 Highest paying companies in India</strong>
          </span>
        </div>
      </div>
    </>
  );
}
