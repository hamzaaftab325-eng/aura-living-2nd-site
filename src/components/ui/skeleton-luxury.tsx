/**
 * SkeletonLuxury — shimmer skeleton loaders for loading states.
 *
 * Spec (DESIGN.md → Page Loading):
 *   - Skeleton loading
 *
 * Variants:
 *   - <SkeletonImage />   — product image placeholder
 *   - <SkeletonText />    — text line placeholder (configurable lines)
 *   - <SkeletonCard />    — full product card skeleton
 *   - <SkeletonLine />    — generic line
 *   - <SkeletonGrid />    — grid of card skeletons
 *
 * Usage:
 *   <SkeletonCard />
 *   <SkeletonText lines={3} />
 *   <SkeletonImage aspect="editorial" />
 */

import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function SkeletonLine({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "shimmer h-3 w-full rounded-[0.125rem] bg-[var(--cream)]",
        className,
      )}
    />
  );
}

interface SkeletonTextProps {
  lines?: number;
  className?: string;
}

export function SkeletonText({ lines = 3, className }: SkeletonTextProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <SkeletonLine
          key={i}
          className={i === lines - 1 ? "w-3/4" : "w-full"}
        />
      ))}
    </div>
  );
}

interface SkeletonImageProps {
  aspect?: "product" | "editorial" | "lookbook" | "square";
  className?: string;
}

const aspectClasses = {
  product: "aspect-product",
  editorial: "aspect-editorial",
  lookbook: "aspect-lookbook",
  square: "aspect-square",
} as const;

export function SkeletonImage({
  aspect = "product",
  className,
}: SkeletonImageProps) {
  return (
    <div
      className={cn(
        "shimmer bg-[var(--cream)]",
        aspectClasses[aspect],
        className,
      )}
    />
  );
}

export function SkeletonCard({ className }: SkeletonProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <SkeletonImage aspect="product" />
      <div className="flex flex-col gap-2">
        <SkeletonLine className="h-3 w-1/3" />
        <SkeletonLine className="h-4 w-3/4" />
        <SkeletonLine className="h-4 w-1/4" />
      </div>
    </div>
  );
}

interface SkeletonGridProps {
  count?: number;
  className?: string;
}

export function SkeletonGrid({ count = 8, className }: SkeletonGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4",
        className,
      )}
    >
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
