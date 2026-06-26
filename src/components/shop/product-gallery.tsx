"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * ProductGallery — image gallery with thumbnails + zoom on hover.
 * Client component — handles image selection state.
 */
export function ProductGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const imagesList =
    images.length > 0
      ? images
      : [
          "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=900&q=80",
        ];

  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <div className="relative aspect-square overflow-hidden bg-[var(--cream)]">
        <Image
          src={imagesList[activeIndex] ?? imagesList[0]!}
          alt={alt}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.06]"
        />
      </div>

      {/* Thumbnails */}
      {imagesList.length > 1 && (
        <div className="flex gap-3">
          {imagesList.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={cn(
                "relative aspect-square w-20 shrink-0 overflow-hidden border-2 transition-colors duration-300",
                i === activeIndex
                  ? "border-[var(--ink)]"
                  : "border-transparent opacity-60 hover:opacity-100",
              )}
              aria-label={`View image ${i + 1}`}
            >
              <Image
                src={img}
                alt={`${alt} — view ${i + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
