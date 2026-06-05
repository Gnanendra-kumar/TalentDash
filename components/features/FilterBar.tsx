/* ──────────────────────────────────────────────
   FilterBar — Client component for salary filters
   
   Features:
   - Company text search (debounced 300ms)
   - Role dropdown
   - Level multi-select checkboxes
   - Location dropdown
   - Currency toggle (INR / USD)
   - URL state synchronization
   ────────────────────────────────────────────── */

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { LevelStandard, Currency } from "@/types";
import { DEBOUNCE_MS, LEVEL_OPTIONS, LEVEL_BADGE_STYLES } from "@/lib/constants";

interface FilterBarProps {
  roles: string[];
  locations: string[];
}

export function FilterBar({ roles, locations }: FilterBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  /* ── Read initial state from URL ──────────── */
  const [company, setCompany] = useState(searchParams.get("company") ?? "");
  const [role, setRole] = useState(searchParams.get("role") ?? "");
  const [selectedLevels, setSelectedLevels] = useState<LevelStandard[]>(() => {
    const param = searchParams.get("level");
    return param ? (param.split(",") as LevelStandard[]) : [];
  });
  const [location, setLocation] = useState(searchParams.get("location") ?? "");
  const [currency, setCurrency] = useState<Currency>(
    (searchParams.get("currency") as Currency) ?? "INR"
  );
  const [levelDropdownOpen, setLevelDropdownOpen] = useState(false);
  const levelRef = useRef<HTMLDivElement>(null);

  /* ── Close level dropdown on outside click ── */
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (levelRef.current && !levelRef.current.contains(e.target as Node)) {
        setLevelDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  /* ── Sync filters → URL ───────────────────── */
  const updateURL = useCallback(
    (overrides: Record<string, string>) => {
      const params = new URLSearchParams();
      const values: Record<string, string> = {
        company,
        role,
        level: selectedLevels.join(","),
        location,
        currency,
        ...overrides,
      };

      Object.entries(values).forEach(([key, value]) => {
        if (value && value !== "INR" && key !== "currency") {
          params.set(key, value);
        }
        if (key === "currency" && value !== "INR") {
          params.set(key, value);
        }
      });

      // Always reset page when filters change
      params.delete("page");

      const query = params.toString();
      router.push(query ? `/salaries?${query}` : "/salaries", {
        scroll: false,
      });
    },
    [company, role, selectedLevels, location, currency, router]
  );

  /* ── Debounced company search ─────────────── */
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  function handleCompanyChange(value: string) {
    setCompany(value);

    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      updateURL({ company: value });
    }, DEBOUNCE_MS);
  }

  /* ── Immediate filter handlers ────────────── */
  function handleRoleChange(value: string) {
    setRole(value);
    updateURL({ role: value });
  }

  function handleLocationChange(value: string) {
    setLocation(value);
    updateURL({ location: value });
  }

  function handleCurrencyToggle() {
    const next = currency === "INR" ? "USD" : "INR";
    setCurrency(next);
    updateURL({ currency: next });
  }

  function handleLevelToggle(level: LevelStandard) {
    const updated = selectedLevels.includes(level)
      ? selectedLevels.filter((l) => l !== level)
      : [...selectedLevels, level];
    setSelectedLevels(updated);
    updateURL({ level: updated.join(",") });
  }

  return (
    <div className="rounded-xl border border-[#EBEBEB] bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-end gap-3">
        {/* Company search */}
        <div className="min-w-[200px] flex-1">
          <label className="mb-1 block text-xs font-medium text-[#717171]">
            Company
          </label>
          <div className="relative">
            <svg
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#717171]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            <input
              id="filter-company"
              type="text"
              placeholder="Search companies..."
              value={company}
              onChange={(e) => handleCompanyChange(e.target.value)}
              className="w-full rounded-lg border border-[#EBEBEB] bg-white py-2 pl-9 pr-3 text-sm text-[#222222] placeholder-[#717171] transition-colors focus:border-[#FF5A5F] focus:outline-none focus:ring-1 focus:ring-[#FF5A5F]/30"
            />
          </div>
        </div>

        {/* Role dropdown */}
        <div className="min-w-[160px]">
          <label className="mb-1 block text-xs font-medium text-[#717171]">
            Role
          </label>
          <select
            id="filter-role"
            value={role}
            onChange={(e) => handleRoleChange(e.target.value)}
            className="w-full cursor-pointer rounded-lg border border-[#EBEBEB] bg-white py-2 pl-3 pr-8 text-sm text-[#222222] transition-colors focus:border-[#FF5A5F] focus:outline-none focus:ring-1 focus:ring-[#FF5A5F]/30"
          >
            <option value="">All Roles</option>
            {roles.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        {/* Level multi-select */}
        <div className="relative min-w-[140px]" ref={levelRef}>
          <label className="mb-1 block text-xs font-medium text-[#717171]">
            Level
          </label>
          <button
            id="filter-level"
            type="button"
            onClick={() => setLevelDropdownOpen((prev) => !prev)}
            className="flex w-full items-center justify-between rounded-lg border border-[#EBEBEB] bg-white py-2 pl-3 pr-3 text-sm text-[#222222] transition-colors focus:border-[#FF5A5F] focus:outline-none focus:ring-1 focus:ring-[#FF5A5F]/30"
          >
            <span className={selectedLevels.length === 0 ? "text-[#717171]" : ""}>
              {selectedLevels.length === 0
                ? "All Levels"
                : `${selectedLevels.length} selected`}
            </span>
            <svg
              className={`h-4 w-4 text-[#717171] transition-transform ${levelDropdownOpen ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {levelDropdownOpen && (
            <div className="absolute top-full left-0 z-20 mt-1 w-48 rounded-lg border border-[#EBEBEB] bg-white p-2 shadow-lg">
              {LEVEL_OPTIONS.map((level) => {
                const style = LEVEL_BADGE_STYLES[level];
                return (
                  <label
                    key={level}
                    className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm text-[#484848] hover:bg-[#F2F2F2]"
                  >
                    <input
                      type="checkbox"
                      checked={selectedLevels.includes(level)}
                      onChange={() => handleLevelToggle(level)}
                      className="h-3.5 w-3.5 rounded border-[#EBEBEB] accent-[#FF5A5F]"
                    />
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${style.bg} ${style.text}`}
                    >
                      {level}
                    </span>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* Location dropdown */}
        <div className="min-w-[140px]">
          <label className="mb-1 block text-xs font-medium text-[#717171]">
            Location
          </label>
          <select
            id="filter-location"
            value={location}
            onChange={(e) => handleLocationChange(e.target.value)}
            className="w-full cursor-pointer rounded-lg border border-[#EBEBEB] bg-white py-2 pl-3 pr-8 text-sm text-[#222222] transition-colors focus:border-[#FF5A5F] focus:outline-none focus:ring-1 focus:ring-[#FF5A5F]/30"
          >
            <option value="">All Locations</option>
            {locations.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>

        {/* Currency toggle */}
        <div>
          <label className="mb-1 block text-xs font-medium text-[#717171]">
            Currency
          </label>
          <button
            id="filter-currency"
            onClick={handleCurrencyToggle}
            className="flex items-center gap-1 rounded-lg border border-[#EBEBEB] bg-white px-3 py-2 text-sm font-medium transition-colors hover:bg-[#F2F2F2]"
          >
            <span
              className={`rounded px-1.5 py-0.5 text-xs font-semibold transition-colors ${
                currency === "INR"
                  ? "bg-[#FF5A5F] text-white"
                  : "text-[#717171]"
              }`}
            >
              ₹ INR
            </span>
            <span
              className={`rounded px-1.5 py-0.5 text-xs font-semibold transition-colors ${
                currency === "USD"
                  ? "bg-[#FF5A5F] text-white"
                  : "text-[#717171]"
              }`}
            >
              $ USD
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
