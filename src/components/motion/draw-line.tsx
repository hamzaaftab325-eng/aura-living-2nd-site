"use client";

/**
 * DrawLine — self-drawing horizontal line via scaleX animation.
 *
 * Triggers when scrolled into view. Use as an ornamental divider or
 * accent under eyebrows / section labels.
 *
 * Usage:
 *   <DrawLine className="mt-4 h-px bg-[var(--gold)]" />
 *   <DrawLine direction="vertical" className="h-12 w-px" />
 */

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { luxuryEasing, luxuryDurations } from "@/providers/motion-provider";

interface DrawLineProps {
  className?: string;
  /** Direction the line draws in. Default "right". */
  direction?: "right" | "left" | "up" | "down";
  delay?: number;
  amount?: number;
  once?: boolean;
}

const originMap = {
  right: "left", // draws from left to right
  left: "right",
  up: "bottom",
  down: "top",
} as const;

export function DrawLine({
  className,
  direction = "right",
  delay = 0,
  amount = 0.5,
  once = true,
}: DrawLineProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={cn("h-px w-full bg-[var(--gold)]", className)} />;
  }

  const isVertical = direction === "up" || direction === "down";

  return (
    <motion.div
      className={cn(
        isVertical ? "w-px" : "h-px w-full",
        "bg-[var(--gold)]",
        className,
      )}
      style={{ transformOrigin: originMap[direction] }}
      initial={{ scaleX: isVertical ? 1 : 0, scaleY: isVertical ? 0 : 1 }}
      whileInView={{
        scaleX: 1,
        scaleY: 1,
      }}
      viewport={{ once, amount }}
      transition={{
        duration: luxuryDurations.luxury,
        ease: luxuryEasing,
        delay,
      }}
    />
  );
}
