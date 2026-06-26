"use client";

/**
 * FloatingElement — decorative floating accents.
 *
 * Spec (DESIGN.md → Hero Section):
 *   - Floating decorative elements
 *   - Subtle floating accents (Luxury Touches)
 *
 * Features:
 *   - Configurable float speed + amplitude
 *   - CSS-driven float (no JS scroll listener needed for floating)
 *   - Reduced-motion safe (renders static)
 *
 * Usage:
 *   <FloatingElement
 *     className="absolute right-10 top-20"
 *     floatSpeed="slow"
 *   >
 *     <Sparkles className="h-6 w-6 text-[var(--gold)]" />
 *   </FloatingElement>
 */

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FloatingElementProps {
  children: ReactNode;
  className?: string;
  /** Float speed preset. Default "medium". */
  floatSpeed?: "slow" | "medium" | "fast";
  /** Float amplitude in px. Default 12. */
  amplitude?: number;
  /** Optional rotation amplitude in degrees. Default 1. */
  rotation?: number;
}

const speedToDuration = {
  slow: 9,
  medium: 6,
  fast: 4,
} as const;

export function FloatingElement({
  children,
  className,
  floatSpeed = "medium",
  amplitude = 12,
  rotation = 1,
}: FloatingElementProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn("pointer-events-none", className)}
      animate={{
        y: [`-${amplitude}px`, `${amplitude}px`, `-${amplitude}px`],
        rotate: [-rotation, rotation, -rotation],
      }}
      transition={{
        duration: speedToDuration[floatSpeed],
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}
