# TalentDash

> Structured Data → Comparable Insights → Better Decisions

Unlike traditional review platforms, TalentDash focuses on normalized compensation data that can be filtered, compared, and analyzed across companies, locations, and experience levels. The goal is to provide decision-ready compensation intelligence rather than unstructured opinion-based content.

The platform is built with a static-first mindset inspired by large-scale SEO products such as Levels.fyi, enabling fast page delivery, reduced infrastructure costs, and improved discoverability through search engines.

## Live Demo

- **https://talentdash-alpha.vercel.app/**

## Product Vision

TalentDash is built to make compensation data immediately useful:
- benchmark current pay against market data
- inspect company-level salary distributions
- compare offer details side-by-side
- calculate net salary and post-hike pay using built-in tools

## Navigation & Experience

The application navigation includes the following key sections:

- **Home** — live salary hero panel and quick snapshot of benchmark data
- **Salaries** — paginated salary listing with filters and search-ready UI
- **Companies** — list of companies and dedicated company detail pages
- **Compare** — side-by-side salary comparison engine
- **Tools** — salary tax calculator and hike calculator for decision support

## Features

- Live compensation dashboard with median salary, top company, level, and location
- Salary records with pagination and filtering
- Company pages showing median compensation and level distribution
- Compare view for direct salary record analysis
- Tools page for Salary & Tax calculation and Hike estimation
- API ingestion endpoint for salary records
- Responsive UI powered by Tailwind CSS
- Serverless-friendly Neon PostgreSQL backend via Prisma

## System Architecture

```
User
 │
 ▼
Next.js Application
 │
 ├── React Server Components
 ├── Static & ISR Pages
 ├── API Routes
 │
 ▼
Prisma ORM
 │
 ▼
Neon PostgreSQL
```

The frontend consumes data through typed API routes and server-side database queries. Prisma provides schema-driven access to the database while Neon PostgreSQL offers a scalable serverless database layer suitable for modern deployment platforms.

## Architecture Summary

TalentDash is designed for fast, data-driven page delivery with a modern full-stack approach:

- **ISR + static** for high-performance pages
- **Dynamic API routes** for live data ingestion and query operations
- **Prisma ORM** for schema-driven database access
- **Neon Postgres** for serverless-compatible production data
- **Tailwind CSS** for consistent styling and layout speed

## Project Structure

- `app/` — page routes, API route definitions, and layout
- `components/` — reusable UI, navigation, and domain components
- `lib/` — helper utilities, formatters, and query utilities
- `prisma/` — schema, migration history, and seed scripts
- `public/` — static assets
- `types/` — shared TypeScript type definitions

## Data Flow

```
Salary Submission
       │
       ▼
Validation Layer
       │
       ▼
Company Normalization
       │
       ▼
Total Compensation Calculation
       │
       ▼
Database Storage
       │
       ▼
Salary APIs
       │
       ▼
UI Rendering
```

All salary records are validated before persistence. Compensation values are calculated server-side to maintain consistency and prevent incorrect client submissions.

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
- Next.js API routes for data ingestion and query handling

### Deployment

- Vercel recommended
- Build command: `npx prisma generate && npm run build`
- Environment variable: `DATABASE_URL`

## Navigation Structure

The application currently exposes five primary sections:

### Home

Provides a high-level overview of the platform along with compensation benchmarks and platform statistics.

### Salaries

Core compensation exploration experience featuring filtering, sorting, pagination, and compensation breakdowns.

### Companies

Dedicated company pages containing compensation insights, salary distributions, and company-specific analytics.

### Compare

Allows side-by-side comparison of compensation records to assist users during offer evaluation and salary negotiations.

### Tools

Practical compensation planning utilities including:

- Salary & Tax Calculator
- Hike Calculator

These tools complement the research experience by helping users evaluate real-world salary outcomes.

## SEO Strategy

SEO is treated as a first-class concern throughout the application.

Implemented optimizations include:

- Dynamic metadata generation
- Canonical URLs
- Open Graph support
- Structured JSON-LD data
- Semantic heading hierarchy
- Static page generation where possible
- ISR for frequently updated content

This approach improves discoverability while maintaining fast page loads.

## API Overview

### POST /api/ingest-salary

Creates new salary records after validation and normalization.

Responsibilities:

- Field validation
- Compensation calculation
- Duplicate prevention
- Data normalization

### GET /api/salaries

Supports:

- Company filtering
- Role filtering
- Level filtering
- Location filtering
- Pagination
- Sorting

### GET /api/companies/[slug]

Returns:

- Company metadata
- Compensation statistics
- Salary records
- Level distribution

### GET /api/compare

Returns two salary records and their compensation differences for direct comparison.

## Performance Strategy

TalentDash is optimized for responsiveness and scalability.

Key optimizations:

- React Server Components
- Incremental Static Regeneration
- Server-side database queries
- Optimized Prisma queries
- Database indexing
- Minimal client-side JavaScript
- Responsive layouts

These decisions reduce bundle size while maintaining a smooth user experience.

## Architecture Decisions

### Why Neon PostgreSQL?

Neon provides a serverless PostgreSQL experience that integrates naturally with Prisma while reducing operational overhead.

### Why Prisma?

Prisma enables type-safe database access, migration management, and maintainable schema evolution.

### Why Next.js App Router?

The App Router enables React Server Components, nested layouts, streaming, and modern rendering strategies suitable for data-intensive applications.

### Why Tailwind CSS?

Tailwind accelerates UI development while maintaining consistency across components without introducing large UI framework dependencies.

## Trade-Offs & Scope Decisions

Given the limited trial timeline, development effort was prioritized toward:

- Core salary intelligence features
- Database integration
- Compensation comparison
- Filtering and pagination
- SEO foundations

Features intentionally left for future iterations include:

- Authentication
- Community discussions
- Review submissions
- Interview experiences
- Workplace Index rankings
- Administrative moderation dashboards

This ensured the core user journey remained complete and production-ready.

## Author

- **Gnanendra Kumar Pendyala**


