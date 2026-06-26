"use client";

/**
 * Counter — animated number counter triggered on scroll into view.
 *
 * Uses Motion's `useMotionValue` + `animate` for buttery count-up.
 * Respects reduced motion (renders final value immediately).
 *
 * Usage:
 *   <Counter value={1247} />
 *   <Counter value={98} suffix="%" />
 *   <Counter value={3.5} decimals={1} prefix="$" suffix="M" />
 *   <Counter value={25000} prefix="₨" duration={2.4} />
 */

import {
  motion,
  useInView,
  useMotionValue,
  animate as motionAnimate,
  useReducedMotion,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface CounterProps {
  value: number;
  /** Animation duration in seconds. Default 2. */
  duration?: number;
  /** Number of decimal places. Default 0. */
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function Counter({
  value,
  duration = 2,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
}: CounterProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const motionValue = useMotionValue(0);
  const initialValue = prefersReducedMotion ? value.toFixed(decimals) : "0";
  const [display, setDisplay] = useState(initialValue);

  useEffect(() => {
    if (!inView) return;

    if (prefersReducedMotion) {
      // Already set via initial state — no need to setState here.
      return;
    }

    const controls = motionAnimate(motionValue, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        setDisplay(latest.toFixed(decimals));
      },
    });

    return () => controls.stop();
  }, [inView, value, duration, decimals, prefersReducedMotion, motionValue]);

  // Format with thousands separator
  const formatNumber = (str: string) => {
    if (decimals === 0) {
      return Number(str).toLocaleString("en-US");
    }
    const [intPart, decPart] = str.split(".");
    return `${Number(intPart).toLocaleString("en-US")}.${decPart}`;
  };

  return (
    <motion.span
      ref={ref}
      className={cn("tabular-nums", className)}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.4 }}
    >
      {prefix}
      {formatNumber(display)}
      {suffix}
    </motion.span>
  );
}
