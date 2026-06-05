/* ──────────────────────────────────────────────
   TalentDash — Safe Database Query Wrapper
   
   Wraps Prisma queries with a try-catch so the
   Next.js build succeeds even when no database
   is available (e.g. first deploy to Vercel).
   
   Pages get real data on first ISR revalidation
   once DATABASE_URL is configured.
   ────────────────────────────────────────────── */

export async function safeQuery<T>(
  queryFn: () => Promise<T>,
  fallback: T
): Promise<T> {
  try {
    return await queryFn();
  } catch (error) {
    console.warn("[TalentDash] Database query failed (build-time or missing DB):", 
      error instanceof Error ? error.message : "Unknown error"
    );
    return fallback;
  }
}
