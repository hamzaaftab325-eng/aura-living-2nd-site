"use client";

/**
 * Tilt — subtle 3D tilt on hover for product cards + featured items.
 *
 * Uses perspective + rotateX/rotateY based on cursor position.
 * Springs back to flat on mouse leave. Configurable intensity.
 *
 * Spec: Luxury = subtle. Max tilt 6 degrees. Spring-back, not snap.
 *
 * Usage:
 *   <Tilt>
 *     <ProductCard />
 *   </Tilt>
 *
 *   <Tilt max={8} scale={1.04} glare>
 *     <FeaturedItem />
 *   </Tilt>
 */

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { useRef, type ReactNode, type MouseEvent } from "react";
import { cn } from "@/lib/utils";
import { luxurySprings } from "@/providers/motion-provider";

interface TiltProps {
  children: ReactNode;
  /** Max tilt angle in degrees. Default 6. */
  max?: number;
  /** Scale on hover. Default 1.02. */
  scale?: number;
  /** Show glare effect. Default false. */
  glare?: boolean;
  className?: string;
}

export function Tilt({
  children,
  max = 6,
  scale = 1.02,
  glare = false,
  className,
}: TiltProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0.5); // 0-1 cursor position
  const y = useMotionValue(0.5);

  const rotateX = useSpring(
    useTransform(y, [0, 1], [max, -max]),
    luxurySprings.gentle,
  );
  const rotateY = useSpring(
    useTransform(x, [0, 1], [-max, max]),
    luxurySprings.gentle,
  );
  const motionScale = useSpring(scale, luxurySprings.gentle);

  const glareX = useTransform(x, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(y, [0, 1], ["0%", "100%"]);
  const glareBg = useTransform(
    [glareX, glareY],
    ([gx, gy]: string[]) =>
      `radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.18), transparent 60%)`,
  );

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (prefersReducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
    motionScale.set(scale);
  }

  function handleMouseLeave() {
    x.set(0.5);
    y.set(0.5);
    motionScale.set(1);
  }

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={cn("relative [perspective:1000px]", className)}
      style={{
        rotateX,
        rotateY,
        scale: motionScale,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {glare && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 [.group:hover_&]:opacity-100"
          style={{ background: glareBg }}
        />
      )}
    </motion.div>
  );
}
