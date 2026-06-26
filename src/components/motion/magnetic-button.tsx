"use client";

/**
 * MagneticButton — wraps children with subtle magnetic hover effect.
 *
 * The element drifts toward the cursor within a constrained radius.
 * On mouse leave, it springs back to origin. Signature Awwwards micro-interaction.
 *
 * Spec (DESIGN.md): Subtle easing, never chaotic. Magnetic radius is small (max 12px).
 *
 * Usage:
 *   <MagneticButton>
 *     <button className="btn-primary">Shop Now</button>
 *   </MagneticButton>
 *
 *   <MagneticButton strength={0.4} radius={80}>
 *     <Link href="/shop">Browse Collection</Link>
 *   </MagneticButton>
 */

import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";
import { useRef, type ReactNode, type MouseEvent } from "react";
import { luxurySprings } from "@/providers/motion-provider";

interface MagneticButtonProps {
  children: ReactNode;
  /** 0-1 — how strongly the element follows the cursor. Default 0.3. */
  strength?: number;
  /** Max pixel offset from origin. Default 14. */
  radius?: number;
  className?: string;
}

export function MagneticButton({
  children,
  strength = 0.3,
  radius = 14,
  className,
}: MagneticButtonProps) {
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
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}
