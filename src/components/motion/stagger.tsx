"use client";

/**
 * Stagger — orchestrate staggered reveal of child elements.
 *
 * <StaggerContainer> wraps <StaggerItem> children. Items animate in sequence
 * with a configurable stagger delay when the container enters viewport.
 *
 * Usage:
 *   <StaggerContainer stagger={0.1}>
 *     <StaggerItem><ProductCard /></StaggerItem>
 *     <StaggerItem><ProductCard /></StaggerItem>
 *     <StaggerItem><ProductCard /></StaggerItem>
 *   </StaggerContainer>
 *
 *   <StaggerContainer variant="fade-up" amount={0.3}>
 *     {items.map(i => <StaggerItem key={i.id}>{i}</StaggerItem>)}
 *   </StaggerContainer>
 */

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode, ElementType } from "react";
import { cn } from "@/lib/utils";
import { luxuryEasing, luxuryDurations } from "@/providers/motion-provider";

type StaggerVariant = "fade" | "fade-up" | "fade-down" | "scale" | "blur";

interface StaggerContainerProps {
  children: ReactNode;
  /** Delay between items (seconds). Default 0.08. */
  stagger?: number;
  /** Initial delay before first item. Default 0. */
  delay?: number;
  /** Viewport amount to trigger. Default 0.2. */
  amount?: number;
  once?: boolean;
  className?: string;
  as?: ElementType;
}

const itemVariants: Record<StaggerVariant, Variants> = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  "fade-up": {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  },
  "fade-down": {
    hidden: { opacity: 0, y: -24 },
    visible: { opacity: 1, y: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1 },
  },
  blur: {
    hidden: { opacity: 0, filter: "blur(10px)" },
    visible: { opacity: 1, filter: "blur(0px)" },
  },
};

export function StaggerContainer({
  children,
  stagger = 0.08,
  delay = 0,
  amount = 0.2,
  once = true,
  className,
  as = "div",
}: StaggerContainerProps) {
  const prefersReducedMotion = useReducedMotion();
  const MotionTag = motion[as as "div"];

  return (
    <MotionTag
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount, margin: "-60px 0px -60px 0px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: prefersReducedMotion ? 0 : stagger,
            delayChildren: delay,
          },
        },
      }}
    >
      {children}
    </MotionTag>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  variant?: StaggerVariant;
  className?: string;
  as?: ElementType;
}

export function StaggerItem({
  children,
  variant = "fade-up",
  className,
  as = "div",
}: StaggerItemProps) {
  const prefersReducedMotion = useReducedMotion();
  const MotionTag = motion[as as "div"];
  const variants = prefersReducedMotion
    ? itemVariants.fade
    : itemVariants[variant];

  return (
    <MotionTag
      className={cn(className)}
      variants={variants}
      transition={{
        duration: luxuryDurations.slow,
        ease: luxuryEasing,
      }}
    >
      {children}
    </MotionTag>
  );
}
