"use client";

/**
 * Marquee — infinite horizontal scroll for brand strips, quotes, logos.
 *
 * Spec: Editorial luxury feel — slow, smooth, seamless loop.
 *
 * Usage:
 *   <Marquee>
 *     <span>Refined Living</span>
 *     <span>•</span>
 *     <span>Considered Design</span>
 *   </Marquee>
 *
 *   <Marquee speed="slow" direction="right" className="bg-ink text-cream">
 *     {brands.map(...)}
 *   </Marquee>
 */

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: ReactNode;
  /** Direction of scroll. Default "left". */
  direction?: "left" | "right";
  /** Speed presets. Default "medium". */
  speed?: "slow" | "medium" | "fast";
  /** Pause on hover. Default true. */
  pauseOnHover?: boolean;
  /** Vertical separator between items. Renders "•" if not provided. */
  separator?: ReactNode;
  className?: string;
}

const speedMap = {
  slow: 60, // seconds per loop
  medium: 35,
  fast: 20,
} as const;

export function Marquee({
  children,
  direction = "left",
  speed = "medium",
  pauseOnHover = true,
  separator = <span aria-hidden>•</span>,
  className,
}: MarqueeProps) {
  const prefersReducedMotion = useReducedMotion();
  const duration = speedMap[speed];

  if (prefersReducedMotion) {
    // Static — render children once, no animation
    return (
      <div className={cn("flex items-center gap-8 overflow-hidden", className)}>
        {children}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "group relative flex overflow-hidden",
        pauseOnHover && "[&:hover_>div]:[animation-play-state:paused]",
        className,
      )}
    >
      <motion.div
        className="flex shrink-0 items-center gap-8 pr-8"
        animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{
          duration,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {/* Render children twice for seamless loop */}
        <div className="flex items-center gap-8">
          {children}
          {separator}
        </div>
        <div className="flex items-center gap-8" aria-hidden>
          {children}
          {separator}
        </div>
      </motion.div>
    </div>
  );
}
