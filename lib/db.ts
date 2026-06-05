/* ──────────────────────────────────────────────
   TalentDash — PrismaClient Singleton (Neon)
   
   Uses @prisma/adapter-neon with Neon's serverless
   PostgreSQL driver for Vercel deployments.
   
   PrismaNeon takes a PoolConfig (not a Pool instance).
   ────────────────────────────────────────────── */

import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const DATABASE_URL = process.env.DATABASE_URL!;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
  const adapter = new PrismaNeon({ connectionString: DATABASE_URL });

  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
