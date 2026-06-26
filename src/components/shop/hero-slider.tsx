"use client";

/**
 * HeroSlider — full-bleed auto-advancing luxury hero carousel.
 *
 * Features:
 *   - 3-4 full viewport slides with editorial luxury imagery
 *   - Auto-advance every 6 seconds
 *   - Animated text overlays (SplitHeading per slide)
 *   - Navigation dots (clickable)
 *   - Ken Burns slow-zoom on active image
 *   - Prev/next arrows on desktop
 *   - Respects prefers-reduced-motion
 */

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { luxuryEasing } from "@/providers/motion-provider";

interface Slide {
  image: string;
  eyebrow: string;
  title: string;
  description: string;
  cta: {
    label: string;
    href: string;
    variant: "primary" | "gold" | "outline-luxury";
  };
}

const SLIDES: Slide[] = [
  {
    image: "/images/hero-1.png",
    eyebrow: "Autumn Collection — 2026",
    title: "Curated calm\nfor considered\nliving.",
    description:
      "A refined collection of home decor — selected for craftsmanship, material integrity, and quiet presence. Designed in Lahore, crafted for the discerning Pakistani home.",
    cta: { label: "Shop the Collection", href: "/shop", variant: "primary" },
  },
  {
    image: "/images/hero-2.png",
    eyebrow: "The Atelier",
    title: "Where every\nobject earns\nits place.",
    description:
      "We work with a small collective of Pakistani artisans — third- and fourth-generation craftspeople who shape each piece by hand. No mass production. No compromises.",
    cta: {
      label: "Explore Atelier",
      href: "/#atelier",
      variant: "outline-luxury",
    },
  },
  {
    image: "/images/hero-3.png",
    eyebrow: "Featured Piece",
    title: "Crafted\nwith\nintention.",
    description:
      "Hand-knotted textiles to solid oak furniture — every object carries the mark of its maker. Discover pieces designed to outlive trends.",
    cta: { label: "View Products", href: "/shop", variant: "gold" },
  },
];

const AUTO_ADVANCE_MS = 7000;

export function HeroSlider() {
  const prefersReducedMotion = useReducedMotion();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
    },
    [current],
  );

  const goNext = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  // Auto-advance
  useEffect(() => {
    if (prefersReducedMotion) return;
    const timer = setInterval(goNext, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [goNext, prefersReducedMotion]);

  const slide = SLIDES[current]!;

  return (
    <section className="relative h-screen min-h-[700px] w-full overflow-hidden bg-[var(--ink)]">
      {/* Background images with crossfade */}
      <AnimatePresence custom={direction} mode="sync">
        <motion.div
          key={current}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: luxuryEasing }}
        >
          <Image
            src={slide.image}
            alt={slide.title.replace(/\n/g, " ")}
            fill
            priority={current === 0}
            sizes="100vw"
            className={cn("object-cover", !prefersReducedMotion && "ken-burns")}
          />
          {/* Dark gradient for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[rgba(18,18,18,0.85)] via-[rgba(18,18,18,0.5)] to-[rgba(18,18,18,0.2)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(18,18,18,0.6)] via-transparent to-transparent" />
          <div className="grain-overlay absolute inset-0" />
        </motion.div>
      </AnimatePresence>

      {/* Text content */}
      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto w-full max-w-[1440px] px-5 md:px-8 lg:px-16">
          <div className="max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, ease: luxuryEasing, delay: 0.2 }}
              >
                {/* Eyebrow */}
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-[var(--gold)]" aria-hidden />
                  <span className="label-caps text-[var(--gold)]">
                    {slide.eyebrow}
                  </span>
                </div>

                {/* Title — line by line reveal */}
                <h1 className="text-display-xl mt-6 leading-[1.05] font-medium tracking-[-0.025em] text-white">
                  {slide.title.split("\n").map((line, i) => (
                    <span key={i} className="block overflow-hidden">
                      <motion.span
                        className="block"
                        initial={{ y: "110%" }}
                        animate={{ y: 0 }}
                        transition={{
                          duration: 0.8,
                          ease: luxuryEasing,
                          delay: 0.3 + i * 0.12,
                        }}
                      >
                        {line}
                      </motion.span>
                    </span>
                  ))}
                </h1>

                {/* Description */}
                <motion.p
                  className="text-body-lg mt-8 max-w-[48ch] text-white/70"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: luxuryEasing, delay: 0.7 }}
                >
                  {slide.description}
                </motion.p>

                {/* CTA */}
                <motion.div
                  className="mt-10 flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: luxuryEasing, delay: 0.9 }}
                >
                  <a
                    href={slide.cta.href}
                    className={cn(
                      "group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-[0.25rem] px-8 py-3.5 text-[0.75rem] font-semibold tracking-[0.1em] whitespace-nowrap uppercase transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5",
                      slide.cta.variant === "primary" &&
                        "border border-white/20 bg-[var(--ink)] text-white hover:bg-[#1f1f1f] hover:shadow-[0_14px_36px_rgba(18,18,18,0.18)]",
                      slide.cta.variant === "gold" &&
                        "bg-[var(--gold)] text-[var(--ink)] hover:bg-[var(--gold-soft)] hover:shadow-[0_12px_32px_rgba(212,175,55,0.32)]",
                      slide.cta.variant === "outline-luxury" &&
                        "border border-white text-white hover:bg-white hover:text-[var(--ink)]",
                    )}
                  >
                    {slide.cta.label}
                    <ArrowRight
                      className="arrow h-4 w-4 transition-transform duration-500 group-hover/btn:translate-x-1"
                      strokeWidth={1.5}
                    />
                  </a>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Navigation arrows (desktop) */}
      <div className="absolute right-8 bottom-12 z-20 hidden items-center gap-4 md:flex lg:right-16">
        <button
          onClick={goPrev}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 text-white backdrop-blur-md transition-all duration-300 hover:border-white hover:bg-white/10"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={1.25} />
        </button>
        <button
          onClick={goNext}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 text-white backdrop-blur-md transition-all duration-300 hover:border-white hover:bg-white/10"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5" strokeWidth={1.25} />
        </button>
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-12 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3 md:left-8 md:translate-x-0 lg:left-16">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="group relative h-1 overflow-hidden rounded-full transition-all duration-500"
            style={{
              width: i === current ? "40px" : "20px",
              backgroundColor:
                i === current
                  ? "rgba(255,255,255,0.3)"
                  : "rgba(255,255,255,0.2)",
            }}
            aria-label={`Go to slide ${i + 1}`}
          >
            {i === current && (
              <motion.div
                className="absolute inset-0 bg-[var(--gold)]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: AUTO_ADVANCE_MS / 1000,
                  ease: "linear",
                }}
                style={{ transformOrigin: "left" }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Slide counter */}
      <div className="absolute right-1/2 bottom-12 z-20 hidden translate-x-[120px] items-center gap-2 text-white/50 md:flex">
        <span className="text-display-sm font-medium text-white">
          {String(current + 1).padStart(2, "0")}
        </span>
        <span className="text-body-sm">
          / {String(SLIDES.length).padStart(2, "0")}
        </span>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="label-caps text-white/40">Scroll</span>
          <motion.div
            className="h-9 w-5 rounded-full border border-white/20"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div
              className="mx-auto mt-2 h-1.5 w-0.5 rounded-full bg-[var(--gold)]"
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
