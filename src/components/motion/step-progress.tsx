"use client";

/**
 * StepProgress — animated multi-step progress indicator.
 *
 * Spec (DESIGN.md → Checkout):
 *   - Multi-step progress animation
 *   - Loading transitions
 *
 * Features:
 *   - Active step pulses gold
 *   - Completed steps fill with ink + animated checkmark
 *   - Connecting line draws between completed steps
 *   - Labels with label-caps typography
 *
 * Usage:
 *   <StepProgress
 *     steps={["Information", "Shipping", "Payment", "Review"]}
 *     currentStep={2}
 *   />
 */

import { motion, useReducedMotion } from "motion/react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepProgressProps {
  steps: string[];
  /** 0-indexed current step. */
  currentStep: number;
  className?: string;
}

export function StepProgress({
  steps,
  currentStep,
  className,
}: StepProgressProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className={cn("flex items-center", className)}>
      {steps.map((step, i) => {
        const isComplete = i < currentStep;
        const isActive = i === currentStep;
        const isLast = i === steps.length - 1;

        return (
          <div
            key={step}
            className={cn("flex items-center", !isLast && "flex-1")}
          >
            {/* Step circle + label */}
            <div className="flex flex-col items-center gap-2">
              <motion.div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors duration-500",
                  isComplete
                    ? "border-[var(--ink)] bg-[var(--ink)]"
                    : isActive
                      ? "border-[var(--gold)] bg-[var(--gold)]"
                      : "border-[var(--line)] bg-transparent",
                )}
                animate={
                  isActive && !prefersReducedMotion
                    ? { scale: [1, 1.06, 1] }
                    : {}
                }
                transition={{ duration: 1.6, repeat: Infinity }}
              >
                {isComplete ? (
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Check className="h-4 w-4 text-white" strokeWidth={2.5} />
                  </motion.span>
                ) : (
                  <span
                    className={cn(
                      "text-[0.75rem] font-semibold",
                      isActive ? "text-[var(--ink)]" : "text-[var(--muted)]",
                    )}
                  >
                    {i + 1}
                  </span>
                )}
              </motion.div>
              <span
                className={cn(
                  "label-caps hidden sm:block",
                  isActive || isComplete
                    ? "text-[var(--ink)]"
                    : "text-[var(--muted)]",
                )}
              >
                {step}
              </span>
            </div>

            {/* Connector line */}
            {!isLast && (
              <div className="mx-3 h-px flex-1 bg-[var(--line)]">
                <motion.div
                  className="h-full bg-[var(--ink)]"
                  initial={{ width: "0%" }}
                  animate={{ width: isComplete ? "100%" : "0%" }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
