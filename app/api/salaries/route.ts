/* ──────────────────────────────────────────────
   GET /api/salaries
   
   Filtered, sorted, paginated salary listing.
   
   Query params:
     company  — partial match (ILIKE)
     role     — partial match (ILIKE)
     level    — exact enum match
     location — partial match (ILIKE)
     currency — exact enum match
     sort     — total_comp_desc | total_comp_asc | date_desc
     page     — int, default 1
     limit    — int, default 25, max 100
   ────────────────────────────────────────────── */

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { Level, Currency, Prisma } from "@prisma/client";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  /* ── Parse query params ──────────────────── */
  const company = searchParams.get("company") ?? undefined;
  const role = searchParams.get("role") ?? undefined;
  const levelParam = searchParams.get("level") ?? undefined;
  const location = searchParams.get("location") ?? undefined;
  const currencyParam = searchParams.get("currency") ?? undefined;
  const sort = searchParams.get("sort") ?? "total_comp_desc";
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10) || 1);
  const rawLimit = parseInt(searchParams.get("limit") ?? "25", 10) || 25;
  const limit = Math.min(Math.max(1, rawLimit), 100); // Hard cap at 100

  /* ── Build WHERE clause ──────────────────── */
  const where: Prisma.SalaryWhereInput = {};

  if (company) {
    where.company = {
      name: { contains: company, mode: "insensitive" },
    };
  }

  if (role) {
    where.role = { contains: role, mode: "insensitive" };
  }

  if (levelParam) {
    const validLevels = Object.values(Level);
    if (validLevels.includes(levelParam as Level)) {
      where.level = levelParam as Level;
    }
  }

  if (location) {
    where.location = { contains: location, mode: "insensitive" };
  }

  if (currencyParam) {
    const validCurrencies = Object.values(Currency);
    if (validCurrencies.includes(currencyParam as Currency)) {
      where.currency = currencyParam as Currency;
    }
  }

  /* ── Build ORDER BY ──────────────────────── */
  let orderBy: Prisma.SalaryOrderByWithRelationInput;

  switch (sort) {
    case "total_comp_asc":
      orderBy = { totalCompensation: "asc" };
      break;
    case "date_desc":
      orderBy = { submittedAt: "desc" };
      break;
    case "total_comp_desc":
    default:
      orderBy = { totalCompensation: "desc" };
      break;
  }

  /* ── Execute queries ─────────────────────── */
  const [total, salaries] = await Promise.all([
    prisma.salary.count({ where }),
    prisma.salary.findMany({
      where,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
      include: {
        company: {
          select: { name: true, slug: true },
        },
      },
    }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / limit));

  /* ── Serialize BigInts ───────────────────── */
  const data = salaries.map((s) => ({
    id: s.id,
    company_id: s.companyId,
    company_name: s.company.name,
    company_slug: s.company.slug,
    role: s.role,
    level: s.level,
    location: s.location,
    currency: s.currency,
    experience_years: s.experienceYears,
    base_salary: Number(s.baseSalary),
    bonus: Number(s.bonus),
    stock: Number(s.stock),
    total_compensation: Number(s.totalCompensation),
    source: s.source,
    confidence_score: Number(s.confidenceScore),
    is_verified: s.isVerified,
    submitted_at: s.submittedAt.toISOString(),
  }));

  return NextResponse.json(
    {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages,
      },
    },
    {
      headers: {
        "Cache-Control": "s-maxage=300, stale-while-revalidate=3600",
      },
    }
  );
}
