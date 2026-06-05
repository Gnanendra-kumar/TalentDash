/* ──────────────────────────────────────────────
   Home Page — Hero landing page with light surface,
   structured data panel, and clear brand hierarchy.
   ────────────────────────────────────────────── */

import Link from "next/link";
import { prisma } from "@/lib/db";
import { safeQuery } from "@/lib/safe-query";

export const revalidate = 3600; // ISR: revalidate every 1 hour

type HeroSample = {
  role: string;
  level: string;
  location: string;
  currency: string;
  totalCompensation: bigint;
  company: {
    name: string;
  };
} | null;

function formatMoney(value: number | bigint, currency: string) {
  const amount = typeof value === "bigint" ? Number(value) : value;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    currencyDisplay: "narrowSymbol",
    maximumFractionDigits: 0,
  }).format(amount);
}

function cleanLevel(level: string) {
  return level.replace(/_/g, "-");
}

export default async function HomePage() {
  /* ── Compute real stats from database ──────── */
  const [totalRecords, dbCompanies, salaryMeta, totalCompanies, heroSample] = await Promise.all([
    safeQuery(() => prisma.salary.count(), 0),
    safeQuery(() => prisma.company.findMany({ select: { id: true, name: true, slug: true }, orderBy: { name: "asc" }, take: 8 }), []),
    safeQuery(() => prisma.salary.findMany({ select: { location: true, level: true } }), []),
    safeQuery(() => prisma.company.count(), 0),
    safeQuery(
      () =>
        prisma.salary.findFirst({
          select: {
            role: true,
            level: true,
            location: true,
            currency: true,
            totalCompensation: true,
            company: {
              select: {
                name: true,
              },
            },
          },
          orderBy: { submittedAt: "desc" },
        }),
      null as HeroSample
    ),
  ]);
  const totalCities = new Set(salaryMeta.map((s) => s.location)).size;
  const totalLevels = new Set(salaryMeta.map((s) => s.level)).size;

  return (
    <>
      {/* ════════════════════════════════════════════
          Hero Section
          ════════════════════════════════════════════ */}
      <section className="hero-section relative overflow-hidden px-4 py-16 sm:py-20">
        <div className="hero-grid-bg" aria-hidden="true" />
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="relative z-10">
            <div className="mb-4 inline-flex items-center gap-3 rounded-full border border-[#EBEBEB] bg-white px-4 py-2 text-sm font-semibold text-[#484848] shadow-sm">
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#FF5A5F]" />
              Data-first compensation intelligence
            </div>

            <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-[#222222] sm:text-5xl lg:text-6xl">
              Compensation clarity for India&apos;s tech teams,
              <span className="block text-[#FF5A5F]">built for confident offers.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-[#484848] sm:text-lg">
              Real salary benchmarks, offer comparisons, and company compensation insights in a clean, readable interface — no fluff, no guesswork.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/salaries"
                className="inline-flex items-center justify-center rounded-xl bg-[#FF5A5F] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#FF5A5F]/20 transition hover:bg-[#E04E53]"
              >
                Explore Salaries
              </Link>
              <Link
                href="/compare"
                className="inline-flex items-center justify-center rounded-xl border border-[#EBEBEB] bg-white px-7 py-3.5 text-sm font-semibold text-[#222222] transition hover:border-[#222222]/30 hover:bg-[#F7F7F7]"
              >
                Compare Offers
              </Link>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-[#EBEBEB] bg-white px-5 py-4 shadow-sm">
                <p className="text-xs uppercase tracking-[0.3em] text-[#717171]">Records</p>
                <p className="mt-3 text-3xl font-semibold text-[#222222]">{totalRecords}+</p>
              </div>
              <div className="rounded-3xl border border-[#EBEBEB] bg-white px-5 py-4 shadow-sm">
                <p className="text-xs uppercase tracking-[0.3em] text-[#717171]">Companies</p>
                <p className="mt-3 text-3xl font-semibold text-[#222222]">{totalCompanies}</p>
              </div>
              <div className="rounded-3xl border border-[#EBEBEB] bg-white px-5 py-4 shadow-sm">
                <p className="text-xs uppercase tracking-[0.3em] text-[#717171]">Cities</p>
                <p className="mt-3 text-3xl font-semibold text-[#222222]">{totalCities}</p>
              </div>
            </div>
          </div>

          <div className="relative z-10">
            <HeroVisual sample={heroSample} />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          Trusted Companies Marquee
          ════════════════════════════════════════════ */}
      <section className="border-t border-[#EBEBEB] bg-white py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-[#717171]">
            Salary data from leading tech companies
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {dbCompanies.map((company) => (
              <Link
                key={company.id}
                href={`/companies/${company.slug}`}
                className="group flex items-center gap-2 transition-opacity duration-300 hover:opacity-100 opacity-50"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F7F7F7] text-sm font-bold text-[#484848] transition-colors group-hover:bg-[#FF5A5F]/10 group-hover:text-[#FF5A5F]">
                  {company.name.charAt(0)}
                </div>
                <span className="text-sm font-semibold text-[#484848] transition-colors group-hover:text-[#222222]">
                  {company.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          Features Section
          ════════════════════════════════════════════ */}
      <section className="bg-[#F7F7F7] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-bold text-[#222222] sm:text-3xl">
              Why TalentDash?
            </h2>
            <p className="mt-2 text-sm text-[#717171]">
              Everything you need to negotiate with confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"
                />
              }
              title="Real salary data"
              description="Verified compensation insights from contributors and public sources, not guesswork."
            />
            <FeatureCard
              icon={
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                />
              }
              title="Offer comparison"
              description="Evaluate two packages side by side with clear compensation deltas across salary, bonus, and equity."
            />
            <FeatureCard
              icon={
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
                />
              }
              title="Search with precision"
              description="Drill into company, role, level, location, and compensation filters to discover exactly what matters."
            />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          CTA Section
          ════════════════════════════════════════════ */}
      <section className="cta-section relative overflow-hidden py-20">
        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Ready to trade noise for clarity?
          </h2>
          <p className="mt-3 text-sm text-white/70">
            Browse real compensation data from India&apos;s top tech companies.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/salaries"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-[#222222] shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
            >
              Start Exploring
            </Link>
            <Link
              href="/companies"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-white/40 hover:bg-white/10 hover:-translate-y-0.5"
            >
              Browse Companies
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

/* ─── Hero Visual ───────────────────────────── */

function HeroVisual({ sample }: { sample: HeroSample }) {
  const totalComp = sample ? formatMoney(sample.totalCompensation, sample.currency) : "—";
  const companyName = sample?.company.name ?? "—";
  const level = sample ? cleanLevel(sample.level) : "—";
  const location = sample?.location ?? "—";

  return (
    <div className="hero-visual relative overflow-hidden rounded-[32px] border border-[#EBEBEB] bg-white p-6 shadow-[0_36px_90px_rgba(13,42,76,0.08)]">
      <div className="flex items-center justify-between gap-3 rounded-3xl bg-[#F2F2F2] px-4 py-3 text-sm font-semibold text-[#222222]">
        <span>Live compensation panel</span>
        <span className="rounded-full bg-[#FF5A5F]/10 px-3 py-1 text-[#FF5A5F]">Data first</span>
      </div>

      <div className="mt-6 grid gap-4">
        <div className="rounded-[28px] bg-[#F7F7F7] p-6">
          <div className="text-xs uppercase tracking-[0.22em] text-[#717171]">Compensation</div>
          <div className="mt-4 text-4xl font-bold tracking-tight text-[#222222]">{totalComp}</div>
        </div>

        <dl className="grid gap-3 rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-[#EBEBEB] text-sm text-[#484848]">
          <div className="flex items-center justify-between border-b border-[#EBEBEB] pb-3">
            <dt className="font-semibold text-[#222222]">Median Salary</dt>
            <dd>{totalComp}</dd>
          </div>
          <div className="flex items-center justify-between border-b border-[#EBEBEB] pb-3 pt-3">
            <dt className="font-semibold text-[#222222]">Top Company</dt>
            <dd>{companyName}</dd>
          </div>
          <div className="flex items-center justify-between border-b border-[#EBEBEB] pb-3 pt-3">
            <dt className="font-semibold text-[#222222]">Level</dt>
            <dd>{level}</dd>
          </div>
          <div className="flex items-center justify-between pt-3">
            <dt className="font-semibold text-[#222222]">Location</dt>
            <dd>{location}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

function ProgressBar({
  label,
  percent,
  color,
}: {
  label: string;
  percent: number;
  color: string;
}) {
  return (
    <div className="rounded-full bg-white px-4 py-3 shadow-sm">
      <div className="flex items-center justify-between text-sm text-[#222222]">
        <span>{label}</span>
        <span>{percent}%</span>
      </div>
      <div className="mt-3 h-2 rounded-full bg-[#E2E8F0]">
        <div className="h-2 rounded-full" style={{ width: `${Math.min(100, Math.max(0, percent))}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}

/* ─── Stat Card ──────────────────────────────── */

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="stat-card flex flex-col items-center justify-center gap-2 rounded-3xl border border-[#EBEBEB] bg-white px-5 py-6 shadow-sm">
      <span className="text-3xl font-extrabold tracking-tight text-[#222222] sm:text-4xl">
        {value}
      </span>
      <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#717171]">
        {label}
      </span>
    </div>
  );
}

/* ─── Feature Card ───────────────────────────── */

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group rounded-2xl border border-[#EBEBEB] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#FF5A5F]/10 text-[#FF5A5F] transition-colors group-hover:bg-[#FF5A5F] group-hover:text-white">
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          {icon}
        </svg>
      </div>
      <h3 className="text-base font-semibold text-[#222222]">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-[#717171]">
        {description}
      </p>
    </div>
  );
}
