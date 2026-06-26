"use client";

/**
 * ProductCard — luxury card for product grids.
 * Refined: cleaner image area, better text hierarchy, subtle hover.
 */

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Heart, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { brand } from "@/config/brand";
import { playSound, soundsEnabled } from "@/lib/sound";

export interface ProductCardProps {
  name: string;
  price: number;
  currency?: string;
  image: string;
  alternateImage?: string;
  imageAlt?: string;
  badge?: "New" | "Bestseller" | "Limited" | "Sale";
  category?: string;
  href?: string;
  onAddToCart?: () => void;
  onWishlistToggle?: (wished: boolean) => void;
  onQuickView?: () => void;
  className?: string;
  priority?: boolean;
}

const badgeStyles = {
  New: "bg-[var(--ink)] text-white",
  Bestseller: "bg-[var(--gold)] text-[var(--ink)]",
  Limited:
    "bg-[var(--cream-warm)] text-[var(--ink)] border border-[var(--gold)]",
  Sale: "bg-[var(--destructive)] text-white",
};

function formatPrice(amount: number, currency: string) {
  if (currency === "PKR") {
    return `${brand.currency.symbol}${amount.toLocaleString("en-PK")}`;
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function ProductCard({
  name,
  price,
  currency = brand.currency.code,
  image,
  alternateImage,
  imageAlt = "",
  badge,
  category,
  href,
  onAddToCart,
  onWishlistToggle,
  onQuickView,
  className,
  priority,
}: ProductCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const [wished, setWished] = useState(false);

  function handleWishlist(e: React.MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    const next = !wished;
    setWished(next);
    onWishlistToggle?.(next);
  }

  function handleAddToCart(e: React.MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    if (soundsEnabled()) playSound("addToCart");
    onAddToCart?.();
  }

  function handleQuickView(e: React.MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    onQuickView?.();
  }

  return (
    <motion.article
      whileHover="hover"
      className={cn("group relative flex cursor-pointer flex-col", className)}
    >
      {/* Link wrapper for navigation */}
      {href && (
        <a
          href={href}
          className="absolute inset-0 z-10"
          aria-label={`View ${name}`}
        />
      )}

      {/* Image area — 4:5 aspect ratio */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[var(--cream)]">
        {/* Primary image */}
        <Image
          src={image}
          alt={imageAlt || name}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className={cn(
            "object-cover transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]",
            !prefersReducedMotion && "group-hover:scale-[1.05]",
            !prefersReducedMotion && alternateImage && "group-hover:opacity-0",
          )}
        />

        {/* Alternate image — fades in on hover */}
        {alternateImage && !prefersReducedMotion && (
          <Image
            src={alternateImage}
            alt={`${imageAlt || name} — alternate view`}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover opacity-0 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05] group-hover:opacity-100"
          />
        )}

        {/* Badge */}
        {badge && (
          <span
            className={cn(
              "absolute top-3 left-3 px-2.5 py-1 text-[0.625rem] font-semibold tracking-[0.12em] uppercase",
              badgeStyles[badge],
            )}
          >
            {badge}
          </span>
        )}

        {/* Wishlist heart */}
        <button
          type="button"
          onClick={handleWishlist}
          className="absolute top-3 right-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 backdrop-blur-md transition-all duration-500 hover:bg-white"
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wished}
        >
          <motion.div
            animate={
              prefersReducedMotion ? {} : wished ? { scale: [1, 1.2, 1] } : {}
            }
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Heart
              className={cn(
                "h-3.5 w-3.5 transition-colors duration-500",
                wished
                  ? "fill-[var(--gold)] text-[var(--gold)]"
                  : "text-[var(--ink)]",
              )}
              strokeWidth={1.25}
            />
          </motion.div>
        </button>

        {/* Add to Cart — slides up on hover */}
        <motion.div
          className="absolute inset-x-3 bottom-3 z-20"
          initial={
            prefersReducedMotion ? { opacity: 1, y: 0 } : { y: 20, opacity: 0 }
          }
          variants={prefersReducedMotion ? {} : { hover: { y: 0, opacity: 1 } }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        >
          <button
            type="button"
            onClick={handleAddToCart}
            className="flex w-full items-center justify-center gap-2 bg-[var(--gold)] py-2.5 text-[0.625rem] font-semibold tracking-[0.12em] text-[var(--ink)] uppercase transition-all duration-300 hover:bg-[var(--gold-soft)]"
          >
            <Plus className="h-3 w-3" strokeWidth={1.5} />
            Add to Cart
          </button>
        </motion.div>
      </div>

      {/* Text — left-aligned, clear hierarchy */}
      <div className="mt-3 flex flex-col gap-0.5">
        {category && (
          <span className="text-[0.625rem] font-semibold tracking-[0.12em] text-[var(--muted)] uppercase">
            {category}
          </span>
        )}
        <h3 className="text-[0.95rem] leading-snug font-medium text-[var(--ink)] transition-colors duration-500 group-hover:text-[var(--gold-deep)]">
          {name}
        </h3>
        <p className="text-[0.875rem] font-medium text-[var(--ink)]/70">
          {formatPrice(price, currency)}
        </p>
      </div>
    </motion.article>
  );
}
