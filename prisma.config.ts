// ──────────────────────────────────────────────
// TalentDash — Prisma 7 Configuration
// Provides the datasource URL and schema path
// for CLI commands (migrate, seed, etc.)
// ──────────────────────────────────────────────

import path from "node:path";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: path.join(__dirname, "prisma", "schema.prisma"),
  datasource: {
    url: process.env.DATABASE_URL ?? "postgresql://postgres:postgres@localhost:5432/talentdash",
  },
  migrations: {
    seed: "npx tsx prisma/seed.ts",
  },
});
