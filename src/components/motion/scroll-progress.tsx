"use client";

/**
 * ScrollProgress — thin gold progress bar fixed at top of viewport.
 *
 * Tracks overall page scroll progress (0-100%).
 * Visible only when scrolled past 0.5% to avoid flicker at top.
 *
 * Usage:
 *   <ScrollProgress />   // place once in root layout
 */

import {
  motion,
  useScroll,
  useSpring,
  useMotionValueEvent,
  useReducedMotion,
} from "motion/react";
import { useState } from "react";

export function ScrollProgress() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    mass: 0.4,
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setVisible(v > 0.005);
  });

  if (prefersReducedMotion) return null;

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-[var(--gold)]"
      style={{ scaleX }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.2 }}
      aria-hidden
    />
  );
}
