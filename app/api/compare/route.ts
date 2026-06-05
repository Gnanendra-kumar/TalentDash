/* ──────────────────────────────────────────────
   GET /api/compare
   
   Compare two salary records side by side.
   
   Query params:
     s1 — salary record UUID
     s2 — salary record UUID
   
   Returns both records + delta object.
   Delta = record_1_value - record_2_value.
   Positive = record 1 is higher.
   ────────────────────────────────────────────── */

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const s1 = searchParams.get("s1");
  const s2 = searchParams.get("s2");

  /* ── Validate params ─────────────────────── */
  if (!s1 || !s2) {
    return NextResponse.json(
      { error: true, message: "Both s1 and s2 query parameters are required" },
      { status: 400 }
    );
  }

  if (s1 === s2) {
    return NextResponse.json(
      { error: true, message: "s1 and s2 must be different salary records" },
      { status: 400 }
    );
  }

  /* ── Fetch both records ──────────────────── */
  const [record1, record2] = await Promise.all([
    prisma.salary.findUnique({
      where: { id: s1 },
      include: { company: { select: { name: true, slug: true } } },
    }),
    prisma.salary.findUnique({
      where: { id: s2 },
      include: { company: { select: { name: true, slug: true } } },
    }),
  ]);

  if (!record1) {
    return NextResponse.json(
      { error: true, message: `Salary record not found: ${s1}` },
      { status: 404 }
    );
  }

  if (!record2) {
    return NextResponse.json(
      { error: true, message: `Salary record not found: ${s2}` },
      { status: 404 }
    );
  }

  /* ── Serialize helper ────────────────────── */
  function serialize(s: typeof record1) {
    if (!s) return null;
    return {
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
    };
  }

  /* ── Compute deltas ──────────────────────── */
  const delta = {
    base_delta: Number(record1.baseSalary) - Number(record2.baseSalary),
    bonus_delta: Number(record1.bonus) - Number(record2.bonus),
    stock_delta: Number(record1.stock) - Number(record2.stock),
    tc_delta:
      Number(record1.totalCompensation) - Number(record2.totalCompensation),
    experience_delta: record1.experienceYears - record2.experienceYears,
  };

  return NextResponse.json({
    record_1: serialize(record1),
    record_2: serialize(record2),
    delta,
  });
}
