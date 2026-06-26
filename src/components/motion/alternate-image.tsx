"use client";

/**
 * AlternateImage — crossfade between primary + alternate image on hover.
 *
 * Spec (DESIGN.md → Product Cards hover):
 *   "Alternate image fade"
 *
 * Usage:
 *   <AlternateImage
 *     primary="/product-front.jpg"
 *     alternate="/product-detail.jpg"
 *     alt="Velvet Lounge Chair"
 *   />
 */

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface AlternateImageProps {
  primary: string;
  alternate?: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
}

export function AlternateImage({
  primary,
  alternate,
  alt,
  className,
  containerClassName,
  priority,
}: AlternateImageProps) {
  const prefersReducedMotion = useReducedMotion();
  const hasAlternate = Boolean(alternate);

  return (
    <div
      className={cn(
        "group/alt-img relative overflow-hidden bg-[var(--cream)]",
        containerClassName,
      )}
    >
      {/* Primary image */}
      <Image
        src={primary}
        alt={alt}
        fill
        priority={priority}
        className={cn(
          "object-cover transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
          !prefersReducedMotion &&
            hasAlternate &&
            "group-hover/alt-img:opacity-0",
          !prefersReducedMotion && "group-hover/alt-img:scale-[1.04]",
          className,
        )}
        sizes="(min-width: 1024px) 25vw, 50vw"
      />

      {/* Alternate image — fades in on hover */}
      {hasAlternate && alternate && !prefersReducedMotion && (
        <Image
          src={alternate}
          alt={`${alt} — alternate view`}
          fill
          className={cn(
            "object-cover opacity-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/alt-img:scale-[1.04] group-hover/alt-img:opacity-100",
            className,
          )}
          sizes="(min-width: 1024px) 25vw, 50vw"
        />
      )}

      {/* Subtle gradient overlay for depth on hover */}
      {!prefersReducedMotion && (
        <motion.div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(18,18,18,0.08)] to-transparent opacity-0 transition-opacity duration-500 group-hover/alt-img:opacity-100" />
      )}
    </div>
  );
}
