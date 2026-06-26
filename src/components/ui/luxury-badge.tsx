"use client";

/**
 * LuxuryBadge — small badge for product tags, status, alerts.
 *
 * Variants:
 *   - new         — ink bg, white text
 *   - bestseller  — gold bg, ink text
 *   - limited     — cream bg, gold border, ink text
 *   - sale        — destructive red bg, white text
 *   - subtle      — cream bg, muted text (default)
 *
 * Usage:
 *   <LuxuryBadge variant="new">New</LuxuryBadge>
 *   <LuxuryBadge variant="bestseller">Bestseller</LuxuryBadge>
 */

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export interface LuxuryBadgeProps {
  children: ReactNode;
  variant?: "new" | "bestseller" | "limited" | "sale" | "subtle";
  size?: "sm" | "md";
  className?: string;
  /** Animate in on mount. */
  animate?: boolean;
}

const variantClasses = {
  new: "bg-[var(--ink)] text-white",
  bestseller: "bg-[var(--gold)] text-[var(--ink)]",
  limited:
    "bg-[var(--cream-warm)] text-[var(--ink)] border border-[var(--gold)]",
  sale: "bg-[var(--destructive)] text-white",
  subtle: "bg-[var(--cream)] text-[var(--muted)]",
} as const;

const sizeClasses = {
  sm: "px-2 py-0.5 text-[0.625rem]",
  md: "px-3 py-1 text-[0.6875rem]",
} as const;

export function LuxuryBadge({
  children,
  variant = "subtle",
  size = "sm",
  className,
  animate = false,
}: LuxuryBadgeProps) {
  const badge = (
    <span
      className={cn(
        "label-caps inline-flex items-center gap-1 tracking-[0.12em]",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
    >
      {children}
    </span>
  );

  if (!animate) return badge;

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="inline-flex"
    >
      {badge}
    </motion.span>
  );
}
