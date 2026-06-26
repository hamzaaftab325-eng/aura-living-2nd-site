"use client";

/**
 * TestimonialCard — luxury testimonial / client quote.
 *
 * Spec: Editorial. Large Playfair Display quote mark, italic body, author
 * attribution with role. Subtle hover lift + gold border glow.
 *
 * Usage:
 *   <TestimonialCard
 *     quote="Aura Living transformed our home into a sanctuary..."
 *     author="Ayesha Khan"
 *     role="Interior Designer, Lahore"
 *     rating={5}
 *   />
 */

import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  rating?: number;
  className?: string;
}

export function TestimonialCard({
  quote,
  author,
  role,
  rating = 5,
  className,
}: TestimonialCardProps) {
  return (
    <motion.figure
      whileHover={{ y: -4 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group relative flex h-full flex-col gap-6 border border-[var(--line)] bg-[var(--cream)] p-10 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-[var(--gold)] hover:bg-white hover:shadow-[0_24px_60px_rgba(18,18,18,0.06)]",
        className,
      )}
    >
      {/* Decorative quote mark */}
      <Quote
        className="h-10 w-10 text-[var(--gold)]"
        strokeWidth={0.75}
        aria-hidden
      />

      {/* Star rating */}
      <div className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              "h-3.5 w-3.5 transition-colors duration-500",
              i < rating
                ? "fill-[var(--gold)] text-[var(--gold)]"
                : "text-[var(--line)]",
            )}
            strokeWidth={1}
            aria-hidden
          />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="text-body-lg flex-1 leading-relaxed font-normal text-[var(--ink)]">
        &ldquo;{quote}&rdquo;
      </blockquote>

      {/* Author */}
      <figcaption className="flex flex-col gap-0.5 border-t border-[var(--line)] pt-6">
        <span className="text-headline-sm font-medium text-[var(--ink)]">
          {author}
        </span>
        <span className="label-caps text-[var(--muted)]">{role}</span>
      </figcaption>
    </motion.figure>
  );
}
