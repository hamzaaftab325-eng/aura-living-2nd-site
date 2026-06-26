"use client";

/**
 * MaterialChip — pill-shaped chip for materials, filters, variants.
 *
 * Spec (DESIGN.md → Chips & Tags):
 *   - Pill-shaped
 *   - Soft Cream background + Deep Black text
 *   - Selected state: ink fill + cream text
 *
 * Variants:
 *   - default     — cream bg, ink text
 *   - selected    — ink bg, cream text
 *   - gold        — gold bg, ink text (for premium filters)
 *   - outline     — border only
 *
 * Usage:
 *   <MaterialChip label="Velvet" selected onClick={...} />
 *   <MaterialChip label="Oak" />
 *   <MaterialChip label="Premium" variant="gold" />
 */

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { Check, X } from "lucide-react";

export interface MaterialChipProps {
  label: string;
  selected?: boolean;
  variant?: "default" | "gold" | "outline";
  icon?: LucideIcon;
  dismissible?: boolean;
  onClick?: () => void;
  onDismiss?: () => void;
  className?: string;
}

export function MaterialChip({
  label,
  selected = false,
  variant = "default",
  icon: Icon,
  dismissible = false,
  onClick,
  onDismiss,
  className,
}: MaterialChipProps) {
  const base =
    "relative inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-[0.8125rem] font-medium transition-colors duration-300 cursor-pointer select-none";

  const variantClasses = {
    default: selected
      ? "border-[var(--ink)] bg-[var(--ink)] text-white"
      : "border-[var(--line)] bg-[var(--cream-warm)] text-[var(--ink)] hover:border-[var(--ink)]",
    gold: selected
      ? "border-[var(--gold)] bg-[var(--gold)] text-[var(--ink)]"
      : "border-[var(--line)] bg-transparent text-[var(--ink)] hover:border-[var(--gold)] hover:text-[var(--gold-deep)]",
    outline: selected
      ? "border-[var(--ink)] bg-transparent text-[var(--ink)]"
      : "border-[var(--line)] bg-transparent text-[var(--muted)] hover:border-[var(--ink)] hover:text-[var(--ink)]",
  };

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.12 }}
      className={cn(base, variantClasses[variant], className)}
      aria-pressed={selected}
    >
      {Icon && <Icon className="h-3.5 w-3.5" strokeWidth={1.25} />}
      {selected && !Icon && (
        <Check className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden />
      )}
      <span>{label}</span>
      {dismissible && (
        <X
          className="h-3 w-3 opacity-60 hover:opacity-100"
          strokeWidth={1.5}
          onClick={(e) => {
            e.stopPropagation();
            onDismiss?.();
          }}
          aria-label={`Remove ${label}`}
        />
      )}
    </motion.button>
  );
}
