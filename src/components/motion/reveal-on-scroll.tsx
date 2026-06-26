"use client";

/**
 * RevealOnScroll — fade/translate content into view on scroll.
 *
 * Uses Motion's `whileInView` with luxury easing.
 * Respects prefers-reduced-motion via MotionProvider.
 *
 * Variants:
 *   - fade       — opacity only
 *   - up         — fade + translateY(20px → 0)
 *   - down       — fade + translateY(-20px → 0)
 *   - left       — fade + translateX(-30px → 0)
 *   - right      — fade + translateX(30px → 0)
 *   - scale      — fade + scale(0.95 → 1)
 *   - blur       — fade + blur(8px → 0)  (cinematic)
 *
 * Usage:
 *   <RevealOnScroll variant="up">
 *     <h2>Section title</h2>
 *   </RevealOnScroll>
 *
 *   <RevealOnScroll variant="blur" delay={0.2} amount={0.3}>
 *     <Card>...</Card>
 *   </RevealOnScroll>
 */

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { luxuryEasing, luxuryDurations } from "@/providers/motion-provider";

type RevealVariant =
  | "fade"
  | "up"
  | "fade-up"
  | "down"
  | "fade-down"
  | "left"
  | "fade-left"
  | "right"
  | "fade-right"
  | "scale"
  | "blur"
  | "blur-up"
  | "blur-scale";

interface RevealOnScrollProps {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  /** Viewport amount (0-1) that must enter before triggering. Default 0.2. */
  amount?: number;
  /** Only animate once. Default true. */
  once?: boolean;
  className?: string;
  as?: "div" | "section" | "article" | "li" | "span";
}

const offsetMap: Record<
  RevealVariant,
  { x?: number; y?: number; scale?: number; filter?: string }
> = {
  fade: {},
  up: { y: 24 },
  "fade-up": { y: 24 },
  down: { y: -24 },
  "fade-down": { y: -24 },
  left: { x: -32 },
  "fade-left": { x: -32 },
  right: { x: 32 },
  "fade-right": { x: 32 },
  scale: { scale: 0.96 },
  blur: { filter: "blur(10px)" },
  "blur-up": { y: 24, filter: "blur(10px)" },
  "blur-scale": { scale: 0.96, filter: "blur(10px)" },
};

export function RevealOnScroll({
  children,
  variant = "up",
  delay = 0,
  amount = 0.2,
  once = true,
  className,
  as = "div",
}: RevealOnScrollProps) {
  const prefersReducedMotion = useReducedMotion();
  const offset = offsetMap[variant];

  // Reduced motion: skip transform, fade only.
  const initial = prefersReducedMotion
    ? { opacity: 0 }
    : { opacity: 0, ...offset };

  const animate = prefersReducedMotion
    ? { opacity: 1 }
    : { opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" };

  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial={initial}
      whileInView={animate}
      viewport={{ once, amount, margin: "-80px 0px -80px 0px" }}
      transition={{
        duration: luxuryDurations.slow,
        ease: luxuryEasing,
        delay,
      }}
    >
      {children}
    </MotionTag>
  );
}
