"use client";

/**
 * InstagramGrid — social proof grid of lifestyle imagery.
 *
 * Editorial 5-column grid (with one tall featured cell), hover reveals a
 * follow CTA overlay. Drives traffic to @auraliving.pk Instagram.
 *
 * Usage:
 *   <InstagramGrid handle="auraliving.pk" images={[...]} />
 */

import Image from "next/image";
import Link from "next/link";
import { Instagram, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

export interface InstagramGridProps {
  handle: string;
  href?: string;
  images: string[];
  className?: string;
}

export function InstagramGrid({
  handle,
  href = "https://instagram.com/auraliving.pk",
  images,
  className,
}: InstagramGridProps) {
  // Display only first 5 images in editorial grid layout
  const displayImages = images.slice(0, 5);

  return (
    <div className={cn("flex flex-col gap-10", className)}>
      {/* Header */}
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="flex items-center gap-3">
          <Instagram className="h-5 w-5 text-[var(--ink)]" strokeWidth={1} />
          <span className="label-caps text-[var(--muted)]">@{handle}</span>
        </div>
        <h2 className="text-headline-md font-medium text-[var(--ink)]">
          Follow the atelier
        </h2>
      </div>

      {/* Grid — 5 cells, first one is tall (spans 2 rows) */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5">
        {displayImages.map((image, i) => {
          // First image takes 2 columns on desktop, others take 1
          const isFeatured = i === 0;
          return (
            <Link
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "group relative aspect-square overflow-hidden bg-[var(--cream)]",
                isFeatured && "col-span-2 row-span-2 aspect-square",
              )}
            >
              <Image
                src={image}
                alt={`Aura Living on Instagram — post ${i + 1}`}
                fill
                sizes="(min-width: 1024px) 20vw, 50vw"
                className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-[rgba(18,18,18,0.4)] opacity-0 backdrop-blur-[2px] transition-opacity duration-500 group-hover:opacity-100">
                <div className="flex flex-col items-center gap-2 text-white">
                  <Heart
                    className="h-6 w-6 fill-white"
                    strokeWidth={0}
                    aria-hidden
                  />
                  <span className="label-caps">View Post</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
