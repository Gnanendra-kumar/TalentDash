/* ──────────────────────────────────────────────
   ReviewsClient — Client-side interactive part
   ────────────────────────────────────────────── */

"use client";

import { useState } from "react";
import Link from "next/link";
import { LogoImg } from "@/components/ui/CompanyLogo";

interface BrowseCompany {
  name: string;
  slug: string;
  salaryCount: number;
  avgTC: string;
}

/* ── Curated review data (mapped to real DB company slugs) ── */
const FEATURED_REVIEWS = [
  {
    id: 1, company: "Google", slug: "google", role: "Software Engineer", rating: 4.5, date: "Mar 2024",
    title: "Great culture but increasing bureaucracy",
    pros: "Exceptional compensation, brilliant colleagues, world-class perks, strong learning culture, and excellent work-life balance.",
    cons: "Growing bureaucracy, slower promotions at higher levels, and some teams have limited impact due to organizational complexity.",
    recommend: true,
  },
  {
    id: 2, company: "Amazon", slug: "amazon", role: "SDE-II", rating: 3.8, date: "Apr 2024",
    title: "Fast-paced with steep learning curve",
    pros: "Incredible scale of problems, strong leadership principles, good RSU vesting after year 2, career growth opportunities.",
    cons: "Work-life balance varies by team, PIP culture can be stressful, some on-call rotations are demanding.",
    recommend: true,
  },
  {
    id: 3, company: "Microsoft", slug: "microsoft", role: "Senior SWE", rating: 4.3, date: "Feb 2024",
    title: "Best work-life balance in FAANG",
    pros: "Excellent WLB, generous benefits, supportive management, strong engineering culture post-Nadella transformation.",
    cons: "Compensation slightly below Google/Meta at senior levels, some orgs still have legacy codebases.",
    recommend: true,
  },
  {
    id: 4, company: "Flipkart", slug: "flipkart", role: "SDE-III", rating: 4.0, date: "May 2024",
    title: "Best product company in India",
    pros: "Challenging problems at scale, competitive salary, good culture, strong engineering practices, Walmart backing.",
    cons: "Some teams have long working hours during sales events, limited international mobility options.",
    recommend: true,
  },
  {
    id: 5, company: "CRED", slug: "cred", role: "Frontend Engineer", rating: 4.4, date: "Jan 2024",
    title: "Design-obsessed company with top talent",
    pros: "Premium product culture, excellent design standards, talented peers, startup agility with strong funding.",
    cons: "High expectations, fast-paced environment can lead to burnout, startup uncertainty remains.",
    recommend: true,
  },
  {
    id: 6, company: "Razorpay", slug: "razorpay", role: "Backend Engineer", rating: 4.1, date: "Mar 2024",
    title: "Fintech leader with strong engineering",
    pros: "Strong engineering culture, meaningful impact on India's payments infrastructure, good ESOPs potential.",
    cons: "Work can get intense around product launches, some processes still maturing as the company scales.",
    recommend: true,
  },
];

const CATEGORY_RATINGS = [
  { label: "Work-Life Balance", score: 4.1, color: "#10B981" },
  { label: "Compensation & Benefits", score: 4.3, color: "#FF5A5F" },
  { label: "Career Growth", score: 3.9, color: "#3B82F6" },
  { label: "Culture & Values", score: 4.0, color: "#8B5CF6" },
  { label: "Management Quality", score: 3.7, color: "#F97316" },
  { label: "Job Security", score: 3.8, color: "#06B6D4" },
];

const RATING_DISTRIBUTION = [
  { stars: 5, pct: 38 },
  { stars: 4, pct: 32 },
  { stars: 3, pct: 18 },
  { stars: 2, pct: 8 },
  { stars: 1, pct: 4 },
];

