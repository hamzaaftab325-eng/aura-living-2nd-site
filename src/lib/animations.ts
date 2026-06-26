/**
 * Luxury Animation Variants — reusable Motion variant presets.
 *
 * Import these anywhere you need consistent animation patterns.
 * All respect prefers-reduced-motion via the MotionProvider.
 *
 * Usage:
 *   import { luxuryVariants } from "@/lib/animations";
 *   <motion.div variants={luxuryVariants.fadeUp} initial="hidden" animate="visible" />
 */

import type { Variants, Transition } from "motion/react";

const LUXURY_EASE = [0.22, 1, 0.36, 1] as const;

const baseTransition: Transition = {
  duration: 0.8,
  ease: LUXURY_EASE,
};

export const luxuryVariants = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: baseTransition },
  },
  fadeUp: {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: baseTransition },
  },
  fadeDown: {
    hidden: { opacity: 0, y: -24 },
    visible: { opacity: 1, y: 0, transition: baseTransition },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -32 },
    visible: { opacity: 1, x: 0, transition: baseTransition },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 32 },
    visible: { opacity: 1, x: 0, transition: baseTransition },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.96 },
    visible: { opacity: 1, scale: 1, transition: baseTransition },
  },
  blur: {
    hidden: { opacity: 0, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        ...baseTransition,
        filter: { duration: 0.6, ease: LUXURY_EASE },
      },
    },
  },
  blurUp: {
    hidden: { opacity: 0, y: 24, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        ...baseTransition,
        filter: { duration: 0.6, ease: LUXURY_EASE },
      },
    },
  },
  clipRight: {
    hidden: { clipPath: "inset(0 100% 0 0)" },
    visible: {
      clipPath: "inset(0 0 0 0)",
      transition: { duration: 1.1, ease: LUXURY_EASE },
    },
  },
  clipLeft: {
    hidden: { clipPath: "inset(0 0 0 100%)" },
    visible: {
      clipPath: "inset(0 0 0 0)",
      transition: { duration: 1.1, ease: LUXURY_EASE },
    },
  },
  clipUp: {
    hidden: { clipPath: "inset(100% 0 0 0)" },
    visible: {
      clipPath: "inset(0 0 0 0)",
      transition: { duration: 1.1, ease: LUXURY_EASE },
    },
  },
  clipDown: {
    hidden: { clipPath: "inset(0 0 100% 0)" },
    visible: {
      clipPath: "inset(0 0 0 0)",
      transition: { duration: 1.1, ease: LUXURY_EASE },
    },
  },
} as const satisfies Record<string, Variants>;

/**
 * Stagger container — orchestrates child reveals.
 * Pair with one of the luxuryVariants above on each child.
 */
export const staggerContainer = (stagger = 0.08, delay = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

/**
 * Common transitions for reuse.
 */
export const luxuryTransitions = {
  fast: { duration: 0.18, ease: LUXURY_EASE },
  base: { duration: 0.32, ease: LUXURY_EASE },
  slow: { duration: 0.54, ease: LUXURY_EASE },
  luxury: { duration: 0.8, ease: LUXURY_EASE },
  springSoft: {
    type: "spring" as const,
    stiffness: 280,
    damping: 32,
    mass: 0.8,
  },
  springGentle: {
    type: "spring" as const,
    stiffness: 180,
    damping: 26,
    mass: 1,
  },
};

export type LuxuryVariantKey = keyof typeof luxuryVariants;
