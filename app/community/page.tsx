/* ──────────────────────────────────────────────
   /community — Community Discussions
   ────────────────────────────────────────────── */

"use client";

import { useState } from "react";
import { LogoImg } from "@/components/ui/CompanyLogo";

const DISCUSSIONS = [
  {
    id: 1,
    title: "How is the work-life balance at Google India in 2024?",
    author: "anonymous_dev",
    timeAgo: "2 hours ago",
    upvotes: 342,
    replies: 89,
    category: "Work-Life Balance",
    preview: "I have an offer from Google Bengaluru for L4. Current Google employees — how is the WLB? I've heard mixed things about different teams...",
    tags: ["Google", "WLB", "L4"],
    companySlug: "google",
    companyName: "Google",
  },
  {
    id: 2,
    title: "Amazon vs Microsoft — Which is better for career growth in India?",
    author: "career_explorer",
    timeAgo: "5 hours ago",
    upvotes: 218,
    replies: 156,
    category: "Career Advice",
    preview: "I have competing offers from both. Amazon SDE-II vs Microsoft L62. TC is similar. Looking for long-term career growth and learning...",
    tags: ["Amazon", "Microsoft", "Career"],
    companySlug: "amazon",
    companyName: "Amazon",
  },
  {
    id: 3,
    title: "CRED engineering culture — Is it worth the hype?",
    author: "curious_engineer",
    timeAgo: "1 day ago",
    upvotes: 189,
    replies: 67,
    category: "Company Culture",
    preview: "CRED has this reputation of being a design-obsessed, elite engineering company. Current/ex employees, is the reality matching the image?",
    tags: ["CRED", "Culture", "Engineering"],
    companySlug: "cred",
    companyName: "CRED",
  },
  {
    id: 4,
    title: "How to negotiate a 50% hike when switching companies?",
    author: "salary_negotiator",
    timeAgo: "3 hours ago",
    upvotes: 456,
    replies: 203,
    category: "Salary Negotiation",
    preview: "I'm at 18 LPA at a mid-size company with 3 YoE. Got an offer for 24 LPA but I was expecting 27-28L. How do I negotiate without losing the offer?",
    tags: ["Negotiation", "Salary", "Switching"],
  },
  {
    id: 5,
    title: "Is DSA really necessary for product-based companies in 2024?",
    author: "pragmatic_dev",
    timeAgo: "6 hours ago",
    upvotes: 567,
    replies: 312,
    category: "Interview Prep",
    preview: "With machine coding rounds becoming more common at Flipkart, Razorpay, etc., is grinding LeetCode still the best use of time for Indian tech interviews?",
    tags: ["DSA", "Interviews", "LeetCode"],
  },
  {
    id: 6,
    title: "Layoffs 2024: Which companies are safe to join right now?",
    author: "cautious_joiner",
    timeAgo: "12 hours ago",
    upvotes: 723,
    replies: 445,
    category: "Industry Trends",
    preview: "With ongoing layoffs in the tech industry, which companies in India are considered stable and still actively hiring for engineering roles?",
    tags: ["Layoffs", "Job Market", "Stability"],
  },
  {
    id: 7,
    title: "Razorpay vs PhonePe for fintech career — Insider perspective",
    author: "fintech_insider",
    timeAgo: "1 day ago",
    upvotes: 178,
    replies: 94,
    category: "Company Culture",
    preview: "Worked at both. Here's my honest comparison on engineering culture, compensation, growth, and the fintech career trajectory...",
    tags: ["Razorpay", "PhonePe", "Fintech"],
    companySlug: "razorpay",
    companyName: "Razorpay",
  },
  {
    id: 8,
    title: "Remote work policy changes at Indian tech companies — 2024 update",
    author: "remote_advocate",
    timeAgo: "2 days ago",
    upvotes: 389,
    replies: 167,
    category: "Work-Life Balance",
    preview: "Comprehensive list of WFH/hybrid/RTO policies at major Indian tech companies as of 2024. Which companies are still remote-friendly?",
    tags: ["Remote", "WFH", "Hybrid"],
  },
];

