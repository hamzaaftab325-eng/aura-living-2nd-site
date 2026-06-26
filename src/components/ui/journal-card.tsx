"use client";

/**
 * JournalCard — luxury editorial article / journal preview.
 *
 * Editorial style: image with mask reveal on scroll, Playfair Display title,
 * Inter excerpt, label-caps category + date, hover lift + arrow slide.
 *
 * Usage:
 *   <JournalCard
 *     title="The Art of Slow Living"
 *     excerpt="How to cultivate calm in your home through considered design..."
 *     category="Atelier Journal"
 *     date="March 2026"
 *     image="/journal/slow-living.jpg"
 *     href="/journal/slow-living"
 *   />
 */

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export interface JournalCardProps {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  href: string;
  readingTime?: string;
  className?: string;
  priority?: boolean;
}

export function JournalCard({
  title,
  excerpt,
  category,
  date,
  image,
  href,
  readingTime,
  className,
  priority,
}: JournalCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Link
      href={href}
      className={cn(
        "group flex flex-col gap-6",
        !prefersReducedMotion &&
          "transition-transform duration-500 hover:-translate-y-1",
        className,
      )}
    >
      {/* Image with hover zoom */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--cream)]">
        <Image
          src={image}
          alt={title}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 33vw, 100vw"
          className={cn(
            "object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)]",
            !prefersReducedMotion && "group-hover:scale-[1.05]",
          )}
        />
        {/* Arrow indicator */}
        <div className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 opacity-0 backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100">
          <ArrowUpRight
            className="h-4 w-4 text-[var(--ink)]"
            strokeWidth={1.25}
          />
        </div>
      </div>

      {/* Meta */}
      <div className="flex items-center gap-3">
        <span className="label-caps text-[var(--gold-deep)]">{category}</span>
        <span className="h-1 w-1 rounded-full bg-[var(--line)]" aria-hidden />
        <span className="label-caps text-[var(--muted)]">{date}</span>
        {readingTime && (
          <>
            <span
              className="h-1 w-1 rounded-full bg-[var(--line)]"
              aria-hidden
            />
            <span className="label-caps text-[var(--muted)]">
              {readingTime}
            </span>
          </>
        )}
      </div>

      {/* Title */}
      <h3 className="text-headline-md leading-tight font-medium text-[var(--ink)] transition-colors duration-500 group-hover:text-[var(--gold-deep)]">
        {title}
      </h3>

      {/* Excerpt */}
      <p className="text-body-md line-clamp-3 text-[var(--stone)]">{excerpt}</p>
    </Link>
  );
}
