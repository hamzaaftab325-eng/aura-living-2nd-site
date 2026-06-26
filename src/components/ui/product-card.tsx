"use client";

/**
 * ProductCard — luxury card for product grids.
 *
 * Spec (DESIGN.md → Product Cards):
 *   - Minimalist design: image occupies 85% of card
 *   - Text is left-aligned below
 *   - Playfair Display for product name, Inter for price
 *   - No borders; soft shadow on hover
 *   - Hover: image zoom (1.04), soft-ambient shadow, quick-add button slides up
 *   - Wishlist heart toggle (top-right)
 *   - Badge support (New, Bestseller, Limited)
 *
 * Usage:
 *   <ProductCard
 *     name="Lumen Pendant Light"
 *     price={45000}
 *     image="/lumen.jpg"
 *     badge="New"
 *     onAddToCart={() => ...}
 *   />
 */

import Image from "next/image";
import { motion } from "motion/react";
import { Heart, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { brand } from "@/config/brand";

export interface ProductCardProps {
  name: string;
  price: number;
  currency?: string;
  image: string;
  imageAlt?: string;
  badge?: "New" | "Bestseller" | "Limited" | "Sale";
  category?: string;
  onAddToCart?: () => void;
  onWishlistToggle?: (wished: boolean) => void;
  onClick?: () => void;
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
  imageAlt = "",
  badge,
  category,
  onAddToCart,
  onWishlistToggle,
  onClick,
  className,
  priority,
}: ProductCardProps) {
  const [wished, setWished] = useState(false);

  function handleWishlist() {
    const next = !wished;
    setWished(next);
    onWishlistToggle?.(next);
  }

  return (
    <motion.article
      onClick={onClick}
      whileHover="hover"
      className={cn("group relative flex cursor-pointer flex-col", className)}
    >
      {/* Image area — 85% of card */}
      <div className="aspect-product relative overflow-hidden bg-[var(--cream)]">
        <Image
          src={image}
          alt={imageAlt || name}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        />

        {/* Badge */}
        {badge && (
          <span
            className={cn(
              "label-caps absolute top-4 left-4 px-3 py-1.5 text-[0.625rem] tracking-[0.12em]",
              badgeStyles[badge],
            )}
          >
            {badge}
          </span>
        )}

        {/* Wishlist heart */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleWishlist();
          }}
          className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 backdrop-blur-md transition-all duration-300 hover:bg-white"
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wished}
        >
          <Heart
            className={cn(
              "h-4 w-4 transition-all duration-300",
              wished
                ? "fill-[var(--gold)] text-[var(--gold)]"
                : "text-[var(--ink)]",
            )}
            strokeWidth={1.25}
          />
        </button>

        {/* Quick-add button — slides up on hover */}
        <motion.div
          className="absolute inset-x-4 bottom-4"
          initial={{ y: 20, opacity: 0 }}
          variants={{
            hover: { y: 0, opacity: 1 },
          }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart?.();
            }}
            className="flex w-full items-center justify-center gap-2 bg-[var(--gold)] py-3 text-[0.6875rem] font-semibold tracking-[0.12em] text-[var(--ink)] uppercase transition-colors duration-300 hover:bg-[var(--gold-soft)]"
          >
            <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
            Add to Cart
          </button>
        </motion.div>
      </div>

      {/* Text — left-aligned below image */}
      <div className="mt-4 flex flex-col gap-1">
        {category && (
          <span className="label-caps text-[var(--muted)]">{category}</span>
        )}
        <h3 className="text-headline-sm leading-tight font-medium text-[var(--ink)] transition-colors duration-300 group-hover:text-[var(--gold-deep)]">
          {name}
        </h3>
        <p className="text-body-md font-medium text-[var(--ink)]/80">
          {formatPrice(price, currency)}
        </p>
      </div>
    </motion.article>
  );
}
