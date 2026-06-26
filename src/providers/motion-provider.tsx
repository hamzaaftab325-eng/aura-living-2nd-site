"use client";

/**
 * MotionProvider — global Motion (Framer Motion) configuration.
 *
 * Sets luxury spring physics + reduced-motion guard once for the whole app.
 * All child components inherit these defaults.
 *
 * Spec (DESIGN.md → Animation Standards):
 *   - Subtle, refined easing — never bouncy or chaotic
 *   - Default ease: cubic-bezier(0.22, 1, 0.36, 1)  (expo-out)
 *   - Springs: low stiffness, high damping for "weighty" feel
 */

import { motion, MotionConfig, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export const luxuryEasing = [0.22, 1, 0.36, 1] as const;
export const luxuryEasingIn = [0.7, 0, 0.84, 0] as const;
export const luxuryEasingOut = [0.16, 1, 0.3, 1] as const;

export const luxurySprings = {
  /** Soft — for cards, sheets entering, accordion expand */
  soft: { type: "spring", stiffness: 280, damping: 32, mass: 0.8 },
  /** Cart — for slide-out drawers, popovers */
  cart: { type: "spring", stiffness: 320, damping: 30, mass: 0.7 },
  /** Snappy — for buttons, toggles, micro-interactions */
  snappy: { type: "spring", stiffness: 500, damping: 38, mass: 0.6 },
  /** Gentle — for hover lifts, image zoom */
  gentle: { type: "spring", stiffness: 180, damping: 26, mass: 1 },
} as const;

export const luxuryDurations = {
  fast: 0.18,
  base: 0.32,
  slow: 0.54,
  luxury: 0.8,
} as const;

interface MotionProviderProps {
  children: ReactNode;
}

export function MotionProvider({ children }: MotionProviderProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <MotionConfig
      reducedMotion={prefersReducedMotion ? "always" : "user"}
      transition={{
        ease: luxuryEasing,
        duration: luxuryDurations.base,
      }}
    >
      {children}
    </MotionConfig>
  );
}

// Re-export motion primitives for convenience
export { motion };
export type { MotionConfig };
