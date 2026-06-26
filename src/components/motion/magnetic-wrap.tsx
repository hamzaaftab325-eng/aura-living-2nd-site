"use client";

/**
 * MagneticWrap — wraps ANY element with magnetic hover effect.
 *
 * Unlike the old MagneticButton, this works on ANY child (links, divs, icons,
 * images). The wrapped element drifts toward the cursor on hover.
 *
 * Spec (DESIGN.md → Cursor Effects → Magnetic buttons):
 *   "Magnetic buttons, Card tilt, Image spotlight, Cursor glow, Image parallax"
 *
 * Usage:
 *   <MagneticWrap strength={0.3} radius={14}>
 *     <Button>Shop Now</Button>
 *   </MagneticWrap>
 *
 *   <MagneticWrap strength={0.2}>
 *     <a href="/shop" data-cursor="text" data-cursor-text="View">Browse</a>
 *   </MagneticWrap>
 */

import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";
import { useRef, type ReactNode, type MouseEvent } from "react";
import { cn } from "@/lib/utils";
import { luxurySprings } from "@/providers/motion-provider";

interface MagneticWrapProps {
  children: ReactNode;
  /** 0-1 — how strongly the element follows the cursor. Default 0.3. */
  strength?: number;
  /** Max pixel offset from origin. Default 14. */
  radius?: number;
  className?: string;
}

export function MagneticWrap({
  children,
  strength = 0.3,
  radius = 14,
  className,
}: MagneticWrapProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, luxurySprings.gentle);
  const springY = useSpring(y, luxurySprings.gentle);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (prefersReducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    const constrainedX = Math.max(-radius, Math.min(radius, relX * strength));
    const constrainedY = Math.max(-radius, Math.min(radius, relY * strength));
    x.set(constrainedX);
    y.set(constrainedY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={cn("inline-block", className)}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}
