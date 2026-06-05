/* ──────────────────────────────────────────────
   TalentDash — Prisma Seed Script
   
   20 companies × 5–8 records = 110+ salary records
   Spans all 11 levels, 7+ cities, INR and USD.
   
   Edge cases:
   - Zero bonus, zero stock
   - Very high equity (Principal)
   - Company name normalisation ("Google India",
     "GOOGLE", "google" → slug "google")
   
   Run: npx prisma db seed
   ────────────────────────────────────────────── */

import { PrismaClient, Level, Currency, Source } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const DATABASE_URL = process.env.DATABASE_URL!;
const adapter = new PrismaNeon({ connectionString: DATABASE_URL });
const prisma = new PrismaClient({ adapter });

/* ─── Helpers ────────────────────────────────── */

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

/* ─── Company Definitions ────────────────────── */

interface CompanyDef {
  name: string;
  displayName: string;
  industry: string;
  headquarters: string;
  foundedYear: number | null;
  headcountRange: string | null;
}

const COMPANIES: CompanyDef[] = [
  { name: "Google", displayName: "Google", industry: "Technology", headquarters: "Mountain View, CA", foundedYear: 1998, headcountRange: "100,000+" },
  { name: "Amazon", displayName: "Amazon", industry: "Technology / E-Commerce", headquarters: "Seattle, WA", foundedYear: 1994, headcountRange: "100,000+" },
  { name: "Meta", displayName: "Meta", industry: "Technology / Social Media", headquarters: "Menlo Park, CA", foundedYear: 2004, headcountRange: "50,000–100,000" },
  { name: "Microsoft", displayName: "Microsoft", industry: "Technology", headquarters: "Redmond, WA", foundedYear: 1975, headcountRange: "100,000+" },
  { name: "NVIDIA", displayName: "NVIDIA", industry: "Semiconductors", headquarters: "Santa Clara, CA", foundedYear: 1993, headcountRange: "20,000–50,000" },
  { name: "Flipkart", displayName: "Flipkart", industry: "E-Commerce", headquarters: "Bengaluru, India", foundedYear: 2007, headcountRange: "20,000–50,000" },
  { name: "Meesho", displayName: "Meesho", industry: "E-Commerce / Social Commerce", headquarters: "Bengaluru, India", foundedYear: 2015, headcountRange: "1,000–5,000" },
  { name: "Razorpay", displayName: "Razorpay", industry: "Fintech", headquarters: "Bengaluru, India", foundedYear: 2014, headcountRange: "1,000–5,000" },
  { name: "Zepto", displayName: "Zepto", industry: "Quick Commerce", headquarters: "Mumbai, India", foundedYear: 2021, headcountRange: "1,000–5,000" },
  { name: "TCS", displayName: "TCS", industry: "IT Services", headquarters: "Mumbai, India", foundedYear: 1968, headcountRange: "100,000+" },
  { name: "Infosys", displayName: "Infosys", industry: "IT Services", headquarters: "Bengaluru, India", foundedYear: 1981, headcountRange: "100,000+" },
  { name: "Wipro", displayName: "Wipro", industry: "IT Services", headquarters: "Bengaluru, India", foundedYear: 1945, headcountRange: "100,000+" },
  { name: "Swiggy", displayName: "Swiggy", industry: "Food Delivery / Quick Commerce", headquarters: "Bengaluru, India", foundedYear: 2014, headcountRange: "5,000–10,000" },
  { name: "PhonePe", displayName: "PhonePe", industry: "Fintech / Payments", headquarters: "Bengaluru, India", foundedYear: 2015, headcountRange: "5,000–10,000" },
  { name: "CRED", displayName: "CRED", industry: "Fintech", headquarters: "Bengaluru, India", foundedYear: 2018, headcountRange: "1,000–5,000" },
  { name: "Atlassian", displayName: "Atlassian", industry: "Technology / SaaS", headquarters: "Sydney, Australia", foundedYear: 2002, headcountRange: "10,000–20,000" },
  { name: "Uber", displayName: "Uber India", industry: "Technology / Mobility", headquarters: "San Francisco, CA", foundedYear: 2009, headcountRange: "20,000–50,000" },
  { name: "Paytm", displayName: "Paytm", industry: "Fintech / Payments", headquarters: "Noida, India", foundedYear: 2010, headcountRange: "10,000–20,000" },
  { name: "Dream11", displayName: "Dream11", industry: "Gaming / Sports Tech", headquarters: "Mumbai, India", foundedYear: 2008, headcountRange: "1,000–5,000" },
  { name: "Groww", displayName: "Groww", industry: "Fintech / Investment", headquarters: "Bengaluru, India", foundedYear: 2016, headcountRange: "1,000–5,000" },
];

/* ─── Salary Record Definitions ──────────────── */

interface SalaryDef {
  companyName: string; // Will be normalised to find company
  role: string;
  level: Level;
  location: string;
  currency: Currency;
  experienceYears: number;
  baseSalary: bigint;
  bonus: bigint;
  stock: bigint;
  source: Source;
  confidenceScore: number;
  isVerified: boolean;
  submittedAt: string;
}

