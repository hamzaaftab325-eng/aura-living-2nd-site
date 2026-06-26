"use client";

/**
 * ProductCard — luxury card for product grids.
 *
 * Spec (DESIGN.md → Product Cards):
 *   - Minimalist design: image occupies 85% of card
 *   - Hover: image zoom (1.04), soft-ambient shadow, quick-add slides up
 *   - Alternate image fade (NEW)
 *   - Mouse-follow spotlight (NEW)
 *   - Wishlist heart toggle (top-right)
 *   - Badge support (New, Bestseller, Limited, Sale)
 *   - Sound on add to cart (NEW — subtle, off by default)
 *
 * Usage:
 *   <ProductCard
 *     name="Lumen Pendant Light"
 *     price={45000}
 *     image="/lumen.jpg"
 *     alternateImage="/lumen-detail.jpg"  // NEW — optional alt image
 *     badge="New"
 *     onAddToCart={() => ...}
 *   />
 */

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Heart, Plus, Eye } from "lucide-react";
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
    const next = !wished;
    setWished(next);
    onWishlistToggle?.(next);
  }

  function handleAddToCart(e: React.MouseEvent) {
    e.stopPropagation();
    if (soundsEnabled()) playSound("addToCart");
    onAddToCart?.();
  }

  function handleQuickView(e: React.MouseEvent) {
    e.stopPropagation();
    onQuickView?.();
  }

  return (
    <motion.article
      whileHover="hover"
      data-cursor="view"
      data-cursor-text="View"
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
      {/* Image area — 85% of card */}
      <div className="aspect-product relative overflow-hidden bg-[var(--cream)]">
        {/* Primary image */}
        <Image
          src={image}
          alt={imageAlt || name}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className={cn(
            "object-cover transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
            !prefersReducedMotion && "group-hover:scale-[1.04]",
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
            className="object-cover opacity-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] group-hover:opacity-100"
          />
        )}

        {/* Mouse-follow spotlight (subtle white radial) */}
        {!prefersReducedMotion && (
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(220px circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.16), transparent 60%)",
            }}
          />
        )}

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
          onClick={handleWishlist}
          data-cursor="text"
          data-cursor-text={wished ? "Saved" : "Save"}
          className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-white"
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
                "h-4 w-4 transition-colors duration-500",
                wished
                  ? "fill-[var(--gold)] text-[var(--gold)]"
                  : "text-[var(--ink)]",
              )}
              strokeWidth={1.25}
            />
          </motion.div>
        </button>

        {/* Quick view button — top-left under badge, slides in on hover */}
        {onQuickView && (
          <motion.button
            type="button"
            onClick={handleQuickView}
            data-cursor="text"
            data-cursor-text="View"
            className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/90 px-4 py-2 backdrop-blur-md"
            initial={false}
            variants={{
              hover: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            style={{ opacity: 0, y: 8 }}
            aria-label={`Quick view ${name}`}
          >
            <Eye className="h-3.5 w-3.5 text-[var(--ink)]" strokeWidth={1.25} />
            <span className="label-caps text-[var(--ink)]">Quick View</span>
          </motion.button>
        )}

        {/* Add to Cart button — slides up on hover */}
        <motion.div
          className="absolute inset-x-4 bottom-4"
          initial={
            prefersReducedMotion ? { opacity: 1, y: 0 } : { y: 20, opacity: 0 }
          }
          variants={
            prefersReducedMotion
              ? {}
              : {
                  hover: { y: 0, opacity: 1 },
                }
          }
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        >
          <button
            type="button"
            onClick={handleAddToCart}
            data-cursor="text"
            data-cursor-text="Add"
            className="flex w-full items-center justify-center gap-2 bg-[var(--gold)] py-3 text-[0.6875rem] font-semibold tracking-[0.12em] text-[var(--ink)] uppercase transition-all duration-300 hover:bg-[var(--gold-soft)]"
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
        <h3 className="text-headline-sm leading-tight font-medium text-[var(--ink)] transition-colors duration-500 group-hover:text-[var(--gold-deep)]">
          {name}
        </h3>
        <p className="text-body-md font-medium text-[var(--ink)]/80">
          {formatPrice(price, currency)}
        </p>
      </div>
    </motion.article>
  );
}
