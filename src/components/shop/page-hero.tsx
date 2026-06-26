"use client";

/**
 * PageHero — reusable editorial hero for shop/category pages.
 * Full-width image with dark gradient + animated text overlay.
 */

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { luxuryEasing } from "@/providers/motion-provider";

interface PageHeroProps {
  image: string;
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function PageHero({
  image,
  eyebrow,
  title,
  description,
  align = "center",
}: PageHeroProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative flex h-[50vh] min-h-[400px] w-full items-center justify-center overflow-hidden bg-[var(--ink)]">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={title}
          fill
          priority
          sizes="100vw"
          className={cn("object-cover", !prefersReducedMotion && "ken-burns")}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(18,18,18,0.8)] via-[rgba(18,18,18,0.4)] to-[rgba(18,18,18,0.3)]" />
        <div className="grain-overlay absolute inset-0" />
      </div>

      {/* Text content */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 md:px-8 lg:px-16">
        <div
          className={cn(
            "flex flex-col gap-4",
            align === "center"
              ? "items-center text-center"
              : "items-start text-left",
          )}
        >
          {/* Eyebrow */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: luxuryEasing, delay: 0.2 }}
          >
            <span className="h-px w-8 bg-[var(--gold)]" aria-hidden />
            <span className="label-caps text-[var(--gold)]">{eyebrow}</span>
          </motion.div>

          {/* Title — line by line */}
          <h1 className="text-display-lg leading-[1.05] font-medium tracking-[-0.025em] text-white">
            {title.split("\n").map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={
                    prefersReducedMotion ? { opacity: 0 } : { y: "110%" }
                  }
                  animate={prefersReducedMotion ? { opacity: 1 } : { y: 0 }}
                  transition={{
                    duration: 0.8,
                    ease: luxuryEasing,
                    delay: 0.3 + i * 0.1,
                  }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Description */}
          {description && (
            <motion.p
              className="text-body-lg max-w-[52ch] text-white/70"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: luxuryEasing, delay: 0.6 }}
            >
              {description}
            </motion.p>
          )}
        </div>
      </div>
    </section>
  );
}