function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24"
          fill={i <= Math.round(rating) ? "#FFB400" : "none"} stroke="#FFB400" strokeWidth={1.5}>
          <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsClient({ companies }: { companies: BrowseCompany[] }) {
  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <>
      {/* ── Hero ── */}
      <section className="reviews-hero">
        <div className="mx-auto max-w-6xl" style={{ padding: "0 32px" }}>
          <div className="reviews-hero-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>
            Company Reviews
          </div>
          <h1>Honest reviews from <span style={{ color: "#FF5A5F" }}>real employees</span></h1>
          <p className="reviews-hero-sub">
            Discover what it&apos;s really like to work at top companies. Browse verified reviews from professionals across India.
          </p>

          <div className="reviews-stats-row">
            <div className="reviews-stat"><div className="reviews-stat-value">{companies.length}</div><div className="reviews-stat-label">Companies</div></div>
            <div className="reviews-stat"><div className="reviews-stat-value">4.2</div><div className="reviews-stat-label">Avg Rating</div></div>
            <div className="reviews-stat"><div className="reviews-stat-value">72%</div><div className="reviews-stat-label">Recommend</div></div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl" style={{ padding: "0 32px" }}>
        {/* ── Rating Overview ── */}
        <section className="reviews-overview">
          <div className="reviews-overview-grid">
            <div className="reviews-card">
              <h3>Rating Distribution</h3>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div style={{ fontSize: 42, fontWeight: 800, color: "#222" }}>4.2</div>
                <div>
                  <StarRating rating={4.2} size={18} />
                  <div style={{ fontSize: 12, color: "#717171", marginTop: 4 }}>Based on employee reviews</div>
                </div>
              </div>
              <div className="rating-bars">
                {RATING_DISTRIBUTION.map((r) => (
                  <div key={r.stars} className="rating-bar-row">
                    <span className="rating-bar-label">{r.stars}★</span>
                    <div className="rating-bar-track"><div className="rating-bar-fill" style={{ width: `${r.pct}%` }} /></div>
                    <span className="rating-bar-pct">{r.pct}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="reviews-card">
              <h3>Category Ratings</h3>
              <div className="category-ratings">
                {CATEGORY_RATINGS.map((cat) => (
                  <div key={cat.label} className="category-rating-item">
                    <div className="category-rating-header">
                      <span>{cat.label}</span>
                      <span style={{ fontWeight: 700, color: cat.color }}>{cat.score}</span>
                    </div>
                    <div className="category-rating-track">
                      <div className="category-rating-fill" style={{ width: `${(cat.score / 5) * 100}%`, background: cat.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Filter Tabs ── */}
        <div className="reviews-filter-row">
          {["all", "engineering", "product", "design", "data"].map((cat) => (
            <button key={cat} className={`reviews-filter-tab ${selectedCategory === cat ? "active" : ""}`} onClick={() => setSelectedCategory(cat)}>
              {cat === "all" ? "All Reviews" : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* ── Featured Reviews ── */}
        <section className="reviews-list">
          {FEATURED_REVIEWS.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-card-header">
                <LogoImg slug={review.slug} name={review.company} size={40} />
                <div style={{ flex: 1 }}>
                  <div className="review-card-company">{review.company}</div>
                  <div className="review-card-meta">{review.role} · {review.date}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <StarRating rating={review.rating} />
                  <div style={{ fontSize: 12, color: "#717171", marginTop: 2 }}>{review.rating}/5</div>
                </div>
              </div>
              <h4 className="review-card-title">&ldquo;{review.title}&rdquo;</h4>
              <div className="review-card-section">
                <div className="review-card-section-label pros">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  Pros
                </div>
                <p>{review.pros}</p>
              </div>
              <div className="review-card-section">
                <div className="review-card-section-label cons">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                  Cons
                </div>
                <p>{review.cons}</p>
              </div>
              <div className="review-card-footer">
                {review.recommend && (
                  <span className="review-recommend-badge">👍 Recommends</span>
                )}
                <Link href={`/companies/${review.slug}`} className="review-card-link">
                  View {review.company} salaries →
                </Link>
              </div>
            </div>
          ))}
        </section>

        {/* ── Browse by Company (from DB) ── */}
        <section className="reviews-browse">
          <h2>Browse companies</h2>
          <div className="reviews-browse-grid">
            {companies.map((c) => (
              <Link key={c.slug} href={`/companies/${c.slug}`} className="reviews-browse-card">
                <LogoImg slug={c.slug} name={c.name} size={36} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "#222" }}>{c.name}</div>
                  <div style={{ fontSize: 12, color: "#717171" }}>{c.salaryCount} salary records · Avg {c.avgTC}</div>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#AFAFAF" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
