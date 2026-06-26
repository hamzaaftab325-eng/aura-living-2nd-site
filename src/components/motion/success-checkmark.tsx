"use client";

/**
 * SuccessCheckmark — animated SVG checkmark for success states.
 *
 * Spec (DESIGN.md → Checkout + Cart):
 *   - Success checkmark (animated)
 *   - Success confirmation
 *
 * Features:
 *   - Circle draws first (stroke-dasharray animation)
 *   - Checkmark draws second
 *   - Optional scale-in entrance
 *   - Reduced-motion safe (renders static)
 *
 * Usage:
 *   <SuccessCheckmark />
 *   <SuccessCheckmark size={80} color="var(--gold)" />
 *
 *   {success && <SuccessCheckmark onAnimationComplete={() => ...} />}
 */

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface SuccessCheckmarkProps {
  size?: number;
  /** Stroke color. Default gold. */
  color?: string;
  /** Background circle color. Default transparent. */
  bgColor?: string;
  className?: string;
  delay?: number;
  onAnimationComplete?: () => void;
}

export function SuccessCheckmark({
  size = 64,
  color = "var(--gold)",
  bgColor = "transparent",
  className,
  delay = 0,
  onAnimationComplete,
}: SuccessCheckmarkProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        className={className}
        fill="none"
      >
        <circle
          cx="32"
          cy="32"
          r="28"
          stroke={color}
          strokeWidth="2"
          fill={bgColor}
        />
        <path
          d="M20 32 L28 40 L44 24"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={cn(className)}
      fill="none"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {/* Circle */}
      <motion.circle
        cx="32"
        cy="32"
        r="28"
        stroke={color}
        strokeWidth="2"
        fill={bgColor}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      />
      {/* Checkmark */}
      <motion.path
        d="M20 32 L28 40 L44 24"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: 0.4,
          ease: [0.22, 1, 0.36, 1],
          delay: delay + 0.5,
          onComplete: onAnimationComplete,
        }}
      />
    </motion.svg>
  );
}
