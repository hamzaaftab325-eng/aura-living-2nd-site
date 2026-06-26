"use client";

/**
 * ImageSpotlight — mouse-follow spotlight on images.
 *
 * A radial gradient follows the cursor across the image, creating a "spotlight"
 * effect that highlights where the user is looking. Subtle, premium.
 *
 * Spec (DESIGN.md → Product Image Effects):
 *   "Hover zoom, Alternate image crossfade, Mouse-follow spotlight"
 *
 * Usage:
 *   <ImageSpotlight src="/product.jpg" alt="Product" />
 *
 *   <ImageSpotlight
 *     src="/hero.jpg"
 *     alt="Hero"
 *     spotlightColor="rgba(212, 175, 55, 0.15)"
 *     spotlightSize={300}
 *   />
 */

import Image, { type ImageProps } from "next/image";
import {
  motion,
  useMotionValue,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { useRef, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

interface ImageSpotlightProps extends Omit<ImageProps, "ref" | "style"> {
  /** Spotlight color (rgba). Default subtle white. */
  spotlightColor?: string;
  /** Spotlight radius in px. Default 250. */
  spotlightSize?: number;
  className?: string;
  containerClassName?: string;
}

export function ImageSpotlight({
  src,
  alt,
  spotlightColor = "rgba(255, 255, 255, 0.18)",
  spotlightSize = 250,
  className,
  containerClassName,
  priority,
  ...props
}: ImageSpotlightProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);

  // Compute spotlight background from motion values — must be called unconditionally
  const spotlightBg = useTransform(
    [mouseX, mouseY],
    ([x, y]: number[]) =>
      `radial-gradient(circle at ${x}% ${y}%, ${spotlightColor}, transparent ${spotlightSize}px)`,
  );

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (prefersReducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(((e.clientX - rect.left) / rect.width) * 100);
    mouseY.set(((e.clientY - rect.top) / rect.height) * 100);
  }

  return (
    <div
      ref={ref}
      className={cn(
        "group/spotlight relative overflow-hidden",
        containerClassName,
      )}
      onMouseMove={handleMouseMove}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className={cn(
          "object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/spotlight:scale-[1.04]",
          className,
        )}
        sizes="(min-width: 1024px) 50vw, 100vw"
        {...props}
      />

      {/* Spotlight overlay — only visible on hover */}
      {!prefersReducedMotion && (
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/spotlight:opacity-100"
          style={{ background: spotlightBg }}
        />
      )}
    </div>
  );
}
