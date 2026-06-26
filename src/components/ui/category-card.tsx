"use client";

/**
 * CategoryCard — luxury category showcase tile.
 * Refined: square aspect, stronger gradient, cleaner text overlay.
 */

import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "motion/react";
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
        "group relative block overflow-hidden bg-[var(--ink)]",
        className,
      )}
    >
      {/* Square aspect — cleaner grid rhythm */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className={cn(
            "object-cover opacity-90 transition-all duration-[1.5s] ease-[cubic-bezier(0.22,1,0.36,1)]",
            !prefersReducedMotion &&
              "group-hover:scale-[1.08] group-hover:opacity-100",
          )}
        />
        {/* Stronger gradient for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(18,18,18,0.85)] via-[rgba(18,18,18,0.2)] to-[rgba(18,18,18,0.1)]" />

        {/* Arrow icon — top right */}
        <div className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 opacity-0 backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:bg-white/90 group-hover:opacity-100">
          <ArrowUpRight
            className="h-3.5 w-3.5 text-[var(--ink)] transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={1.5}
          />
        </div>

        {/* Text overlay — bottom left */}
        <div className="absolute inset-x-0 bottom-0 p-5">
          <p className="text-[0.625rem] font-semibold tracking-[0.15em] text-[var(--gold)] uppercase">
            {count} {count === 1 ? "piece" : "pieces"}
          </p>
          <h3 className="text-headline-sm mt-1 leading-tight font-medium text-white">
            {name}
          </h3>
          {/* Gold accent line — draws in on hover */}
          <div className="mt-3 h-px w-0 bg-[var(--gold)] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-16" />
        </div>
      </div>
    </Link>
  );
}
