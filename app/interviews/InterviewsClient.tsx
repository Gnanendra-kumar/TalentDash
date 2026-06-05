/* ──────────────────────────────────────────────
   InterviewsClient — Client-side interactive
   ────────────────────────────────────────────── */

"use client";

import Link from "next/link";
import { LogoImg } from "@/components/ui/CompanyLogo";

interface CompanyInfo {
  name: string;
  slug: string;
  salaryCount: number;
  avgTC: string;
}

const INTERVIEW_EXPERIENCES = [
  {
    id: 1, company: "Google", slug: "google", role: "Software Engineer L4", difficulty: "Hard", outcome: "Offer", date: "Mar 2024", rounds: 5, duration: "4 weeks",
    description: "Phone screen + 4 onsite rounds. System design was the toughest — asked to design Google Maps search. DSA rounds covered graph algorithms and dynamic programming.",
    tags: ["System Design", "DSA", "Behavioral"],
  },
  {
    id: 2, company: "Amazon", slug: "amazon", role: "SDE-II", difficulty: "Medium", outcome: "Offer", date: "Apr 2024", rounds: 4, duration: "3 weeks",
    description: "Online assessment + 3 virtual loops. Heavy focus on Leadership Principles. Coding was LeetCode medium-level. System design for a URL shortener.",
    tags: ["Leadership Principles", "DSA", "System Design"],
  },
  {
    id: 3, company: "Meta", slug: "meta", role: "Software Engineer E5", difficulty: "Hard", outcome: "Offer", date: "Feb 2024", rounds: 5, duration: "5 weeks",
    description: "Phone screen + 4 onsite. Two coding rounds (45 min each), one system design, one behavioral. Coding was harder than typical LC hard. Great candidate experience.",
    tags: ["DSA", "System Design", "Behavioral"],
  },
  {
    id: 4, company: "Flipkart", slug: "flipkart", role: "SDE-III", difficulty: "Medium", outcome: "Offer", date: "May 2024", rounds: 4, duration: "2 weeks",
    description: "Machine coding round was unique — build a parking lot system in 90 min. Followed by LLD, HLD, and managerial round. Focus on scalability and code quality.",
    tags: ["Machine Coding", "LLD", "HLD"],
  },
  {
    id: 5, company: "Razorpay", slug: "razorpay", role: "Backend Engineer", difficulty: "Medium", outcome: "Offer", date: "Jan 2024", rounds: 4, duration: "2 weeks",
    description: "Take-home assignment + technical interviews. Focus on API design and payment systems knowledge. Very collaborative process with fast feedback loops.",
    tags: ["API Design", "System Design", "Golang"],
  },
  {
    id: 6, company: "CRED", slug: "cred", role: "Frontend Engineer", difficulty: "Medium", outcome: "Offer", date: "Mar 2024", rounds: 3, duration: "10 days",
    description: "UI/UX challenge round was impressive — build a responsive component from a Figma design. Followed by deep-dive into React internals and a culture fit round.",
    tags: ["React", "UI/UX", "JavaScript"],
  },
];

const DIFFICULTY_STATS = [
  { label: "Easy", pct: 22, color: "#10B981" },
  { label: "Medium", pct: 48, color: "#F97316" },
  { label: "Hard", pct: 30, color: "#EF4444" },
];

const POPULAR_SKILLS = ["System Design", "DSA", "React", "Python", "SQL", "AWS", "Java", "Golang", "Machine Coding", "LLD", "HLD", "JavaScript", "Docker", "Kubernetes", "APIs"];

function DifficultyBadge({ level }: { level: string }) {
  const colors: Record<string, { bg: string; text: string }> = {
    Easy: { bg: "#ECFDF5", text: "#10B981" }, Medium: { bg: "#FFF7ED", text: "#F97316" }, Hard: { bg: "#FEF2F2", text: "#EF4444" },
  };
  const c = colors[level] || colors.Medium;
  return <span style={{ padding: "3px 10px", borderRadius: 50, background: c.bg, color: c.text, fontSize: 11, fontWeight: 600 }}>{level}</span>;
}