const SALARIES: SalaryDef[] = [
  // ─── Google (7 records, includes normalisation demo) ───
  { companyName: "Google India", role: "Software Engineer", level: Level.L3, location: "Bengaluru", currency: Currency.INR, experienceYears: 2, baseSalary: 2500000_00n, bonus: 400000_00n, stock: 800000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.95, isVerified: true, submittedAt: "2024-03-15T10:30:00Z" },
  { companyName: "GOOGLE", role: "Software Engineer", level: Level.L4, location: "Bengaluru", currency: Currency.INR, experienceYears: 5, baseSalary: 3800000_00n, bonus: 600000_00n, stock: 1500000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.92, isVerified: true, submittedAt: "2024-04-10T14:20:00Z" },
  { companyName: "google", role: "Software Engineer", level: Level.L5, location: "Hyderabad", currency: Currency.INR, experienceYears: 8, baseSalary: 5200000_00n, bonus: 1000000_00n, stock: 3000000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.90, isVerified: true, submittedAt: "2024-02-20T09:15:00Z" },
  { companyName: "Google", role: "Machine Learning Engineer", level: Level.L4, location: "Bengaluru", currency: Currency.INR, experienceYears: 4, baseSalary: 4000000_00n, bonus: 700000_00n, stock: 1800000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.88, isVerified: true, submittedAt: "2024-05-01T11:00:00Z" },
  { companyName: "Google", role: "Product Manager", level: Level.L5, location: "Bengaluru", currency: Currency.INR, experienceYears: 10, baseSalary: 5500000_00n, bonus: 1200000_00n, stock: 3500000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.93, isVerified: true, submittedAt: "2024-01-18T16:45:00Z" },
  { companyName: "Google", role: "Software Engineer", level: Level.L6, location: "Bengaluru", currency: Currency.INR, experienceYears: 14, baseSalary: 7000000_00n, bonus: 1500000_00n, stock: 5000000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.85, isVerified: false, submittedAt: "2024-06-05T08:30:00Z" },
  { companyName: "Google", role: "Software Engineer", level: Level.L4, location: "San Francisco", currency: Currency.USD, experienceYears: 4, baseSalary: 18000000n, bonus: 3000000n, stock: 8000000n, source: Source.CONTRIBUTOR, confidenceScore: 0.90, isVerified: true, submittedAt: "2024-05-10T10:00:00Z" },

  // ─── Amazon (7 records) ───
  { companyName: "Amazon", role: "Software Engineer", level: Level.SDE_I, location: "Bengaluru", currency: Currency.INR, experienceYears: 1, baseSalary: 1600000_00n, bonus: 200000_00n, stock: 500000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.94, isVerified: true, submittedAt: "2024-03-20T12:00:00Z" },
  { companyName: "Amazon", role: "Software Engineer", level: Level.SDE_II, location: "Bengaluru", currency: Currency.INR, experienceYears: 4, baseSalary: 2800000_00n, bonus: 400000_00n, stock: 1200000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.91, isVerified: true, submittedAt: "2024-04-05T15:30:00Z" },
  { companyName: "Amazon", role: "Software Engineer", level: Level.SDE_III, location: "Hyderabad", currency: Currency.INR, experienceYears: 8, baseSalary: 4200000_00n, bonus: 800000_00n, stock: 2500000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.89, isVerified: true, submittedAt: "2024-02-28T10:45:00Z" },
  { companyName: "Amazon", role: "Data Engineer", level: Level.SDE_II, location: "Bengaluru", currency: Currency.INR, experienceYears: 5, baseSalary: 2600000_00n, bonus: 350000_00n, stock: 1000000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.87, isVerified: true, submittedAt: "2024-05-12T09:00:00Z" },
  { companyName: "Amazon", role: "Product Manager", level: Level.SDE_II, location: "Bengaluru", currency: Currency.INR, experienceYears: 6, baseSalary: 3200000_00n, bonus: 500000_00n, stock: 1500000_00n, source: Source.SCRAPED, confidenceScore: 0.65, isVerified: false, submittedAt: "2024-04-22T14:00:00Z" },
  { companyName: "Amazon", role: "Software Engineer", level: Level.SDE_I, location: "Chennai", currency: Currency.INR, experienceYears: 2, baseSalary: 1500000_00n, bonus: 150000_00n, stock: 400000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.90, isVerified: true, submittedAt: "2024-06-01T11:30:00Z" },
  { companyName: "Amazon", role: "Software Engineer", level: Level.SDE_II, location: "Seattle", currency: Currency.USD, experienceYears: 5, baseSalary: 17500000n, bonus: 2000000n, stock: 6000000n, source: Source.CONTRIBUTOR, confidenceScore: 0.88, isVerified: true, submittedAt: "2024-04-15T12:00:00Z" },

  // ─── Meta (6 records) ───
  { companyName: "Meta", role: "Software Engineer", level: Level.L4, location: "Bengaluru", currency: Currency.INR, experienceYears: 3, baseSalary: 3500000_00n, bonus: 500000_00n, stock: 2000000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.93, isVerified: true, submittedAt: "2024-03-10T13:00:00Z" },
  { companyName: "Meta", role: "Software Engineer", level: Level.L5, location: "Bengaluru", currency: Currency.INR, experienceYears: 7, baseSalary: 5000000_00n, bonus: 1000000_00n, stock: 4000000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.91, isVerified: true, submittedAt: "2024-02-15T10:00:00Z" },
  { companyName: "Meta", role: "Frontend Engineer", level: Level.L4, location: "Hyderabad", currency: Currency.INR, experienceYears: 4, baseSalary: 3200000_00n, bonus: 450000_00n, stock: 1800000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.88, isVerified: true, submittedAt: "2024-04-18T16:00:00Z" },
  { companyName: "Meta", role: "Data Scientist", level: Level.L5, location: "Bengaluru", currency: Currency.INR, experienceYears: 9, baseSalary: 5500000_00n, bonus: 1100000_00n, stock: 3800000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.86, isVerified: true, submittedAt: "2024-01-25T08:45:00Z" },
  { companyName: "Meta", role: "Software Engineer", level: Level.L6, location: "Bengaluru", currency: Currency.INR, experienceYears: 12, baseSalary: 7500000_00n, bonus: 1800000_00n, stock: 6000000_00n, source: Source.SCRAPED, confidenceScore: 0.60, isVerified: false, submittedAt: "2024-05-30T12:30:00Z" },
  { companyName: "Meta", role: "Software Engineer", level: Level.L5, location: "San Francisco", currency: Currency.USD, experienceYears: 8, baseSalary: 22000000n, bonus: 4000000n, stock: 12000000n, source: Source.CONTRIBUTOR, confidenceScore: 0.86, isVerified: true, submittedAt: "2024-03-20T14:30:00Z" },

  // ─── Microsoft (6 records, includes Principal edge case) ───
  { companyName: "Microsoft", role: "Software Engineer", level: Level.L5, location: "Hyderabad", currency: Currency.INR, experienceYears: 6, baseSalary: 3600000_00n, bonus: 500000_00n, stock: 1400000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.92, isVerified: true, submittedAt: "2024-03-05T11:00:00Z" },
  { companyName: "Microsoft", role: "Software Engineer", level: Level.L6, location: "Bengaluru", currency: Currency.INR, experienceYears: 10, baseSalary: 5000000_00n, bonus: 800000_00n, stock: 2500000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.90, isVerified: true, submittedAt: "2024-04-12T14:30:00Z" },
  { companyName: "Microsoft", role: "Product Manager", level: Level.L5, location: "Hyderabad", currency: Currency.INR, experienceYears: 7, baseSalary: 4000000_00n, bonus: 600000_00n, stock: 1800000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.88, isVerified: true, submittedAt: "2024-02-08T09:15:00Z" },
  { companyName: "Microsoft", role: "Data Scientist", level: Level.L5, location: "Bengaluru", currency: Currency.INR, experienceYears: 5, baseSalary: 3400000_00n, bonus: 450000_00n, stock: 1200000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.87, isVerified: true, submittedAt: "2024-05-20T10:30:00Z" },
  { companyName: "Microsoft", role: "Software Engineer", level: Level.L4, location: "Noida", currency: Currency.INR, experienceYears: 3, baseSalary: 2400000_00n, bonus: 300000_00n, stock: 800000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.91, isVerified: true, submittedAt: "2024-06-02T13:00:00Z" },
  // Principal — very high equity edge case
  { companyName: "Microsoft", role: "Software Engineer", level: Level.PRINCIPAL, location: "Bengaluru", currency: Currency.INR, experienceYears: 18, baseSalary: 9000000_00n, bonus: 2000000_00n, stock: 7000000_00n, source: Source.SCRAPED, confidenceScore: 0.55, isVerified: false, submittedAt: "2024-01-30T15:00:00Z" },

  // ─── NVIDIA (5 records) ───
  { companyName: "NVIDIA", role: "Software Engineer", level: Level.L4, location: "Bengaluru", currency: Currency.INR, experienceYears: 4, baseSalary: 3200000_00n, bonus: 500000_00n, stock: 2000000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.90, isVerified: true, submittedAt: "2024-03-25T10:00:00Z" },
  { companyName: "NVIDIA", role: "Machine Learning Engineer", level: Level.L5, location: "Bengaluru", currency: Currency.INR, experienceYears: 7, baseSalary: 4800000_00n, bonus: 800000_00n, stock: 3500000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.88, isVerified: true, submittedAt: "2024-04-08T11:30:00Z" },
  { companyName: "NVIDIA", role: "Software Engineer", level: Level.L5, location: "Pune", currency: Currency.INR, experienceYears: 6, baseSalary: 4200000_00n, bonus: 700000_00n, stock: 2800000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.86, isVerified: true, submittedAt: "2024-02-12T14:00:00Z" },
  { companyName: "NVIDIA", role: "Data Engineer", level: Level.L4, location: "Bengaluru", currency: Currency.INR, experienceYears: 3, baseSalary: 2800000_00n, bonus: 400000_00n, stock: 1500000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.89, isVerified: true, submittedAt: "2024-05-15T09:00:00Z" },
  { companyName: "NVIDIA", role: "Software Engineer", level: Level.L6, location: "Bengaluru", currency: Currency.INR, experienceYears: 12, baseSalary: 6500000_00n, bonus: 1200000_00n, stock: 5000000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.82, isVerified: false, submittedAt: "2024-06-03T16:00:00Z" },

  // ─── Flipkart (6 records) ───
  { companyName: "Flipkart", role: "Software Engineer", level: Level.SDE_I, location: "Bengaluru", currency: Currency.INR, experienceYears: 1, baseSalary: 1800000_00n, bonus: 200000_00n, stock: 300000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.93, isVerified: true, submittedAt: "2024-03-08T12:00:00Z" },
  { companyName: "Flipkart", role: "Software Engineer", level: Level.SDE_II, location: "Bengaluru", currency: Currency.INR, experienceYears: 4, baseSalary: 2800000_00n, bonus: 400000_00n, stock: 800000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.91, isVerified: true, submittedAt: "2024-04-15T10:30:00Z" },
  { companyName: "Flipkart", role: "Software Engineer", level: Level.SDE_III, location: "Bengaluru", currency: Currency.INR, experienceYears: 7, baseSalary: 4000000_00n, bonus: 600000_00n, stock: 1500000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.89, isVerified: true, submittedAt: "2024-02-22T09:00:00Z" },
  { companyName: "Flipkart", role: "Backend Engineer", level: Level.SDE_II, location: "Bengaluru", currency: Currency.INR, experienceYears: 3, baseSalary: 2500000_00n, bonus: 350000_00n, stock: 700000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.87, isVerified: true, submittedAt: "2024-05-08T14:00:00Z" },
  { companyName: "Flipkart", role: "Product Manager", level: Level.SDE_II, location: "Bengaluru", currency: Currency.INR, experienceYears: 5, baseSalary: 3000000_00n, bonus: 500000_00n, stock: 1000000_00n, source: Source.SCRAPED, confidenceScore: 0.62, isVerified: false, submittedAt: "2024-04-28T11:30:00Z" },
  { companyName: "Flipkart", role: "Data Scientist", level: Level.SDE_III, location: "Bengaluru", currency: Currency.INR, experienceYears: 8, baseSalary: 4200000_00n, bonus: 700000_00n, stock: 1800000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.85, isVerified: true, submittedAt: "2024-06-01T08:00:00Z" },

  // ─── Meesho (5 records) ───
  { companyName: "Meesho", role: "Software Engineer", level: Level.SDE_I, location: "Bengaluru", currency: Currency.INR, experienceYears: 1, baseSalary: 1500000_00n, bonus: 150000_00n, stock: 200000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.90, isVerified: true, submittedAt: "2024-03-12T10:00:00Z" },
  { companyName: "Meesho", role: "Software Engineer", level: Level.SDE_II, location: "Bengaluru", currency: Currency.INR, experienceYears: 3, baseSalary: 2400000_00n, bonus: 300000_00n, stock: 600000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.88, isVerified: true, submittedAt: "2024-04-20T13:00:00Z" },
  { companyName: "Meesho", role: "Frontend Engineer", level: Level.SDE_II, location: "Bengaluru", currency: Currency.INR, experienceYears: 4, baseSalary: 2200000_00n, bonus: 250000_00n, stock: 500000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.86, isVerified: true, submittedAt: "2024-02-18T15:30:00Z" },
  { companyName: "Meesho", role: "Software Engineer", level: Level.SDE_III, location: "Bengaluru", currency: Currency.INR, experienceYears: 6, baseSalary: 3500000_00n, bonus: 500000_00n, stock: 1200000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.84, isVerified: true, submittedAt: "2024-05-25T09:30:00Z" },
  { companyName: "Meesho", role: "Product Manager", level: Level.SDE_II, location: "Bengaluru", currency: Currency.INR, experienceYears: 5, baseSalary: 2800000_00n, bonus: 400000_00n, stock: 800000_00n, source: Source.SCRAPED, confidenceScore: 0.58, isVerified: false, submittedAt: "2024-04-30T12:00:00Z" },

  // ─── Razorpay (5 records) ───
  { companyName: "Razorpay", role: "Software Engineer", level: Level.SDE_I, location: "Bengaluru", currency: Currency.INR, experienceYears: 2, baseSalary: 1600000_00n, bonus: 200000_00n, stock: 300000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.92, isVerified: true, submittedAt: "2024-03-18T11:00:00Z" },
  { companyName: "Razorpay", role: "Software Engineer", level: Level.SDE_II, location: "Bengaluru", currency: Currency.INR, experienceYears: 4, baseSalary: 2600000_00n, bonus: 350000_00n, stock: 700000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.89, isVerified: true, submittedAt: "2024-04-25T14:30:00Z" },
  { companyName: "Razorpay", role: "Backend Engineer", level: Level.SDE_III, location: "Bengaluru", currency: Currency.INR, experienceYears: 7, baseSalary: 3800000_00n, bonus: 500000_00n, stock: 1500000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.87, isVerified: true, submittedAt: "2024-02-10T09:00:00Z" },
  { companyName: "Razorpay", role: "Full Stack Engineer", level: Level.SDE_II, location: "Pune", currency: Currency.INR, experienceYears: 3, baseSalary: 2200000_00n, bonus: 300000_00n, stock: 500000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.85, isVerified: true, submittedAt: "2024-05-18T16:00:00Z" },
  { companyName: "Razorpay", role: "DevOps Engineer", level: Level.SDE_II, location: "Bengaluru", currency: Currency.INR, experienceYears: 5, baseSalary: 2400000_00n, bonus: 300000_00n, stock: 600000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.83, isVerified: true, submittedAt: "2024-06-04T10:30:00Z" },

  // ─── Zepto (5 records) ───
  { companyName: "Zepto", role: "Software Engineer", level: Level.SDE_I, location: "Mumbai", currency: Currency.INR, experienceYears: 1, baseSalary: 1400000_00n, bonus: 100000_00n, stock: 200000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.91, isVerified: true, submittedAt: "2024-03-22T12:30:00Z" },
  { companyName: "Zepto", role: "Software Engineer", level: Level.SDE_II, location: "Mumbai", currency: Currency.INR, experienceYears: 3, baseSalary: 2200000_00n, bonus: 300000_00n, stock: 500000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.88, isVerified: true, submittedAt: "2024-04-10T10:00:00Z" },
  { companyName: "Zepto", role: "Backend Engineer", level: Level.SDE_II, location: "Mumbai", currency: Currency.INR, experienceYears: 4, baseSalary: 2400000_00n, bonus: 350000_00n, stock: 600000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.86, isVerified: true, submittedAt: "2024-02-05T14:45:00Z" },
  { companyName: "Zepto", role: "Frontend Engineer", level: Level.SDE_I, location: "Mumbai", currency: Currency.INR, experienceYears: 2, baseSalary: 1300000_00n, bonus: 100000_00n, stock: 150000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.84, isVerified: true, submittedAt: "2024-05-28T09:00:00Z" },
  { companyName: "Zepto", role: "Software Engineer", level: Level.SDE_III, location: "Bengaluru", currency: Currency.INR, experienceYears: 6, baseSalary: 3200000_00n, bonus: 400000_00n, stock: 1000000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.82, isVerified: false, submittedAt: "2024-06-02T11:00:00Z" },

  // ─── TCS (5 records, zero stock edge case) ───
  { companyName: "TCS", role: "Software Engineer", level: Level.L3, location: "Mumbai", currency: Currency.INR, experienceYears: 2, baseSalary: 450000_00n, bonus: 30000_00n, stock: 0n, source: Source.CONTRIBUTOR, confidenceScore: 0.94, isVerified: true, submittedAt: "2024-03-28T10:00:00Z" },
  { companyName: "TCS", role: "Software Engineer", level: Level.L4, location: "Chennai", currency: Currency.INR, experienceYears: 5, baseSalary: 800000_00n, bonus: 60000_00n, stock: 0n, source: Source.CONTRIBUTOR, confidenceScore: 0.91, isVerified: true, submittedAt: "2024-04-02T15:00:00Z" },
  { companyName: "TCS", role: "Data Analyst", level: Level.L3, location: "Pune", currency: Currency.INR, experienceYears: 3, baseSalary: 500000_00n, bonus: 40000_00n, stock: 0n, source: Source.CONTRIBUTOR, confidenceScore: 0.89, isVerified: true, submittedAt: "2024-02-15T09:30:00Z" },
  { companyName: "TCS", role: "QA Engineer", level: Level.L3, location: "Hyderabad", currency: Currency.INR, experienceYears: 2, baseSalary: 420000_00n, bonus: 25000_00n, stock: 0n, source: Source.CONTRIBUTOR, confidenceScore: 0.87, isVerified: true, submittedAt: "2024-05-10T14:00:00Z" },
  { companyName: "TCS", role: "Software Engineer", level: Level.L5, location: "Mumbai", currency: Currency.INR, experienceYears: 10, baseSalary: 1500000_00n, bonus: 150000_00n, stock: 0n, source: Source.CONTRIBUTOR, confidenceScore: 0.85, isVerified: true, submittedAt: "2024-06-01T12:00:00Z" },

  // ─── Infosys (5 records) ───
  { companyName: "Infosys", role: "Software Engineer", level: Level.L3, location: "Bengaluru", currency: Currency.INR, experienceYears: 1, baseSalary: 400000_00n, bonus: 20000_00n, stock: 0n, source: Source.CONTRIBUTOR, confidenceScore: 0.93, isVerified: true, submittedAt: "2024-03-05T10:00:00Z" },
  { companyName: "Infosys", role: "Software Engineer", level: Level.L4, location: "Pune", currency: Currency.INR, experienceYears: 4, baseSalary: 750000_00n, bonus: 50000_00n, stock: 0n, source: Source.CONTRIBUTOR, confidenceScore: 0.90, isVerified: true, submittedAt: "2024-04-18T13:30:00Z" },
  { companyName: "Infosys", role: "Data Engineer", level: Level.L4, location: "Hyderabad", currency: Currency.INR, experienceYears: 5, baseSalary: 850000_00n, bonus: 60000_00n, stock: 0n, source: Source.CONTRIBUTOR, confidenceScore: 0.88, isVerified: true, submittedAt: "2024-02-25T09:00:00Z" },
  { companyName: "Infosys", role: "Product Manager", level: Level.L5, location: "Bengaluru", currency: Currency.INR, experienceYears: 8, baseSalary: 1800000_00n, bonus: 200000_00n, stock: 100000_00n, source: Source.SCRAPED, confidenceScore: 0.55, isVerified: false, submittedAt: "2024-05-05T16:00:00Z" },
  { companyName: "Infosys", role: "Software Engineer", level: Level.L5, location: "Bengaluru", currency: Currency.INR, experienceYears: 9, baseSalary: 1600000_00n, bonus: 150000_00n, stock: 50000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.86, isVerified: true, submittedAt: "2024-06-03T10:30:00Z" },

  // ─── Wipro (5 records) ───
  { companyName: "Wipro", role: "Software Engineer", level: Level.L3, location: "Bengaluru", currency: Currency.INR, experienceYears: 1, baseSalary: 380000_00n, bonus: 15000_00n, stock: 0n, source: Source.CONTRIBUTOR, confidenceScore: 0.92, isVerified: true, submittedAt: "2024-03-15T11:30:00Z" },
  { companyName: "Wipro", role: "Software Engineer", level: Level.L4, location: "Hyderabad", currency: Currency.INR, experienceYears: 4, baseSalary: 700000_00n, bonus: 40000_00n, stock: 0n, source: Source.CONTRIBUTOR, confidenceScore: 0.89, isVerified: true, submittedAt: "2024-04-22T14:00:00Z" },
  { companyName: "Wipro", role: "QA Engineer", level: Level.L3, location: "Chennai", currency: Currency.INR, experienceYears: 2, baseSalary: 400000_00n, bonus: 20000_00n, stock: 0n, source: Source.CONTRIBUTOR, confidenceScore: 0.87, isVerified: true, submittedAt: "2024-02-08T10:00:00Z" },
  { companyName: "Wipro", role: "Data Analyst", level: Level.L4, location: "Pune", currency: Currency.INR, experienceYears: 5, baseSalary: 800000_00n, bonus: 50000_00n, stock: 0n, source: Source.CONTRIBUTOR, confidenceScore: 0.85, isVerified: true, submittedAt: "2024-05-20T15:30:00Z" },
  { companyName: "Wipro", role: "Software Engineer", level: Level.L5, location: "Bengaluru", currency: Currency.INR, experienceYears: 8, baseSalary: 1200000_00n, bonus: 100000_00n, stock: 0n, source: Source.CONTRIBUTOR, confidenceScore: 0.83, isVerified: true, submittedAt: "2024-06-04T09:00:00Z" },

  // ─── Swiggy (5 records) ───
  { companyName: "Swiggy", role: "Software Engineer", level: Level.SDE_I, location: "Bengaluru", currency: Currency.INR, experienceYears: 1, baseSalary: 1600000_00n, bonus: 150000_00n, stock: 250000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.91, isVerified: true, submittedAt: "2024-03-14T10:00:00Z" },
  { companyName: "Swiggy", role: "Software Engineer", level: Level.SDE_II, location: "Bengaluru", currency: Currency.INR, experienceYears: 4, baseSalary: 2600000_00n, bonus: 350000_00n, stock: 700000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.89, isVerified: true, submittedAt: "2024-04-22T13:30:00Z" },
  { companyName: "Swiggy", role: "Backend Engineer", level: Level.SDE_III, location: "Bengaluru", currency: Currency.INR, experienceYears: 7, baseSalary: 3800000_00n, bonus: 500000_00n, stock: 1400000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.87, isVerified: true, submittedAt: "2024-02-18T09:00:00Z" },
  { companyName: "Swiggy", role: "Data Scientist", level: Level.SDE_II, location: "Bengaluru", currency: Currency.INR, experienceYears: 3, baseSalary: 2400000_00n, bonus: 300000_00n, stock: 500000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.85, isVerified: true, submittedAt: "2024-05-10T14:00:00Z" },
  // Zero bonus edge case
  { companyName: "Swiggy", role: "Product Manager", level: Level.SDE_III, location: "Bengaluru", currency: Currency.INR, experienceYears: 6, baseSalary: 3200000_00n, bonus: 0n, stock: 1200000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.83, isVerified: true, submittedAt: "2024-06-05T10:00:00Z" },

  // ─── PhonePe (5 records) ───
  { companyName: "PhonePe", role: "Software Engineer", level: Level.SDE_I, location: "Bengaluru", currency: Currency.INR, experienceYears: 2, baseSalary: 1700000_00n, bonus: 200000_00n, stock: 400000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.92, isVerified: true, submittedAt: "2024-03-20T11:00:00Z" },
  { companyName: "PhonePe", role: "Software Engineer", level: Level.SDE_II, location: "Bengaluru", currency: Currency.INR, experienceYears: 4, baseSalary: 2800000_00n, bonus: 400000_00n, stock: 900000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.90, isVerified: true, submittedAt: "2024-04-15T14:00:00Z" },
  { companyName: "PhonePe", role: "Backend Engineer", level: Level.SDE_III, location: "Bengaluru", currency: Currency.INR, experienceYears: 7, baseSalary: 4000000_00n, bonus: 600000_00n, stock: 1600000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.88, isVerified: true, submittedAt: "2024-02-28T09:30:00Z" },
  { companyName: "PhonePe", role: "Data Engineer", level: Level.SDE_II, location: "Pune", currency: Currency.INR, experienceYears: 3, baseSalary: 2200000_00n, bonus: 250000_00n, stock: 500000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.86, isVerified: true, submittedAt: "2024-05-22T16:00:00Z" },
  { companyName: "PhonePe", role: "DevOps Engineer", level: Level.SDE_II, location: "Bengaluru", currency: Currency.INR, experienceYears: 5, baseSalary: 2500000_00n, bonus: 300000_00n, stock: 600000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.84, isVerified: true, submittedAt: "2024-06-01T10:00:00Z" },

  // ─── CRED (5 records) ───
  { companyName: "CRED", role: "Software Engineer", level: Level.SDE_I, location: "Bengaluru", currency: Currency.INR, experienceYears: 2, baseSalary: 1800000_00n, bonus: 250000_00n, stock: 500000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.93, isVerified: true, submittedAt: "2024-03-10T10:00:00Z" },
  { companyName: "CRED", role: "Software Engineer", level: Level.SDE_II, location: "Bengaluru", currency: Currency.INR, experienceYears: 4, baseSalary: 3000000_00n, bonus: 500000_00n, stock: 1200000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.91, isVerified: true, submittedAt: "2024-04-18T13:00:00Z" },
  { companyName: "CRED", role: "Frontend Engineer", level: Level.SDE_II, location: "Bengaluru", currency: Currency.INR, experienceYears: 3, baseSalary: 2800000_00n, bonus: 400000_00n, stock: 1000000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.89, isVerified: true, submittedAt: "2024-02-05T14:00:00Z" },
  { companyName: "CRED", role: "Product Designer", level: Level.SDE_II, location: "Bengaluru", currency: Currency.INR, experienceYears: 5, baseSalary: 2600000_00n, bonus: 350000_00n, stock: 800000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.87, isVerified: true, submittedAt: "2024-05-15T09:00:00Z" },
  { companyName: "CRED", role: "Software Engineer", level: Level.SDE_III, location: "Bengaluru", currency: Currency.INR, experienceYears: 7, baseSalary: 4200000_00n, bonus: 700000_00n, stock: 2000000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.85, isVerified: true, submittedAt: "2024-06-02T11:00:00Z" },

  // ─── Atlassian (5 records) ───
  { companyName: "Atlassian", role: "Software Engineer", level: Level.IC4, location: "Bengaluru", currency: Currency.INR, experienceYears: 3, baseSalary: 3000000_00n, bonus: 400000_00n, stock: 1500000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.92, isVerified: true, submittedAt: "2024-03-18T10:00:00Z" },
  { companyName: "Atlassian", role: "Software Engineer", level: Level.IC5, location: "Bengaluru", currency: Currency.INR, experienceYears: 7, baseSalary: 4800000_00n, bonus: 700000_00n, stock: 3000000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.90, isVerified: true, submittedAt: "2024-04-25T14:30:00Z" },
  { companyName: "Atlassian", role: "Product Manager", level: Level.IC4, location: "Bengaluru", currency: Currency.INR, experienceYears: 5, baseSalary: 3200000_00n, bonus: 500000_00n, stock: 1800000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.88, isVerified: true, submittedAt: "2024-02-12T09:00:00Z" },
  { companyName: "Atlassian", role: "Frontend Engineer", level: Level.IC4, location: "Bengaluru", currency: Currency.INR, experienceYears: 4, baseSalary: 2800000_00n, bonus: 350000_00n, stock: 1200000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.86, isVerified: true, submittedAt: "2024-05-20T16:00:00Z" },
  { companyName: "Atlassian", role: "Software Engineer", level: Level.IC5, location: "Sydney", currency: Currency.USD, experienceYears: 8, baseSalary: 16000000n, bonus: 2500000n, stock: 8000000n, source: Source.CONTRIBUTOR, confidenceScore: 0.84, isVerified: true, submittedAt: "2024-06-03T10:00:00Z" },

  // ─── Uber India (5 records) ───
  { companyName: "Uber India", role: "Software Engineer", level: Level.L4, location: "Bengaluru", currency: Currency.INR, experienceYears: 3, baseSalary: 3200000_00n, bonus: 400000_00n, stock: 1500000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.91, isVerified: true, submittedAt: "2024-03-22T11:00:00Z" },
  { companyName: "Uber India", role: "Software Engineer", level: Level.L5, location: "Bengaluru", currency: Currency.INR, experienceYears: 6, baseSalary: 4500000_00n, bonus: 700000_00n, stock: 3000000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.89, isVerified: true, submittedAt: "2024-04-10T14:00:00Z" },
  { companyName: "Uber India", role: "Machine Learning Engineer", level: Level.L5, location: "Hyderabad", currency: Currency.INR, experienceYears: 7, baseSalary: 4800000_00n, bonus: 800000_00n, stock: 3200000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.87, isVerified: true, submittedAt: "2024-02-15T09:30:00Z" },
  { companyName: "Uber India", role: "Backend Engineer", level: Level.L4, location: "Bengaluru", currency: Currency.INR, experienceYears: 4, baseSalary: 3000000_00n, bonus: 350000_00n, stock: 1200000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.85, isVerified: true, submittedAt: "2024-05-28T16:00:00Z" },
  { companyName: "Uber India", role: "Data Engineer", level: Level.L4, location: "Bengaluru", currency: Currency.INR, experienceYears: 3, baseSalary: 2800000_00n, bonus: 300000_00n, stock: 1000000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.83, isVerified: true, submittedAt: "2024-06-04T10:00:00Z" },

  // ─── Paytm (5 records) ───
  { companyName: "Paytm", role: "Software Engineer", level: Level.SDE_I, location: "Noida", currency: Currency.INR, experienceYears: 1, baseSalary: 1000000_00n, bonus: 80000_00n, stock: 100000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.90, isVerified: true, submittedAt: "2024-03-25T10:00:00Z" },
  { companyName: "Paytm", role: "Software Engineer", level: Level.SDE_II, location: "Noida", currency: Currency.INR, experienceYears: 4, baseSalary: 1800000_00n, bonus: 200000_00n, stock: 300000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.88, isVerified: true, submittedAt: "2024-04-08T13:30:00Z" },
  { companyName: "Paytm", role: "Backend Engineer", level: Level.SDE_II, location: "Bengaluru", currency: Currency.INR, experienceYears: 3, baseSalary: 1600000_00n, bonus: 150000_00n, stock: 200000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.86, isVerified: true, submittedAt: "2024-02-20T14:00:00Z" },
  { companyName: "Paytm", role: "Data Analyst", level: Level.SDE_I, location: "Noida", currency: Currency.INR, experienceYears: 2, baseSalary: 900000_00n, bonus: 60000_00n, stock: 50000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.84, isVerified: true, submittedAt: "2024-05-12T09:00:00Z" },
  { companyName: "Paytm", role: "Software Engineer", level: Level.SDE_III, location: "Noida", currency: Currency.INR, experienceYears: 7, baseSalary: 2800000_00n, bonus: 400000_00n, stock: 800000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.82, isVerified: true, submittedAt: "2024-06-01T11:00:00Z" },

  // ─── Dream11 (5 records) ───
  { companyName: "Dream11", role: "Software Engineer", level: Level.SDE_I, location: "Mumbai", currency: Currency.INR, experienceYears: 2, baseSalary: 1800000_00n, bonus: 300000_00n, stock: 400000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.92, isVerified: true, submittedAt: "2024-03-08T11:00:00Z" },
  { companyName: "Dream11", role: "Software Engineer", level: Level.SDE_II, location: "Mumbai", currency: Currency.INR, experienceYears: 4, baseSalary: 2800000_00n, bonus: 500000_00n, stock: 1000000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.90, isVerified: true, submittedAt: "2024-04-15T14:30:00Z" },
  { companyName: "Dream11", role: "Backend Engineer", level: Level.SDE_III, location: "Mumbai", currency: Currency.INR, experienceYears: 7, baseSalary: 4000000_00n, bonus: 700000_00n, stock: 1800000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.88, isVerified: true, submittedAt: "2024-02-22T09:00:00Z" },
  { companyName: "Dream11", role: "Data Scientist", level: Level.SDE_II, location: "Mumbai", currency: Currency.INR, experienceYears: 5, baseSalary: 2600000_00n, bonus: 400000_00n, stock: 800000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.86, isVerified: true, submittedAt: "2024-05-18T16:00:00Z" },
  { companyName: "Dream11", role: "Product Manager", level: Level.SDE_II, location: "Mumbai", currency: Currency.INR, experienceYears: 5, baseSalary: 3000000_00n, bonus: 500000_00n, stock: 1200000_00n, source: Source.SCRAPED, confidenceScore: 0.60, isVerified: false, submittedAt: "2024-06-05T10:00:00Z" },

  // ─── Groww (5 records) ───
  { companyName: "Groww", role: "Software Engineer", level: Level.SDE_I, location: "Bengaluru", currency: Currency.INR, experienceYears: 1, baseSalary: 1400000_00n, bonus: 100000_00n, stock: 200000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.91, isVerified: true, submittedAt: "2024-03-12T10:30:00Z" },
  { companyName: "Groww", role: "Software Engineer", level: Level.SDE_II, location: "Bengaluru", currency: Currency.INR, experienceYears: 3, baseSalary: 2200000_00n, bonus: 300000_00n, stock: 600000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.89, isVerified: true, submittedAt: "2024-04-20T13:00:00Z" },
  { companyName: "Groww", role: "Frontend Engineer", level: Level.SDE_II, location: "Bengaluru", currency: Currency.INR, experienceYears: 4, baseSalary: 2000000_00n, bonus: 250000_00n, stock: 500000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.87, isVerified: true, submittedAt: "2024-02-08T15:00:00Z" },
  { companyName: "Groww", role: "Data Engineer", level: Level.SDE_II, location: "Bengaluru", currency: Currency.INR, experienceYears: 3, baseSalary: 2000000_00n, bonus: 200000_00n, stock: 400000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.85, isVerified: true, submittedAt: "2024-05-25T09:00:00Z" },
  { companyName: "Groww", role: "Software Engineer", level: Level.SDE_III, location: "Bengaluru", currency: Currency.INR, experienceYears: 6, baseSalary: 3200000_00n, bonus: 400000_00n, stock: 1000000_00n, source: Source.CONTRIBUTOR, confidenceScore: 0.83, isVerified: true, submittedAt: "2024-06-03T11:00:00Z" },
];

