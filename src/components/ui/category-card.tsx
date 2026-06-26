"use client";

/**
 * CategoryCard — luxury category showcase tile.
 *
 * Image fills the card; on hover the image scales subtly + a gold accent
 * line draws across the bottom + an arrow icon slides in from the right.
 * Text is overlaid at the bottom in Playfair Display.
 *
 * Usage:
 *   <CategoryCard
 *     name="Lighting"
 *     count={42}
 *     image="/lighting.jpg"
 *     href="/shop/lighting"
 *   />
 */

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CategoryCardProps {
  name: string;
  count: number;
  image: string;
  href: string;
  className?: string;
  priority?: boolean;
}

export function CategoryCard({
  name,
  count,
  image,
  href,
  className,
  priority,
}: CategoryCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Link
      href={href}
      className={cn(
        "group relative block overflow-hidden bg-[var(--cream)]",
        className,
      )}
    >
      {/* Image with subtle zoom on hover */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className={cn(
            "object-cover transition-all duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)]",
            !prefersReducedMotion && "group-hover:scale-[1.06]",
          )}
        />
        {/* Dark gradient overlay for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(18,18,18,0.7)] via-[rgba(18,18,18,0.15)] to-transparent" />

        {/* Arrow icon — slides in from right on hover */}
        <motion.div
          className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur-md"
          initial={false}
          whileHover={{ scale: 1.05 }}
        >
          <ArrowUpRight
            className="h-4 w-4 text-[var(--ink)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={1.25}
          />
        </motion.div>

        {/* Text overlay */}
        <div className="absolute inset-x-0 bottom-0 p-6">
          <p className="label-caps text-white/70">{count} pieces</p>
          <h3 className="text-headline-sm mt-1 font-medium text-white">
            {name}
          </h3>

          {/* Gold accent line — draws in on hover */}
          <div className="mt-3 h-px w-0 bg-[var(--gold)] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-12" />
        </div>
      </div>
    </Link>
  );
}