function OutcomeBadge({ outcome }: { outcome: string }) {
  const isOffer = outcome === "Offer";
  return <span style={{ padding: "3px 10px", borderRadius: 50, fontSize: 11, fontWeight: 600, background: isOffer ? "#ECFDF5" : "#FEF2F2", color: isOffer ? "#10B981" : "#EF4444" }}>{outcome}</span>;
}

export default function InterviewsClient({ companies }: { companies: CompanyInfo[] }) {
  return (
    <>
      <section className="interviews-hero">
        <div className="mx-auto max-w-6xl" style={{ padding: "0 32px" }}>
          <div className="reviews-hero-badge" style={{ background: "#F5F3FF", color: "#8B5CF6" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242" /></svg>
            Interview Experiences
          </div>
          <h1>Prepare with <span style={{ color: "#8B5CF6" }}>real interview</span> experiences</h1>
          <p className="reviews-hero-sub">Read interview experiences shared by candidates. Know what to expect before your next interview.</p>
          <div className="reviews-stats-row">
            <div className="reviews-stat"><div className="reviews-stat-value" style={{ color: "#8B5CF6" }}>{companies.length}</div><div className="reviews-stat-label">Companies</div></div>
            <div className="reviews-stat"><div className="reviews-stat-value" style={{ color: "#8B5CF6" }}>65%</div><div className="reviews-stat-label">Got Offers</div></div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl" style={{ padding: "0 32px" }}>
        <section className="reviews-overview">
          <div className="reviews-overview-grid">
            <div className="reviews-card">
              <h3>Difficulty Distribution</h3>
              <p style={{ fontSize: 12, color: "#717171", marginBottom: 20 }}>Based on interview reports</p>
              <div style={{ display: "flex", gap: 16, marginBottom: 20 }}>
                {DIFFICULTY_STATS.map((d) => (
                  <div key={d.label} style={{ flex: 1, textAlign: "center" }}>
                    <div style={{ fontSize: 28, fontWeight: 800, color: d.color }}>{d.pct}%</div>
                    <div style={{ fontSize: 12, color: "#717171", marginTop: 2 }}>{d.label}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 2, borderRadius: 8, overflow: "hidden", height: 8 }}>
                {DIFFICULTY_STATS.map((d) => (<div key={d.label} style={{ flex: d.pct, background: d.color, height: "100%" }} />))}
              </div>
            </div>
            <div className="reviews-card">
              <h3>Most In-demand Skills</h3>
              <p style={{ fontSize: 12, color: "#717171", marginBottom: 20 }}>Based on interview trends</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {POPULAR_SKILLS.map((skill) => (<span key={skill} className="skill-tag">{skill}</span>))}
              </div>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#222", marginBottom: 20, letterSpacing: "-0.02em" }}>Recent Interview Experiences</h2>
          <div className="interviews-list">
            {INTERVIEW_EXPERIENCES.map((exp) => (
              <div key={exp.id} className="interview-card">
                <div className="review-card-header">
                  <LogoImg slug={exp.slug} name={exp.company} size={40} />
                  <div style={{ flex: 1 }}>
                    <div className="review-card-company">{exp.company}</div>
                    <div className="review-card-meta">{exp.role} · {exp.date}</div>
                  </div>
                  <div style={{ display: "flex", gap: 6 }}>
                    <DifficultyBadge level={exp.difficulty} />
                    <OutcomeBadge outcome={exp.outcome} />
                  </div>
                </div>
                <div className="interview-card-details"><span>🔄 {exp.rounds} rounds</span><span>⏱ {exp.duration}</span></div>
                <p className="interview-card-desc">{exp.description}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 12 }}>
                  {exp.tags.map((tag) => (<span key={tag} className="skill-tag">{tag}</span>))}
                </div>
                <div className="review-card-footer" style={{ marginTop: 16 }}>
                  <Link href={`/companies/${exp.slug}`} className="review-card-link">View {exp.company} salaries →</Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="reviews-browse">
          <h2>Top companies for interview prep</h2>
          <div className="reviews-browse-grid">
            {companies.map((c) => (
              <Link key={c.slug} href={`/companies/${c.slug}`} className="reviews-browse-card">
                <LogoImg slug={c.slug} name={c.name} size={36} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "#222" }}>{c.name}</div>
                  <div style={{ fontSize: 12, color: "#717171" }}>{c.salaryCount} salary records</div>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#AFAFAF" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
