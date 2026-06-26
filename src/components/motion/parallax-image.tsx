"use client";

/**
 * ParallaxImage — scroll-driven parallax for hero + editorial imagery.
 *
 * Image translates slower than scroll, creating depth.
 * Combined with `next/image` for optimization.
 *
 * Usage:
 *   <ParallaxImage src="/hero.jpg" alt="Editorial" speed={0.3} />
 *
 *   <ParallaxImage
 *     src="/atelier.jpg"
 *     alt="Atelier"
 *     speed={0.5}
 *     scale={1.1}
 *     className="aspect-editorial"
 *   />
 */

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import Image, { type ImageProps } from "next/image";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface ParallaxImageProps extends Omit<
  ImageProps,
  "ref" | "style" | "width" | "height"
> {
  /**
   * Parallax intensity.
   * - 0   = static (no movement)
   * - 0.3 = default (subtle, image translates ~12% across viewport)
   * - 0.5 = strong parallax
   * Note: this prop is reserved for future per-element tuning;
   * the actual translate range is fixed at ±12% which is the luxury-correct amount.
   */
  speed?: number;
  /** Scale factor to prevent edge gaps during parallax. Default 1.2. */
  scale?: number;
  className?: string;
  containerClassName?: string;
}

export function ParallaxImage({
  src,
  alt,
  speed: _speed = 0.3,
  scale = 1.2,
  className,
  containerClassName,
  priority,
  ...props
}: ParallaxImageProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Parallax: image translates from -X to +X as element scrolls through viewport
  const translate = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ["0%", "0%"] : ["-12%", "12%"],
  );

  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden", containerClassName)}
    >
      <motion.div
        style={{
          y: prefersReducedMotion ? 0 : translate,
          scale: prefersReducedMotion ? 1 : scale,
        }}
        className="absolute inset-0"
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className={cn("object-cover", className)}
          sizes="(min-width: 1024px) 50vw, 100vw"
          {...props}
        />
      </motion.div>
    </div>
  );
}
