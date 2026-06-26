"use client";

/**
 * CartBadge — animated cart count badge with bounce on increment.
 *
 * Spec (DESIGN.md → Cart):
 *   - Cart badge bounce
 *
 * Usage:
 *   <CartBadge count={3} />
 *   <CartBadge count={cartItems.length} />
 */

import { motion, useReducedMotion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export interface CartBadgeProps {
  count: number;
  className?: string;
}

export function CartBadge({ count, className }: CartBadgeProps) {
  const prefersReducedMotion = useReducedMotion();

  if (count === 0) return null;

  return (
    <AnimatePresence mode="popLayout">
      <motion.span
        key={count}
        className={cn(
          "absolute -top-2 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--gold)] px-1 text-[0.625rem] font-semibold text-[var(--ink)]",
          className,
        )}
        initial={
          prefersReducedMotion ? { opacity: 0 } : { scale: 0, opacity: 0 }
        }
        animate={
          prefersReducedMotion
            ? { opacity: 1 }
            : {
                scale: [0, 1.3, 1],
                opacity: 1,
              }
        }
        exit={prefersReducedMotion ? { opacity: 0 } : { scale: 0, opacity: 0 }}
        transition={{
          duration: 0.4,
          ease: [0.22, 1, 0.36, 1],
          times: prefersReducedMotion ? undefined : [0, 0.6, 1],
        }}
      >
        {count}
      </motion.span>
    </AnimatePresence>
  );
}
