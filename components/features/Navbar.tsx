/* ──────────────────────────────────────────────
   Navbar — Site navigation with active states
   ────────────────────────────────────────────── */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/salaries", label: "Salaries" },
  { href: "/companies", label: "Companies" },
  { href: "/compare", label: "Compare" },
  { href: "/tools", label: "Tools" },
] as const;

export function Navbar() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[#EBEBEB] bg-white/95 backdrop-blur-sm">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FF5A5F]">
            <span className="text-sm font-bold text-white">TD</span>
          </div>
          <span className="text-lg font-bold text-[#222222]">
            TalentDash
          </span>
        </Link>

        {/* Navigation links */}
        <div className="flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-[#FF5A5F] text-white"
                    : "text-[#484848] hover:bg-[#F2F2F2] hover:text-[#222222]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
