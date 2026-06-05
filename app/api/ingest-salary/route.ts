/* ──────────────────────────────────────────────
   POST /api/ingest-salary
   
   Validation → Normalisation → Dedup → Insert
   
   Accepts a salary record, validates every field,
   normalises the company name, recomputes TC,
   checks for duplicates, and stores the record.
   ────────────────────────────────────────────── */

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { Level, Currency, Source } from "@prisma/client";

/* ─── Valid enum values ──────────────────────── */

const VALID_LEVELS = Object.values(Level);
const VALID_CURRENCIES = Object.values(Currency);
const VALID_SOURCES = Object.values(Source);

/* ─── Normalisation helpers ──────────────────── */

function normalizeCompanyName(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/* ─── Validation error factory ───────────────── */

function fieldError(field: string, message: string) {
  return NextResponse.json(
    { error: true, field, message },
    { status: 400 }
  );
}

/* ─── POST handler ───────────────────────────── */

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: true, field: "body", message: "Invalid JSON body" },
      { status: 400 }
    );
  }

  /* ── 1. Required fields check ────────────── */
  const requiredFields = [
    "company_name",
    "role",
    "level",
    "location",
    "currency",
    "experience_years",
    "base_salary",
    "source",
    "confidence_score",
    "submitted_at",
  ];

  for (const field of requiredFields) {
    if (body[field] === undefined || body[field] === null || body[field] === "") {
      return fieldError(field, `${field} is required`);
    }
  }

  /* ── 2. Type checks ─────────────────────── */
  if (typeof body.company_name !== "string") {
    return fieldError("company_name", "company_name must be a string");
  }
  if (typeof body.role !== "string") {
    return fieldError("role", "role must be a string");
  }
  if (typeof body.level !== "string") {
    return fieldError("level", "level must be a string");
  }
  if (typeof body.location !== "string") {
    return fieldError("location", "location must be a string");
  }
  if (typeof body.currency !== "string") {
    return fieldError("currency", "currency must be a string");
  }
  if (typeof body.experience_years !== "number") {
    return fieldError("experience_years", "experience_years must be a number");
  }
  if (typeof body.base_salary !== "number") {
    return fieldError("base_salary", "base_salary must be a number");
  }
  if (typeof body.source !== "string") {
    return fieldError("source", "source must be a string");
  }
  if (typeof body.confidence_score !== "number") {
    return fieldError("confidence_score", "confidence_score must be a number");
  }
  if (typeof body.submitted_at !== "string") {
    return fieldError("submitted_at", "submitted_at must be an ISO 8601 date string");
  }

  /* ── 3. Enum validation ─────────────────── */
  if (!VALID_LEVELS.includes(body.level as Level)) {
    return fieldError(
      "level",
      `Level must be one of: ${VALID_LEVELS.join(", ")}`
    );
  }
  if (!VALID_CURRENCIES.includes(body.currency as Currency)) {
    return fieldError(
      "currency",
      `Currency must be one of: ${VALID_CURRENCIES.join(", ")}`
    );
  }
  if (!VALID_SOURCES.includes(body.source as Source)) {
    return fieldError(
      "source",
      `Source must be one of: ${VALID_SOURCES.join(", ")}`
    );
  }

  /* ── 4. Range checks ────────────────────── */
  const experienceYears = body.experience_years as number;
  if (!Number.isInteger(experienceYears) || experienceYears < 1 || experienceYears > 50) {
    return fieldError(
      "experience_years",
      "experience_years must be an integer between 1 and 50"
    );
  }

  const baseSalary = body.base_salary as number;
  if (baseSalary <= 0) {
    return fieldError("base_salary", "base_salary must be greater than 0");
  }

  const confidenceScore = body.confidence_score as number;
  if (confidenceScore < 0 || confidenceScore > 1) {
    return fieldError(
      "confidence_score",
      "confidence_score must be between 0.0 and 1.0"
    );
  }

  const bonus =
    body.bonus !== undefined && body.bonus !== null
      ? Number(body.bonus)
      : 0;
  const stock =
    body.stock !== undefined && body.stock !== null
      ? Number(body.stock)
      : 0;

  if (typeof bonus !== "number" || isNaN(bonus)) {
    return fieldError("bonus", "bonus must be a number");
  }
  if (typeof stock !== "number" || isNaN(stock)) {
    return fieldError("stock", "stock must be a number");
  }

  /* ── Parse submitted_at ────────────────── */
  const submittedAt = new Date(body.submitted_at as string);
  if (isNaN(submittedAt.getTime())) {
    return fieldError("submitted_at", "submitted_at must be a valid ISO 8601 date");
  }

  /* ── 5. Normalisation — find or create Company ── */
  const rawCompanyName = (body.company_name as string).trim();
  const normalizedName = normalizeCompanyName(rawCompanyName);
  const slug = generateSlug(rawCompanyName);

  // Provide defaults for company fields if not supplied
  const industry = typeof body.industry === "string" ? body.industry : "Technology";
  const headquarters = typeof body.headquarters === "string" ? body.headquarters : "Unknown";

  const company = await prisma.company.upsert({
    where: { slug },
    update: {},
    create: {
      name: rawCompanyName,
      slug,
      normalizedName,
      industry,
      headquarters,
    },
  });

  /* ── 6. Recompute total_compensation ──── */
  const totalCompensation = BigInt(baseSalary) + BigInt(bonus) + BigInt(stock);

  /* ── 7. Duplicate check ─────────────────── */
  const fortyEightHoursAgo = new Date(Date.now() - 48 * 60 * 60 * 1000);

  const potentialDuplicates = await prisma.salary.findMany({
    where: {
      companyId: company.id,
      role: body.role as string,
      level: body.level as Level,
      location: body.location as string,
      submittedAt: { gte: fortyEightHoursAgo },
    },
    select: { baseSalary: true },
  });

  for (const existing of potentialDuplicates) {
    const existingBase = Number(existing.baseSalary);
    const diff = Math.abs(existingBase - baseSalary) / existingBase;
    if (diff <= 0.1) {
      return NextResponse.json(
        {
          error: true,
          field: "duplicate",
          message:
            "A similar salary record (same company, role, level, location) was submitted in the last 48 hours with a base salary within 10%.",
        },
        { status: 409 }
      );
    }
  }

  /* ── 8. Insert ──────────────────────────── */
  const salary = await prisma.salary.create({
    data: {
      companyId: company.id,
      role: body.role as string,
      level: body.level as Level,
      location: body.location as string,
      currency: body.currency as Currency,
      experienceYears,
      baseSalary: BigInt(baseSalary),
      bonus: BigInt(bonus),
      stock: BigInt(stock),
      totalCompensation,
      source: body.source as Source,
      confidenceScore: confidenceScore,
      isVerified: body.is_verified === true,
      submittedAt,
    },
    include: { company: true },
  });

  /* ── 9. Serialize BigInts for JSON ──────── */
  const serialized = {
    id: salary.id,
    company_id: salary.companyId,
    company_name: salary.company.name,
    company_slug: salary.company.slug,
    role: salary.role,
    level: salary.level,
    location: salary.location,
    currency: salary.currency,
    experience_years: salary.experienceYears,
    base_salary: Number(salary.baseSalary),
    bonus: Number(salary.bonus),
    stock: Number(salary.stock),
    total_compensation: Number(salary.totalCompensation),
    source: salary.source,
    confidence_score: Number(salary.confidenceScore),
    is_verified: salary.isVerified,
    submitted_at: salary.submittedAt.toISOString(),
  };

  return NextResponse.json(serialized, { status: 201 });
}