const CATEGORIES = [
  { name: "All", count: 12840, icon: "🔥" },
  { name: "Salary Negotiation", count: 3210, icon: "💰" },
  { name: "Career Advice", count: 4380, icon: "🎯" },
  { name: "Interview Prep", count: 2890, icon: "📝" },
  { name: "Company Culture", count: 2150, icon: "🏢" },
  { name: "Work-Life Balance", count: 1920, icon: "⚖️" },
  { name: "Industry Trends", count: 1540, icon: "📈" },
];

const TRENDING_TOPICS = [
  "Layoffs 2024", "Remote Jobs", "FAANG India", "Salary Hike",
  "Startup vs MNC", "Work from Home", "L4 vs SDE-II", "ESOPs",
  "Notice Period", "Moonlighting",
];

export default function CommunityPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredDiscussions = selectedCategory === "All"
    ? DISCUSSIONS
    : DISCUSSIONS.filter(d => d.category === selectedCategory);

  return (
    <>
      {/* ── Hero ─────────────────────────────── */}
      <section className="community-hero">
        <div className="mx-auto max-w-6xl" style={{ padding: "0 32px" }}>
          <div className="reviews-hero-badge" style={{ background: "#EFF6FF", color: "#3B82F6" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584" />
            </svg>
            Community
          </div>
          <h1>Join the <span style={{ color: "#3B82F6" }}>conversation</span></h1>
          <p className="reviews-hero-sub">
            120K+ professionals sharing insights, asking questions, and helping each other navigate their careers.
          </p>

          <div className="reviews-stats-row">
            <div className="reviews-stat">
              <div className="reviews-stat-value" style={{ color: "#3B82F6" }}>120K+</div>
              <div className="reviews-stat-label">Members</div>
            </div>
            <div className="reviews-stat">
              <div className="reviews-stat-value" style={{ color: "#3B82F6" }}>12.8K</div>
              <div className="reviews-stat-label">Discussions</div>
            </div>
            <div className="reviews-stat">
              <div className="reviews-stat-value" style={{ color: "#3B82F6" }}>85K+</div>
              <div className="reviews-stat-label">Replies</div>
            </div>
            <div className="reviews-stat">
              <div className="reviews-stat-value" style={{ color: "#3B82F6" }}>4.6</div>
              <div className="reviews-stat-label">Helpfulness</div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl" style={{ padding: "0 32px" }}>
        {/* ── Trending Topics ────────────────── */}
        <section style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#717171" }}>🔥 Trending:</span>
            {TRENDING_TOPICS.map((topic) => (
              <span key={topic} className="trending-tag">{topic}</span>
            ))}
          </div>
        </section>

        {/* ── Main Layout ───────────────────── */}
        <div className="community-layout">
          {/* Sidebar — Categories */}
          <aside className="community-sidebar">
            <h3 style={{ fontSize: 14, fontWeight: 700, color: "#222", marginBottom: 12 }}>Categories</h3>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.name}
                className={`community-category-btn ${selectedCategory === cat.name ? "active" : ""}`}
                onClick={() => setSelectedCategory(cat.name)}
              >
                <span>{cat.icon} {cat.name}</span>
                <span className="community-category-count">{cat.count.toLocaleString()}</span>
              </button>
            ))}
          </aside>

          {/* Main — Discussions */}
          <main className="community-main">
            <div className="community-discussions">
              {filteredDiscussions.map((d) => (
                <div key={d.id} className="discussion-card">
                  {/* Votes */}
                  <div className="discussion-votes">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                    </svg>
                    <span>{d.upvotes}</span>
                  </div>

                  {/* Content */}
                  <div className="discussion-content">
                    <div className="discussion-header">
                      {d.companySlug && (
                        <LogoImg slug={d.companySlug} name={d.companyName || ""} size={20} />
                      )}
                      <span className="discussion-category-badge">{d.category}</span>
                      <span className="discussion-time">{d.timeAgo}</span>
                    </div>

                    <h4 className="discussion-title">{d.title}</h4>
                    <p className="discussion-preview">{d.preview}</p>

                    <div className="discussion-footer">
                      <div className="discussion-tags">
                        {d.tags.map((tag) => (
                          <span key={tag} className="skill-tag">{tag}</span>
                        ))}
                      </div>
                      <div className="discussion-meta">
                        <span>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
                          </svg>
                          {d.replies} replies
                        </span>
                        <span>by {d.author}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
