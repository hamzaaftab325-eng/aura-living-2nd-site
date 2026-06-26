"use client";

/**
 * DecorativeDivider — animated SVG line divider with optional ornament.
 *
 * Spec (DESIGN.md → Footer):
 *   - Decorative line animation
 *
 * Variants:
 *   - line      — single line that draws in
 *   - diamond   — line + center diamond
 *   - dots      — three dots with flanking lines
 *   - ornament  — line + center gold ornament (Greek key / leaf)
 *
 * Usage:
 *   <DecorativeDivider variant="diamond" className="my-16" />
 *   <DecorativeDivider variant="ornament" tone="dark" />
 */

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface DecorativeDividerProps {
  variant?: "line" | "diamond" | "dots" | "ornament";
  /** Color theme. Default "light" (line color = --line). */
  tone?: "light" | "dark" | "gold";
  className?: string;
  delay?: number;
}

const toneColors = {
  light: { line: "var(--line)", accent: "var(--gold)" },
  dark: { line: "rgba(255,255,255,0.15)", accent: "var(--gold)" },
  gold: { line: "var(--gold)", accent: "var(--gold)" },
} as const;

export function DecorativeDivider({
  variant = "line",
  tone = "light",
  className,
  delay = 0,
}: DecorativeDividerProps) {
  const prefersReducedMotion = useReducedMotion();
  const colors = toneColors[tone];

  if (prefersReducedMotion) {
    return (
      <div className={cn("flex items-center justify-center gap-3", className)}>
        {variant !== "line" && (
          <span
            className="h-px w-16"
            style={{ backgroundColor: colors.line }}
          />
        )}
        {variant === "diamond" && (
          <span
            className="h-1.5 w-1.5 rotate-45"
            style={{ backgroundColor: colors.accent }}
          />
        )}
        {variant === "dots" && (
          <>
            <span
              className="h-1 w-1 rounded-full"
              style={{ backgroundColor: colors.accent }}
            />
            <span
              className="h-1 w-1 rounded-full"
              style={{ backgroundColor: colors.accent }}
            />
            <span
              className="h-1 w-1 rounded-full"
              style={{ backgroundColor: colors.accent }}
            />
          </>
        )}
        {variant === "ornament" && <SparkleIcon color={colors.accent} />}
        {variant !== "line" && (
          <span
            className="h-px w-16"
            style={{ backgroundColor: colors.line }}
          />
        )}
      </div>
    );
  }

  return (
    <div className={cn("flex items-center justify-center gap-3", className)}>
      {variant !== "line" && (
        <motion.span
          className="h-px w-16"
          style={{ backgroundColor: colors.line, originX: 1 }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
        />
      )}
      {variant === "diamond" && (
        <motion.span
          className="h-1.5 w-1.5 rotate-45"
          style={{ backgroundColor: colors.accent }}
          initial={{ scale: 0, rotate: 0 }}
          whileInView={{ scale: 1, rotate: 45 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
            delay: delay + 0.3,
          }}
        />
      )}
      {variant === "dots" && (
        <>
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-1 w-1 rounded-full"
              style={{ backgroundColor: colors.accent }}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
                delay: delay + i * 0.15,
              }}
            />
          ))}
        </>
      )}
      {variant === "ornament" && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
            delay: delay + 0.3,
          }}
        >
          <SparkleIcon color={colors.accent} />
        </motion.div>
      )}
      {variant !== "line" && (
        <motion.span
          className="h-px w-16"
          style={{ backgroundColor: colors.line, originX: 0 }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
        />
      )}
      {variant === "line" && (
        <motion.span
          className="h-px w-full"
          style={{ backgroundColor: colors.line, originX: 0 }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay }}
        />
      )}
    </div>
  );
}

function SparkleIcon({ color }: { color: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2 L13.5 9.5 L21 11 L13.5 12.5 L12 20 L10.5 12.5 L3 11 L10.5 9.5 Z"
        fill={color}
      />
    </svg>
  );
}
