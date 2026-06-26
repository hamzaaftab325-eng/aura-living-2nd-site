"use client";

/**
 * SplitHeading — line-by-line reveal for Playfair Display headings.
 *
 * Splits text into lines (by provided splitter or word-wrap), wraps each line
 * in an overflow-hidden mask, and translates each line up from below with a
 * staggered delay. This is the signature Awwwards hero reveal.
 *
 * Usage:
 *   <SplitHeading
 *     text="Curated calm for considered living."
 *     className="text-display-xl"
 *     stagger={0.08}
 *   />
 *
 *   <SplitHeading
 *     text="Editorial\nRefined\nTimeless"
 *     splitter="\n"
 *     className="text-display-lg"
 *   />
 */

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { luxuryEasing, luxuryDurations } from "@/providers/motion-provider";

interface SplitHeadingProps {
  text: string;
  /** How to split text into lines. Default: "\n". */
  splitter?: string;
  /** Stagger between lines (seconds). Default 0.08. */
  stagger?: number;
  /** Initial delay before first line (seconds). Default 0. */
  delay?: number;
  /** Trigger on mount (true) or on scroll into view (false). Default true. */
  immediate?: boolean;
  className?: string;
  /** Custom per-line className. */
  lineClassName?: string;
}

export function SplitHeading({
  text,
  splitter = "\n",
  stagger = 0.08,
  delay = 0,
  immediate = true,
  className,
  lineClassName,
}: SplitHeadingProps) {
  const prefersReducedMotion = useReducedMotion();
  const lines = text.split(splitter).filter(Boolean);

  if (prefersReducedMotion) {
    return (
      <span className={cn("block", className)}>
        {lines.map((line, i) => (
          <span key={i} className={cn("block", lineClassName)}>
            {line}
          </span>
        ))}
      </span>
    );
  }

  const containerProps = immediate
    ? { initial: "hidden", animate: "visible" }
    : {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, amount: 0.3 },
      };

  return (
    <motion.span
      className={cn("block", className)}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
      {...containerProps}
    >
      {lines.map((line, i) => (
        <span
          key={i}
          className={cn("block overflow-hidden", lineClassName)}
          aria-hidden={false}
        >
          <motion.span
            className="block"
            variants={{
              hidden: { y: "110%", opacity: 0 },
              visible: {
                y: 0,
                opacity: 1,
                transition: {
                  duration: luxuryDurations.luxury,
                  ease: luxuryEasing,
                },
              },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
      <span className="sr-only">{text}</span>
    </motion.span>
  );
}
