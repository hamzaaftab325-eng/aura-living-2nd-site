"use client";

/**
 * WordReveal — word-by-word staggered reveal for body copy + headings.
 *
 * Splits text on whitespace, wraps each word in an inline-block mask, and
 * staggers their reveal. Perfect for editorial paragraphs and pull quotes.
 *
 * Usage:
 *   <WordReveal text="A refined collection of home decor, crafted with intention." />
 *
 *   <WordReveal
 *     text="Considered design for the modern home."
 *     className="text-headline-md"
 *     stagger={0.06}
 *     immediate={false}
 *   />
 */

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { luxuryEasing, luxuryDurations } from "@/providers/motion-provider";

interface WordRevealProps {
  text: string;
  /** Stagger between words (seconds). Default 0.04. */
  stagger?: number;
  /** Initial delay before first word. Default 0. */
  delay?: number;
  /** Trigger on mount (true) or on scroll into view (false). Default false. */
  immediate?: boolean;
  /** Viewport amount to trigger (when immediate=false). Default 0.3. */
  amount?: number;
  className?: string;
  /** Per-word className. */
  wordClassName?: string;
}

export function WordReveal({
  text,
  stagger = 0.04,
  delay = 0,
  immediate = false,
  amount = 0.3,
  className,
  wordClassName,
}: WordRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const words = text.split(/\s+/).filter(Boolean);

  if (prefersReducedMotion) {
    return <span className={cn("inline", className)}>{text}</span>;
  }

  const containerProps = immediate
    ? { initial: "hidden", animate: "visible" }
    : {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, amount },
      };

  return (
    <motion.span
      className={cn("inline", className)}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
      {...containerProps}
    >
      {words.map((word, i) => (
        <span
          key={i}
          className="mb-[-0.1em] inline-block overflow-hidden pb-[0.1em] align-bottom"
        >
          <motion.span
            className={cn("inline-block", wordClassName)}
            variants={{
              hidden: { y: "110%", opacity: 0 },
              visible: {
                y: 0,
                opacity: 1,
                transition: {
                  duration: luxuryDurations.base,
                  ease: luxuryEasing,
                },
              },
            }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
