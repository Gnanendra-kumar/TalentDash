/* ──────────────────────────────────────────────
   LevelDistribution — Horizontal stacked bar
   Shows percentage breakdown by level
   ────────────────────────────────────────────── */

import type { LevelCount } from "@/types";
import { LEVEL_BAR_COLORS } from "@/lib/constants";

interface LevelDistributionProps {
  distribution: LevelCount[];
}

export function LevelDistribution({ distribution }: LevelDistributionProps) {
  if (distribution.length === 0) return null;

  return (
    <div className="rounded-xl border border-[#EBEBEB] bg-white p-5 shadow-sm">
      <h3 className="text-sm font-semibold text-[#222222]">
        Level Distribution
      </h3>

      {/* Stacked bar */}
      <div className="mt-4 flex h-8 overflow-hidden rounded-lg">
        {distribution.map((item) => (
          <div
            key={item.level}
            className="flex items-center justify-center text-xs font-semibold text-white transition-all"
            style={{
              width: `${Math.max(item.percentage, 5)}%`,
              backgroundColor: LEVEL_BAR_COLORS[item.level],
            }}
            title={`${item.level}: ${item.percentage}% (${item.count} records)`}
          >
            {item.percentage >= 10 && item.level}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
        {distribution.map((item) => (
          <div key={item.level} className="flex items-center gap-1.5">
            <span
              className="inline-block h-3 w-3 rounded"
              style={{ backgroundColor: LEVEL_BAR_COLORS[item.level] }}
            />
            <span className="text-xs text-[#484848]">
              {item.level}
            </span>
            <span className="text-xs text-[#717171]">
              {item.percentage}% ({item.count})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
