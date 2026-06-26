"use client";

/**
 * QuantityStepper — animated quantity controls for cart/PDP.
 *
 * Spec (DESIGN.md → Cart):
 *   - Quantity animations
 *
 * Features:
 *   - Minus/plus buttons with subtle scale on click
 *   - Number animates on change (slide up/down)
 *   - Min/max bounds
 *   - Disabled state at min/max
 *
 * Usage:
 *   <QuantityStepper value={qty} onChange={setQty} min={1} max={10} />
 */

import { motion, useReducedMotion, AnimatePresence } from "motion/react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: { btn: "h-8 w-8", text: "text-body-sm", container: "gap-2" },
  md: { btn: "h-10 w-10", text: "text-body-md", container: "gap-3" },
  lg: { btn: "h-12 w-12", text: "text-body-lg", container: "gap-4" },
} as const;

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  className,
  size = "md",
}: QuantityStepperProps) {
  const prefersReducedMotion = useReducedMotion();
  const sizes = sizeClasses[size];

  const canDecrement = value > min;
  const canIncrement = value < max;

  return (
    <div
      className={cn(
        "inline-flex items-center border border-[var(--line)] bg-[var(--cream)]",
        sizes.container,
        className,
      )}
    >
      <motion.button
        type="button"
        onClick={() => canDecrement && onChange(value - 1)}
        disabled={!canDecrement}
        whileTap={prefersReducedMotion ? undefined : { scale: 0.9 }}
        className={cn(
          "flex items-center justify-center text-[var(--ink)] transition-colors duration-300 hover:bg-[var(--cream-warm)] disabled:opacity-30 disabled:hover:bg-transparent",
          sizes.btn,
        )}
        aria-label="Decrease quantity"
      >
        <Minus className="h-3.5 w-3.5" strokeWidth={1.5} />
      </motion.button>

      <div className="relative min-w-8 text-center">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            initial={
              prefersReducedMotion ? { opacity: 0 } : { y: 12, opacity: 0 }
            }
            animate={{ y: 0, opacity: 1 }}
            exit={
              prefersReducedMotion ? { opacity: 0 } : { y: -12, opacity: 0 }
            }
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "inline-block font-medium text-[var(--ink)] tabular-nums",
              sizes.text,
            )}
          >
            {value}
          </motion.span>
        </AnimatePresence>
      </div>

      <motion.button
        type="button"
        onClick={() => canIncrement && onChange(value + 1)}
        disabled={!canIncrement}
        whileTap={prefersReducedMotion ? undefined : { scale: 0.9 }}
        className={cn(
          "flex items-center justify-center text-[var(--ink)] transition-colors duration-300 hover:bg-[var(--cream-warm)] disabled:opacity-30 disabled:hover:bg-transparent",
          sizes.btn,
        )}
        aria-label="Increase quantity"
      >
        <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
      </motion.button>
    </div>
  );
}
