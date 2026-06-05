/* ──────────────────────────────────────────────
   Footer — Minimal site footer
   ────────────────────────────────────────────── */

export function Footer() {
  return (
    <footer className="border-t border-[#EBEBEB] bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-[#FF5A5F]">
              <span className="text-[10px] font-bold text-white">TD</span>
            </div>
            <span className="text-sm font-semibold text-[#222222]">
              TalentDash
            </span>
          </div>

          {/* Tagline */}
          <p className="text-xs text-[#717171]">
            India&apos;s compensation intelligence platform.
            Transparent salaries for informed career decisions.
          </p>

          {/* Copyright */}
          <p className="text-xs text-[#717171]">
            © {new Date().getFullYear()} TalentDash
          </p>
        </div>
      </div>
    </footer>
  );
}
