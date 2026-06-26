"use client";

/**
 * BlurReveal — de-blur content as it scrolls into view.
 *
 * The element starts blurred (10px) + low opacity, then resolves to sharp + full
 * opacity when it enters the viewport. Signature cinematic luxury effect.
 *
 * Variants:
 *   - blur-in       — start blurred, sharpen on view (default)
 *   - blur-up       — blur-in + translateY(24px → 0)
 *   - blur-scale    — blur-in + scale(0.96 → 1)
 *   - blur-fade     — blur-in + opacity(0 → 1) only
 *
 * Usage:
 *   <BlurReveal>
 *     <img src="/hero.jpg" />
 *   </BlurReveal>
 *
 *   <BlurReveal variant="blur-up" delay={0.2} amount={0.4}>
 *     <h2>Section heading</h2>
 *   </BlurReveal>
 */

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { luxuryEasing, luxuryDurations } from "@/providers/motion-provider";

type BlurVariant = "blur-in" | "blur-up" | "blur-scale" | "blur-fade";

interface BlurRevealProps {
  children: ReactNode;
  variant?: BlurVariant;
  delay?: number;
  amount?: number;
  once?: boolean;
  className?: string;
  /** Blur intensity in px. Default 10. */
  intensity?: number;
  as?: "div" | "section" | "article" | "li" | "span" | "figure";
}

const offsetMap: Record<BlurVariant, { y?: number; scale?: number }> = {
  "blur-in": {},
  "blur-up": { y: 24 },
  "blur-scale": { scale: 0.96 },
  "blur-fade": {},
};

export function BlurReveal({
  children,
  variant = "blur-in",
  delay = 0,
  amount = 0.2,
  once = true,
  className,
  intensity = 10,
  as = "div",
}: BlurRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const offset = offsetMap[variant];

  const initial = prefersReducedMotion
    ? { opacity: 0 }
    : { opacity: 0, filter: `blur(${intensity}px)`, ...offset };

  const animate = prefersReducedMotion
    ? { opacity: 1 }
    : {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        scale: 1,
      };

  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial={initial}
      whileInView={animate}
      viewport={{ once, amount, margin: "-60px 0px -60px 0px" }}
      transition={{
        duration: luxuryDurations.luxury,
        ease: luxuryEasing,
        delay,
        filter: { duration: luxuryDurations.slow, ease: luxuryEasing },
      }}
    >
      {children}
    </MotionTag>
  );
}
