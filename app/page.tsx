/* ──────────────────────────────────────────────
   Home Page — Explore. Compare. Grow.
   Redesigned to match screenshot UI with hero,
   search bar, stats, trust badges, intel hub.
   ────────────────────────────────────────────── */

import Link from "next/link";

export const revalidate = 3600;

export default function HomePage() {
  return (
    <>
      {/* ════════════════════════════════════════════
          Hero Section
          ════════════════════════════════════════════ */}
      <section className="home-hero">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            {/* Left content */}
            <div>
              <h1 className="hero-title">
                Explore. Compare.{" "}
                <span className="grow-text">Grow.</span>
              </h1>
              <p className="hero-subtitle">
                Discover real salary insights, read reviews, prepare for interviews,
                and find the right opportunities — all in one place.
              </p>
            </div>

            {/* Right illustration */}
            <div className="hero-illustration">
              <div className="hero-illust-blob" />
              <div className="hero-illust-inner">
                <svg className="hero-illust-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1}>
                  <path d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                </svg>
              </div>
              <div className="hero-illust-float top-left">
                <span style={{ color: "#FF5A5F" }}>₹28.4L</span> avg salary
              </div>
              <div className="hero-illust-float bottom-right">
                <span style={{ color: "#10B981" }}>↑ 18%</span> YoY growth
              </div>
            </div>
          </div>

          {/* ── Search Bar ─────────────────────────── */}
          <div className="search-section">
            <div className="search-tabs">
              <button className="search-tab active">Salaries</button>
              <button className="search-tab">Reviews</button>
              <button className="search-tab">Interviews</button>
              <button className="search-tab">Companies</button>
              <button className="search-tab">Jobs</button>
            </div>
            <div className="search-fields">
              <div className="search-field" style={{ flex: 2 }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <div>
                  <div className="search-field-label">Search by job title, skill or company</div>
                  <input type="text" placeholder="e.g. Software Engineer, Data Analyst" />
                </div>
              </div>
              <div className="search-field">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <div>
                  <div className="search-field-label">Location</div>
                  <input type="text" placeholder="e.g. New York, India" />
                </div>
              </div>
              <div className="search-field">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                </svg>
                <div>
                  <div className="search-field-label">Experience</div>
                  <input type="text" placeholder="e.g. 0-5 years" />
                </div>
              </div>
              <Link href="/salaries" className="search-btn">Search</Link>
            </div>

            {/* Trending */}
            <div className="trending-row">
              <span className="trending-label">Trending searches</span>
              <Link href="/salaries?role=Software+Engineer" className="trending-tag">Software Engineer</Link>
              <Link href="/salaries?role=Data+Scientist" className="trending-tag">Data Scientist</Link>
              <Link href="/salaries?role=Product+Manager" className="trending-tag">Product Manager</Link>
              <Link href="/salaries?role=Marketing+Manager" className="trending-tag">Marketing Manager</Link>
              <Link href="/jobs" className="trending-tag">Remote Jobs</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          Stats Row
          ════════════════════════════════════════════ */}
      <section className="stats-row">
        <div className="stat-item">
          <div className="stat-icon coral">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <div className="stat-value">12M+</div>
            <div className="stat-label">Salaries</div>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-icon blue">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>
          </div>
          <div>
            <div className="stat-value">4.8M+</div>
            <div className="stat-label">Reviews</div>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-icon green">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75" />
            </svg>
          </div>
          <div>
            <div className="stat-value">950K+</div>
            <div className="stat-label">Companies</div>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-icon purple">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
            </svg>
          </div>
          <div>
            <div className="stat-value">210K+</div>
            <div className="stat-label">Interviews</div>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-icon orange">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
            </svg>
          </div>
          <div>
            <div className="stat-value">120K+</div>
            <div className="stat-label">Active Community</div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          Trust Badges
          ════════════════════════════════════════════ */}
      <section className="trust-row">
        <div className="trust-item">
          <svg className="trust-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>
          <div>
            <div className="trust-text-primary">Verified & Trusted</div>
            <div className="trust-text-secondary">Real data. Real people.</div>
          </div>
        </div>
        <div className="trust-item">
          <svg className="trust-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 9c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 9c0-.778.099-1.533.284-2.253" />
          </svg>
          <div>
            <div className="trust-text-primary">10M+ Users</div>
            <div className="trust-text-secondary">Across the globe</div>
          </div>
        </div>
        <div className="trust-item">
          <svg className="trust-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75" />
          </svg>
          <div>
            <div className="trust-text-primary">500K+ Companies</div>
            <div className="trust-text-secondary">Researched & reviewed</div>
          </div>
        </div>
        <div className="trust-item">
          <svg className="trust-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
          </svg>
          <div>
            <div className="trust-text-primary">100% Free</div>
            <div className="trust-text-secondary">No hidden charges</div>
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ════════════════════════════════════════════
          Intelligence Hub
          ════════════════════════════════════════════ */}
      <section className="intel-section">
        <div className="mx-auto max-w-6xl">
          <div className="intel-section-label">Intelligence Hub</div>
          <div className="intel-grid">
            {/* Compensation Intelligence */}
            <div className="intel-card">
              <div className="intel-card-icon coral">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                </svg>
              </div>
              <div className="intel-card-title">Compensation Intelligence</div>
              <div className="intel-card-desc">
                Explore real salary data and compensation trends across roles, companies and cities.
              </div>
              <div style={{ marginBottom: 4, fontSize: 12, color: "#717171" }}>Average salary in India</div>
              <div className="intel-card-value">₹28.4 <span style={{ fontSize: 14, fontWeight: 500 }}>LPA</span></div>
              <div style={{ marginTop: 6 }}>
                <span className="intel-card-change up">↑ 18% vs last year</span>
              </div>
              <div className="mini-chart">
                <svg className="mini-chart-line" viewBox="0 0 200 60" preserveAspectRatio="none">
                  <path
                    d="M0,55 C20,50 40,45 60,40 C80,35 100,30 120,22 C140,15 160,10 180,8 C190,6 200,5 200,5"
                    fill="none"
                    stroke="#FF5A5F"
                    strokeWidth="2"
                  />
                  <path
                    d="M0,55 C20,50 40,45 60,40 C80,35 100,30 120,22 C140,15 160,10 180,8 C190,6 200,5 200,5 L200,60 L0,60 Z"
                    fill="url(#chartGrad)"
                    opacity="0.15"
                  />
                  <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#FF5A5F" />
                      <stop offset="100%" stopColor="#FF5A5F" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>

            {/* Company Reviews & Culture */}
            <div className="intel-card">
              <div className="intel-card-icon blue">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
              </div>
              <div className="intel-card-title">Company Reviews & Culture</div>
              <div className="intel-card-desc">
                Read honest reviews and discover what employees really think.
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                <div className="intel-card-value" style={{ fontSize: 32 }}>4.2</div>
                <div>
                  <div className="star-rating">
                    {[1,2,3,4].map(i => (
                      <svg key={i} viewBox="0 0 24 24"><path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>
                    ))}
                    <svg viewBox="0 0 24 24" style={{ opacity: 0.3 }}><path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>
                  </div>
                  <div style={{ fontSize: 11, color: "#717171", marginTop: 2 }}>Based on 4.8M reviews</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 24, fontSize: 13 }}>
                <div>
                  <span style={{ fontWeight: 700, color: "#222" }}>72%</span>
                  <div style={{ fontSize: 11, color: "#717171" }}>Recommend to a friend</div>
                </div>
              </div>
              <div style={{ marginTop: 16, fontSize: 11, color: "#717171" }}>Top rated companies</div>
              <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                {[
                  { slug: "google", domain: "google.com" },
                  { slug: "microsoft", domain: "microsoft.com" },
                  { slug: "meta", domain: "meta.com" },
                  { slug: "apple", domain: "apple.com" },
                  { slug: "amazon", domain: "amazon.com" },
                ].map((c) => (
                  <img
                    key={c.slug}
                    src={`https://logo.clearbit.com/${c.domain}`}
                    alt={c.slug}
                    width={28}
                    height={28}
                    style={{ borderRadius: 8, objectFit: "contain" }}
                    loading="lazy"
                  />
                ))}
              </div>
            </div>

            {/* Interview Experiences */}
            <div className="intel-card">
              <div className="intel-card-icon purple">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                </svg>
              </div>
              <div className="intel-card-title">Interview Experiences</div>
              <div className="intel-card-desc">
                Practice real interview questions shared by candidates.
              </div>
              <div style={{ marginBottom: 8 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#8B5CF6", marginBottom: 8 }}>Most in-demand skills</div>
                <div style={{ fontSize: 11, color: "#717171", marginBottom: 6 }}>Based on interview trends</div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" as const }}>
                  {["System Design", "DSA", "React", "Python", "SQL", "AWS"].map(skill => (
                    <span key={skill} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
                <span className="skill-tag" style={{ background: "#FFF0F0", color: "#FF5A5F", borderColor: "#FFD4D6" }}>Software Engineer</span>
                <span className="skill-tag" style={{ background: "#FFF0F0", color: "#FF5A5F", borderColor: "#FFD4D6" }}>Product Manager</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          Bottom Cards
          ════════════════════════════════════════════ */}
      <section className="mx-auto max-w-6xl">
        <div className="bottom-grid">
          {/* Explore Companies */}
          <Link href="/companies" className="bottom-card">
            <div className="bottom-card-icon" style={{ background: "#FFF0F0" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF5A5F" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21" />
              </svg>
            </div>
            <div className="bottom-card-title">Explore companies →</div>
            <div className="bottom-card-desc">Browse companies, compare salaries, and explore career opportunities.</div>
          </Link>

          {/* Explore Interviews */}
          <Link href="/interviews" className="bottom-card">
            <div className="bottom-card-icon" style={{ background: "#F5F3FF" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163" />
              </svg>
            </div>
            <div className="bottom-card-title">Explore interviews →</div>
            <div className="bottom-card-desc">Read interview experiences and prepare with real questions.</div>
          </Link>

          {/* Offers & Negotiations */}
          <Link href="/compare" className="bottom-card">
            <div className="bottom-card-icon" style={{ background: "#ECFDF5" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
              </svg>
            </div>
            <div className="bottom-card-title">Offers & Negotiations</div>
            <div className="bottom-card-desc">
              See real offers, compare packages and negotiate confidently.
            </div>
            <div style={{ display: "flex", gap: 24, marginTop: 12 }}>
              <div>
                <div style={{ fontSize: 20, fontWeight: 800, color: "#222" }}>₹62 <span style={{ fontSize: 12, fontWeight: 500 }}>LPA</span></div>
                <div style={{ fontSize: 11, color: "#717171" }}>Highest reported offer</div>
              </div>
              <div>
                <div style={{ fontSize: 20, fontWeight: 800, color: "#222" }}>63%</div>
                <div style={{ fontSize: 11, color: "#717171" }}>Received negotiation</div>
              </div>
            </div>
          </Link>

          {/* Community Discussions */}
          <Link href="/community" className="bottom-card">
            <div className="bottom-card-icon" style={{ background: "#EFF6FF" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584" />
              </svg>
            </div>
            <div className="bottom-card-title">Community Discussions</div>
            <div className="bottom-card-desc">
              Join conversations, ask questions and share knowledge.
            </div>
            <div style={{ marginTop: 12, padding: "10px 14px", background: "#F7F7F7", borderRadius: 12, fontSize: 12, color: "#484848", fontStyle: "italic" }}>
              &quot;How is the work-life balance at top tech companies?&quot;
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" as const }}>
              <span className="trending-tag" style={{ fontSize: 11 }}>Layoffs 2024</span>
              <span className="trending-tag" style={{ fontSize: 11 }}>Work from Home</span>
            </div>
          </Link>
        </div>
      </section>
    </>
  );
}