/* ─── Main Seed Function ─────────────────────── */

async function main() {
  console.log("🌱 Seeding TalentDash database...\n");

  // 1. Upsert all companies
  const companyMap = new Map<string, string>(); // normalizedName → companyId

  for (const def of COMPANIES) {
    const normalizedName = normalizeCompanyName(def.name);
    const slug = generateSlug(def.name);

    const company = await prisma.company.upsert({
      where: { slug },
      update: {
        name: def.displayName,
        normalizedName,
        industry: def.industry,
        headquarters: def.headquarters,
        foundedYear: def.foundedYear,
        headcountRange: def.headcountRange,
      },
      create: {
        name: def.displayName,
        slug,
        normalizedName,
        industry: def.industry,
        headquarters: def.headquarters,
        foundedYear: def.foundedYear,
        headcountRange: def.headcountRange,
      },
    });

    companyMap.set(normalizedName, company.id);
    console.log(`  ✓ Company: ${def.displayName} (slug: ${slug})`);
  }

  // 2. Clear existing salaries for clean re-seed
  await prisma.salary.deleteMany();

  // 3. Insert all salary records
  let salaryCount = 0;

  for (const def of SALARIES) {
    const normalizedName = normalizeCompanyName(def.companyName);
    let companyId = companyMap.get(normalizedName);

    // If company not found by normalised name, try slug-based lookup
    if (!companyId) {
      const slug = generateSlug(def.companyName);
      const company = await prisma.company.findUnique({ where: { slug } });
      if (company) {
        companyId = company.id;
        companyMap.set(normalizedName, company.id);
      }
    }

    if (!companyId) {
      console.warn(`  ⚠ Company not found for: "${def.companyName}" (normalized: "${normalizedName}"). Skipping.`);
      continue;
    }

    const totalCompensation = def.baseSalary + def.bonus + def.stock;

    await prisma.salary.create({
      data: {
        companyId,
        role: def.role,
        level: def.level,
        location: def.location,
        currency: def.currency,
        experienceYears: def.experienceYears,
        baseSalary: def.baseSalary,
        bonus: def.bonus,
        stock: def.stock,
        totalCompensation,
        source: def.source,
        confidenceScore: def.confidenceScore,
        isVerified: def.isVerified,
        submittedAt: new Date(def.submittedAt),
      },
    });

    salaryCount++;
  }

  console.log(`\n✅ Seeded ${COMPANIES.length} companies and ${salaryCount} salary records.`);

  // 4. Verify normalisation: "Google India", "GOOGLE", "google" → same company
  const googleRecords = await prisma.salary.count({
    where: { company: { slug: "google" } },
  });
  console.log(`\n🔍 Normalisation check: ${googleRecords} salary records resolved to company slug "google"`);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
