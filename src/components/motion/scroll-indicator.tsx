"use client";

/**
 * ScrollIndicator — animated scroll cue for hero sections.
 *
 * Spec (DESIGN.md → Hero Section):
 *   "Scroll indicator animation"
 *
 * Features:
 *   - Animated mouse outline with bobbing dot inside
 *   - "Scroll" label below
 *   - Fades out on scroll
 *
 * Usage:
 *   <ScrollIndicator />
 *   <ScrollIndicator label="Discover" />
 */

import {
  motion,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
} from "motion/react";
import { useState } from "react";

interface ScrollIndicatorProps {
  label?: string;
  className?: string;
}

export function ScrollIndicator({
  label = "Scroll to discover",
  className = "",
}: ScrollIndicatorProps) {
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const [opacity, setOpacity] = useState(1);

  useMotionValueEvent(scrollY, "change", (y) => {
    setOpacity(y > 50 ? 0 : 1);
  });

  if (prefersReducedMotion) {
    return (
      <div className={`flex flex-col items-center gap-3 ${className}`}>
        <span className="label-caps text-[var(--muted)]">{label}</span>
      </div>
    );
  }

  return (
    <motion.div
      className={`flex flex-col items-center gap-3 ${className}`}
      animate={{ opacity }}
      transition={{ duration: 0.3 }}
    >
      <span className="label-caps text-[var(--muted)]">{label}</span>

      {/* Mouse outline */}
      <div className="relative h-9 w-5 rounded-full border border-[var(--muted)]">
        <motion.div
          className="absolute top-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[var(--gold)]"
          animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </motion.div>
  );
}
