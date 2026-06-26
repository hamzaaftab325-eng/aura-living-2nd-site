"use client";

/**
 * MegaMenu — luxury header mega-menu with staggered reveal.
 *
 * Spec (DESIGN.md → Navigation):
 *   - Smooth menu opening
 *   - Mega menu reveal
 *
 * Features:
 *   - Hover-triggered (desktop) or click-triggered (mobile)
 *   - Full-width dropdown panel
 *   - Staggered child link reveal
 *   - Featured column with image + promo
 *   - Glassmorphic backdrop
 *   - Smooth open/close via AnimatePresence
 *
 * Usage:
 *   <MegaMenu
 *     trigger="Shop"
 *     sections={[{ title: "Collections", links: [...] }]}
 *     featured={{ title: "Autumn Edit", image: "/autumn.jpg", href: "/shop/autumn" }}
 *   />
 */

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface MegaMenuLink {
  label: string;
  href: string;
  description?: string;
}

interface MegaMenuSection {
  title: string;
  links: MegaMenuLink[];
}

interface MegaMenuFeatured {
  title: string;
  href: string;
  image: string;
  subtitle?: string;
}

export interface MegaMenuProps {
  trigger: ReactNode;
  sections: MegaMenuSection[];
  featured?: MegaMenuFeatured;
  className?: string;
}

export function MegaMenu({
  trigger,
  sections,
  featured,
  className,
}: MegaMenuProps) {
  const prefersReducedMotion = useReducedMotion();
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center"
        aria-expanded={open}
      >
        {trigger}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute top-full left-1/2 z-50 w-screen max-w-[800px] -translate-x-1/2 pt-4"
            initial={
              prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }
            }
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className={cn(
                "glass-panel grid grid-cols-12 gap-8 p-8 shadow-[0_30px_80px_rgba(18,18,18,0.12)]",
                className,
              )}
            >
              {/* Sections */}
              <div
                className={cn(
                  "grid gap-8",
                  featured
                    ? "col-span-8 sm:grid-cols-2"
                    : "col-span-12 sm:grid-cols-3",
                )}
              >
                {sections.map((section, i) => (
                  <motion.div
                    key={section.title}
                    initial={
                      prefersReducedMotion
                        ? { opacity: 0 }
                        : { opacity: 0, y: 8 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1],
                      delay: 0.05 + i * 0.05,
                    }}
                    className="flex flex-col gap-3"
                  >
                    <span className="label-caps text-[var(--gold-deep)]">
                      {section.title}
                    </span>
                    <ul className="flex flex-col gap-2">
                      {section.links.map((link) => (
                        <li key={link.label}>
                          <Link
                            href={link.href}
                            className="group/link flex flex-col"
                          >
                            <span className="text-body-md font-medium text-[var(--ink)] transition-colors duration-300 group-hover/link:text-[var(--gold-deep)]">
                              {link.label}
                            </span>
                            {link.description && (
                              <span className="text-body-sm text-[var(--muted)]">
                                {link.description}
                              </span>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>

              {/* Featured */}
              {featured && (
                <motion.div
                  initial={
                    prefersReducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, x: 12 }
                  }
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.2,
                  }}
                  className="col-span-4"
                >
                  <Link
                    href={featured.href}
                    className="group/featured relative block aspect-[3/4] overflow-hidden bg-[var(--cream)]"
                  >
                    <Image
                      src={featured.image}
                      alt={featured.title}
                      fill
                      sizes="200px"
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/featured:scale-[1.06]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(18,18,18,0.8)] via-transparent to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      {featured.subtitle && (
                        <p className="label-caps text-[var(--gold)]">
                          {featured.subtitle}
                        </p>
                      )}
                      <p className="text-headline-sm mt-1 font-medium text-white">
                        {featured.title}
                      </p>
                      <div className="mt-2 flex items-center gap-2 text-white">
                        <span className="label-caps">Discover</span>
                        <ArrowUpRight
                          className="h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/featured:translate-x-0.5 group-hover/featured:-translate-y-0.5"
                          strokeWidth={1.25}
                        />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
