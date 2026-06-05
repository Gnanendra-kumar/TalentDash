/* ──────────────────────────────────────────────
   Badge — Level badge with color variants
   ────────────────────────────────────────────── */

import type { LevelStandard } from "@/types";
import { LEVEL_BADGE_STYLES } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface BadgeProps {
  level: LevelStandard;
  className?: string;
}

export function Badge({ level, className }: BadgeProps) {
  const style = LEVEL_BADGE_STYLES[level];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide",
        style.bg,
        style.text,
        className
      )}
    >
      {level}
    </span>
  );
}
