# TalentDash

India's compensation intelligence platform. Compare salaries by company, role, and level.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 16 (App Router, Turbopack) |
| **Database** | Neon PostgreSQL (serverless) |
| **ORM** | Prisma 7 with `@prisma/adapter-neon` |
| **Deployment** | Vercel |
| **Styling** | Tailwind CSS v4 |
| **Language** | TypeScript 5 |

## Getting Started

### 1. Clone and install

```bash
git clone <your-repo-url>
cd talentdash
npm install
```

### 2. Set up Neon database

1. Go to [console.neon.tech](https://console.neon.tech) and create a new project
2. Copy the connection string
3. Create `.env` in the project root:

```env
DATABASE_URL="postgresql://neondb_owner:YOUR_PASSWORD@YOUR_HOST.neon.tech/neondb?sslmode=require"
```

### 3. Run migrations and seed

```bash
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed
```

### 4. Run dev server

```bash
npm run dev
```

### 5. Verify end-to-end flow

1. Visit `http://localhost:3000` → should see real stats from database
2. Visit `http://localhost:3000/salaries` → should see salary records from Neon
3. Visit `http://localhost:3000/companies/google` → should see Google's salary data
4. POST a new salary record:
   ```bash
   curl -X POST http://localhost:3000/api/ingest-salary \
     -H "Content-Type: application/json" \
     -d '{
       "company_name": "Google",
       "role": "Staff Engineer",
       "level": "STAFF",
       "location": "Bengaluru",
       "currency": "INR",
       "experience_years": 15,
       "base_salary": 8000000,
       "bonus": 2000000,
       "stock": 6000000,
       "source": "CONTRIBUTOR",
       "confidence_score": 0.9,
       "submitted_at": "2024-06-05T10:00:00Z"
     }'
   ```
5. After ISR revalidation (5 minutes), the new record appears on `/salaries`

## Deploy to Vercel

```bash
npm i -g vercel
vercel
```

Add `DATABASE_URL` as an environment variable in Vercel project settings.

---

## Architecture Decisions

### Static vs ISR vs Dynamic — per page

| Page | Rendering | Revalidation | Rationale |
|------|-----------|-------------|-----------|
| `/` (Home) | ISR | 3600s (1h) | Stats change slowly; 1-hour staleness is acceptable for a landing page. Serves instantly from edge. |
| `/salaries` | ISR | 300s (5m) | This is the primary data page. Users expect recent data, but 5-minute staleness is acceptable. Keeps the page fast on first load. |
| `/companies` | ISR | 3600s (1h) | New companies are rare events. 1-hour revalidation balances freshness with performance. |
| `/companies/[slug]` | ISR + `generateStaticParams` | 3600s (1h) | Company pages are pre-rendered at build time via live DB query. ISR ensures new salary records appear within 1 hour. `dynamicParams = true` (default) means new slugs get SSR'd on first request, then cached. |
| `/compare` | ISR | 300s (5m) | Users expect current data when comparing offers. Short revalidation window. |
| API routes | Dynamic | N/A (Cache-Control headers) | API routes are always dynamic. CDN caching is handled via `Cache-Control` headers. |

**Why ISR over full dynamic?** ISR gives us the best of both worlds: pages serve instantly from the CDN edge (like static), but revalidate in the background so data stays fresh. Full SSR would add latency on every request. Full static would require rebuilds for data changes.

**Why not full SSG?** TalentDash's data changes when users submit salaries via `/api/ingest-salary`. Full SSG would require a rebuild for every data change, which is too slow.

### Cache-Control TTLs

| Endpoint | Header | Rationale |
|----------|--------|-----------|
| `GET /api/salaries` | `s-maxage=300, stale-while-revalidate=3600` | 5-minute edge cache. Users browsing salaries get fast responses, and data is never more than 5 minutes stale. The 1-hour SWR means the CDN serves stale for up to 1 hour while revalidating — users never see a slow response. |
| `GET /api/companies/:slug` | `s-maxage=3600, stale-while-revalidate=86400` | 1-hour edge cache. Company data is more stable than the salary listing. The 24-hour SWR ensures even cold requests are served quickly. |

### Pagination: page-based vs cursor-based

**Decision: page-based pagination.**

**Why:**
1. **URL sharability** — Page numbers work naturally in URLs (`/salaries?page=3`). Users can share specific pages. Cursor-based would require opaque tokens in URLs.
2. **SEO** — Search engines can crawl page-based paginated content. Cursor-based is invisible to crawlers.
3. **Total count display** — Users see "Page 2 of 15", which requires knowing the total. Cursor-based pagination doesn't naturally support this.
4. **Dataset size** — Our dataset is in the thousands, not millions. Page-based pagination with `OFFSET/LIMIT` performs well at this scale with proper indexes.

**When cursor-based would be better:** If the dataset grows to millions of records, cursor-based pagination (using `submittedAt` or `id` as cursor) would be more performant because `OFFSET` gets expensive for large skip values.

### `generateStaticParams` from real database

The company detail page `/companies/[slug]` uses `generateStaticParams()` that runs a live Prisma query against the Neon database at build time:

```typescript
export async function generateStaticParams() {
  const companies = await prisma.company.findMany({
    select: { slug: true },
  });
  return companies.map((c) => ({ slug: c.slug }));
}
```

This means:
- **No hardcoded arrays** — all slugs come from the database
- **New companies auto-deploy** — adding a company via `POST /api/ingest-salary` and redeploying automatically creates that company's page
- **`dynamicParams = true`** (Next.js default) — if a slug isn't pre-rendered, Next.js SSRs it on first request, then caches it

### What I would build with more time

1. **On-demand ISR** — Call `revalidatePath('/salaries')` in the `POST /api/ingest-salary` handler so new records appear immediately instead of waiting for the ISR cycle.
2. **Search autocomplete** — Full-text search with `pg_trgm` and a `/api/search` endpoint for instant company/role suggestions.
3. **Authentication** — NextAuth.js with rate limiting per user to prevent abuse of the ingestion endpoint.
4. **Admin dashboard** — A `/admin` page for reviewing unverified records and managing company data.
5. **GraphQL API** — For more flexible client-side queries.
6. **Analytics** — Track which companies and roles are most viewed.

### What I did NOT build (and why)

| Feature | Reason |
|---------|--------|
| **Authentication** | Out of scope for the trial. The ingestion endpoint is public. In production, this would use API keys or OAuth. |
| **Rate limiting** | Would add `upstash/ratelimit` in production. Omitted to keep dependencies minimal. |
| **Full-text search** | The current ILIKE filtering is sufficient for the dataset size. Would switch to `pg_trgm` or Elasticsearch at scale. |
| **Email notifications** | Not part of the core product requirement. |
| **Mobile app** | The web app is fully responsive. A native app would be a separate project. |

---

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/ingest-salary` | Submit a new salary record with full validation |
| `GET` | `/api/salaries` | Paginated, filtered salary listing |
| `GET` | `/api/companies/:slug` | Company detail with median TC + level distribution |
| `GET` | `/api/compare?s1=...&s2=...` | Side-by-side salary comparison |

## Database Schema

```
Company (1) ←→ (many) Salary
```

- **Company**: `id`, `name`, `slug` (unique), `normalized_name`, `industry`, `headquarters`, `founded_year`, `headcount_range`
- **Salary**: `id`, `company_id` (FK), `role`, `level` (enum), `location`, `currency` (enum), `experience_years`, `base_salary`, `bonus`, `stock`, `total_compensation` (computed), `source` (enum), `confidence_score`, `is_verified`, `submitted_at`
- **Indexes**: `[company_id, level, location]`, `[total_compensation]`, `[submitted_at]`, `[location, level]`
