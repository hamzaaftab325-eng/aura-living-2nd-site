"use client";

/**
 * UnderlineInput — luxury underline-style input with floating Label-Caps label.
 *
 * Spec (DESIGN.md → Components → Input Fields):
 *   - Underline-style inputs with no side borders
 *   - Label floats above the line in the "Label-Caps" typography style
 *   - Focus state changes the bottom border from light grey to Deep Black
 *
 * Usage:
 *   <UnderlineInput label="Email Address" type="email" />
 *   <UnderlineInput label="Search" icon={<Search />} />
 *   <UnderlineInput label="Phone" error="Required" />
 */

import { forwardRef, useId, useState } from "react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import type { LucideIcon } from "lucide-react";

export interface UnderlineInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> {
  label: string;
  icon?: LucideIcon;
  error?: string;
  hint?: string;
  containerClassName?: string;
}

export const UnderlineInput = forwardRef<HTMLInputElement, UnderlineInputProps>(
  function UnderlineInput(
    {
      label,
      icon: Icon,
      error,
      hint,
      className,
      containerClassName,
      id,
      onFocus,
      onBlur,
      ...props
    },
    ref,
  ) {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const [focused, setFocused] = useState(false);
    const hasError = Boolean(error);

    return (
      <div className={cn("group relative", containerClassName)}>
        {/* Label */}
        <label
          htmlFor={inputId}
          className={cn(
            "label-caps pointer-events-none mb-2 block transition-colors duration-300",
            hasError
              ? "text-[var(--destructive)]"
              : focused
                ? "text-[var(--ink)]"
                : "text-[var(--muted)] group-hover:text-[var(--stone)]",
          )}
        >
          {label}
        </label>

        {/* Input + icon */}
        <div className="relative flex items-center">
          {Icon && (
            <Icon
              className={cn(
                "pointer-events-none absolute left-0 h-4 w-4 transition-colors duration-300",
                focused ? "text-[var(--ink)]" : "text-[var(--muted)]",
              )}
              strokeWidth={1.25}
            />
          )}
          <input
            ref={ref}
            id={inputId}
            onFocus={(e) => {
              setFocused(true);
              onFocus?.(e);
            }}
            onBlur={(e) => {
              setFocused(false);
              onBlur?.(e);
            }}
            className={cn(
              "w-full border-0 border-b bg-transparent px-0 py-3 text-[var(--ink)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] outline-none placeholder:text-[var(--muted)]/60",
              Icon && "pl-7",
              "border-[var(--line)] hover:border-[var(--stone)]",
              focused && "border-[var(--ink)]",
              hasError && "border-[var(--destructive)]",
              className,
            )}
            aria-invalid={hasError}
            aria-describedby={hint || error ? `${inputId}-hint` : undefined}
            {...props}
          />
        </div>

        {/* Animated underline accent on focus */}
        <motion.div
          className="pointer-events-none absolute bottom-0 left-0 h-px origin-left bg-[var(--gold)]"
          initial={false}
          animate={{ scaleX: focused ? 1 : 0 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: "100%" }}
        />

        {/* Hint or error */}
        <AnimatePresence mode="wait">
          {error || hint ? (
            <motion.p
              id={`${inputId}-hint`}
              key={error ? "error" : "hint"}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "text-body-sm mt-2",
                hasError ? "text-[var(--destructive)]" : "text-[var(--muted)]",
              )}
            >
              {error || hint}
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>
    );
  },
);
