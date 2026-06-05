# TalentDash

TalentDash is a compensation intelligence dashboard built for India’s salary market. It surfaces live salary benchmarks, company salary distributions, and role-level comparisons using Next.js, Neon PostgreSQL, and Prisma.

## Live Demo

- https://talentdash-alpha.vercel.app/

## Features

- Live salary benchmarking panel on the homepage
- Salary listing with pagination, filtering, and sorting
- Company pages with median compensation and level distribution
- Side-by-side salary comparison view
- API ingestion endpoint for secure salary submissions
- Responsive, production-ready UI built with Tailwind CSS
- Neon PostgreSQL backend with Prisma ORM and serverless compatibility

## Tech Stack

### Frontend

- Next.js 16 App Router
- React 19
- Tailwind CSS v4
- TypeScript 5

### Backend

- Prisma 7
- Neon PostgreSQL via `@neondatabase/serverless`
- `@prisma/adapter-neon`
- Next.js API routes for ingestion and data queries

### Deployment

- Vercel recommended
- Local development with `npm run dev`

## Project Structure

- `app/` — Next.js App Router pages and API routes
- `components/` — reusable UI and feature components
- `lib/` — utilities, database helpers, and filter logic
- `prisma/` — Prisma schema, migrations, and seed scripts
- `public/` — static assets
- `types/` — shared TypeScript types

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Gnanendra-kumar/TalentDash.git
cd TalentDash
npm install
```

### 2. Set environment variables

Create a `.env` file in the project root with:

```env
DATABASE_URL="postgresql://neondb_owner:YOUR_PASSWORD@YOUR_HOST.neon.tech/neondb?sslmode=require"
```

### 3. Generate Prisma client and migrate

```bash
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed
```

### 4. Run locally

```bash
npm run dev
```

Visit `http://localhost:3000` to verify the app.

## Database Schema

TalentDash models the salary data with two core entities: `Company` and `Salary`.

### Company

- `id`: UUID primary key
- `name`: company display name
- `slug`: URL-safe company identifier
- `normalizedName`: lowercase dedupe key
- `industry`: company industry
- `headquarters`: company headquarters
- `foundedYear`: optional founded year
- `headcountRange`: optional employee count range
- `createdAt`, `updatedAt`

### Salary

- `id`: UUID primary key
- `companyId`: foreign key to `Company`
- `role`: job title
- `level`: compensation level enum
- `location`: city or region
- `currency`: enum (`INR`, `USD`, `GBP`, `EUR`)
- `experienceYears`: years of experience
- `baseSalary`, `bonus`, `stock`, `totalCompensation`
- `source`: enum (`CONTRIBUTOR`, `SCRAPED`, `AI_INFERRED`)
- `confidenceScore`: decimal trust score
- `isVerified`: boolean flag
- `submittedAt`: datetime

### Relationship

- `Company` has many `Salary`
- `Salary` belongs to `Company`

## Architecture Decisions

- **App Router**: uses Next.js App Router for modern page and API route handling.
- **ISR**: most pages use Incremental Static Regeneration to balance speed and freshness.
- **Dynamic API routes**: handle realtime salary ingestion and data retrieval.
- **Prisma + Neon**: chosen for type-safe database access and serverless DB compatibility.
- **Tailwind CSS**: used for fast, consistent styling without heavy CSS configuration.

## Performance Optimizations

- Edge caching and `stale-while-revalidate` for salary API endpoints
- ISR for homepage, `/salaries`, `/companies`, and compare views
- Database indexes on common filter/sort fields
- Minimal client-side logic on static pages for faster load times

## Future Improvements

- Add authentication and API keys for salary ingestion
- Implement on-demand ISR invalidation after new salary submissions
- Add search autocomplete for company and role lookup
- Build an admin moderation dashboard for submitted salary data
- Add cursor-based pagination for larger datasets
- Add analytics, monitoring, and production CI checks

## Author

- **Gnanendra Kumar Pendyala**

## Notes

- Keep `.env` private and do not commit it.
- Update the live demo URL if the deployment changes.
- If you add tests later, include a test section in this README.
