"use client";

/**
 * ImageReveal — cinematic image entrance with clip-path mask + blur.
 *
 * Image starts hidden via clip-path (inset 0 100% 0 0 — fully clipped from right),
 * then reveals left-to-right as it enters viewport. Combined with a subtle scale
 * and blur resolve for editorial polish.
 *
 * Usage:
 *   <ImageReveal src="/hero.jpg" alt="Hero" />
 *   <ImageReveal src="/atelier.jpg" alt="Atelier" direction="right" delay={0.2} />
 *   <ImageReveal src="/product.jpg" alt="Product" duration={1.2} priority />
 */

import Image, { type ImageProps } from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { luxuryEasing } from "@/providers/motion-provider";

interface ImageRevealProps extends Omit<ImageProps, "ref" | "style"> {
  /** Direction the mask reveals from. Default "right" (clip from right, reveal leftward). */
  direction?: "right" | "left" | "up" | "down";
  delay?: number;
  duration?: number;
  amount?: number;
  once?: boolean;
  className?: string;
  containerClassName?: string;
}

const clipMap = {
  right: "inset(0 100% 0 0)", // clipped on right side, reveals leftward
  left: "inset(0 0 0 100%)", // clipped on left side, reveals rightward
  up: "inset(100% 0 0 0)", // clipped on bottom, reveals upward
  down: "inset(0 0 100% 0)", // clipped on top, reveals downward
} as const;

export function ImageReveal({
  src,
  alt,
  direction = "right",
  delay = 0,
  duration = 1.1,
  amount = 0.2,
  once = true,
  className,
  containerClassName,
  priority,
  ...props
}: ImageRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div className={cn("relative overflow-hidden", containerClassName)}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className={cn("object-cover", className)}
          sizes="(min-width: 1024px) 50vw, 100vw"
          {...props}
        />
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      <motion.div
        className="absolute inset-0"
        initial={{ clipPath: clipMap[direction] }}
        whileInView={{ clipPath: "inset(0 0 0 0)" }}
        viewport={{ once, amount, margin: "-60px 0px -60px 0px" }}
        transition={{
          duration,
          ease: luxuryEasing,
          delay,
        }}
      >
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.15, filter: "blur(12px)" }}
          whileInView={{ scale: 1, filter: "blur(0px)" }}
          viewport={{ once, amount, margin: "-60px 0px -60px 0px" }}
          transition={{
            duration: duration + 0.2,
            ease: luxuryEasing,
            delay,
          }}
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
      </motion.div>
    </div>
  );
}
