/**
 * Eyebrow — small tracked uppercase label that introduces a section.
 *
 * Spec (DESIGN.md → Typography → "Label-Caps" Role):
 *   - Use specifically for categories, breadcrumbs, and small eyebrow text
 *   - Inter 12px, weight 600, line-height 1.2, letter-spacing 0.1em, uppercase
 *
 * Usage:
 *   <Eyebrow>New Arrivals</Eyebrow>
 *   <Eyebrow tone="gold">Bestseller</Eyebrow>
 */

import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type EyebrowTone = "default" | "gold" | "ink";

export interface EyebrowProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: EyebrowTone;
}

const toneClasses: Record<EyebrowTone, string> = {
  default: "text-[var(--muted)]",
  gold: "text-[var(--gold)]",
  ink: "text-[var(--ink)]",
};

export function Eyebrow({
  tone = "default",
  className,
  children,
  ...props
}: EyebrowProps) {
  return (
    <span
      className={cn("label-caps inline-block", toneClasses[tone], className)}
      {...props}
    >
      {children}
    </span>
  );
}

export default Eyebrow;
