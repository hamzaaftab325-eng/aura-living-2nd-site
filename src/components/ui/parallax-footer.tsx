"use client";

/**
 * ParallaxFooter — luxury footer with parallax background + staggered links.
 *
 * Spec (DESIGN.md → Footer):
 *   - Parallax background
 *   - Staggered links
 *   - Decorative line animation
 *
 * Features:
 *   - Background image with subtle parallax (slower than scroll)
 *   - Dark overlay for legibility
 *   - Staggered link reveal on scroll into view
 *   - Animated decorative line at top
 *   - Brand wordmark + tagline
 *   - Social icons with hover invert
 *   - Multi-column link grid
 *
 * Usage:
 *   <ParallaxFooter
 *     backgroundImage="/footer-bg.jpg"
 *     columns={[...]}
 *   />
 */

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { useRef, type ReactNode } from "react";
import { Instagram, Facebook, Youtube } from "lucide-react";
import { brand } from "@/config/brand";
import { LuxuryHeading } from "@/components/layout";
import { Eyebrow } from "@/components/layout";
import { DecorativeDivider } from "@/components/motion";
import { cn } from "@/lib/utils";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface ParallaxFooterProps {
  backgroundImage?: string;
  columns: FooterColumn[];
  className?: string;
  children?: ReactNode;
}

export function ParallaxFooter({
  backgroundImage,
  columns,
  className,
  children,
}: ParallaxFooterProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  const bgY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ["0%", "0%"] : ["-15%", "15%"],
  );

  return (
    <footer
      ref={ref}
      className={cn(
        "grain-overlay relative overflow-hidden border-t border-white/10 bg-[var(--ink)] text-[var(--cream)]",
        className,
      )}
    >
      {/* Background image with parallax */}
      {backgroundImage && !prefersReducedMotion && (
        <motion.div className="absolute inset-0" style={{ y: bgY }}>
          <Image
            src={backgroundImage}
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-20"
            aria-hidden
          />
        </motion.div>
      )}

      {/* Decorative divider at top */}
      <div className="relative z-10 pt-12">
        <DecorativeDivider variant="ornament" tone="gold" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 py-16 md:px-8 lg:px-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <motion.div
            initial={
              prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-1"
          >
            <LuxuryHeading variant="headline-md" as="p" italic>
              {brand.name}
            </LuxuryHeading>
            <p className="text-body-sm mt-4 max-w-[36ch] text-white/60">
              {brand.tagline}
            </p>

            {/* Social icons */}
            <div className="mt-6 flex gap-3">
              {[
                {
                  icon: Instagram,
                  href: brand.social.instagram,
                  label: "Instagram",
                },
                {
                  icon: Facebook,
                  href: brand.social.facebook,
                  label: "Facebook",
                },
                { icon: Youtube, href: brand.social.youtube, label: "YouTube" },
              ].map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--ink)]"
                >
                  <Icon className="h-4 w-4" strokeWidth={1} />
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Link columns with staggered reveal */}
          {columns.map((column, i) => (
            <motion.div
              key={column.title}
              initial={
                prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.1 + i * 0.1,
              }}
              className="flex flex-col gap-5"
            >
              <Eyebrow tone="gold">{column.title}</Eyebrow>
              <ul className="flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group/link text-body-sm inline-flex items-center text-white/70 transition-colors duration-300 hover:text-white"
                    >
                      <span className="mr-0 h-px w-0 bg-[var(--gold)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/link:mr-2 group-hover/link:w-4" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Optional extra content */}
        {children}

        {/* Bottom bar */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 md:flex-row"
        >
          <p className="text-body-sm text-white/40">
            © 2026 {brand.name}. Crafted in Lahore, Pakistan.
          </p>
          <div className="flex gap-6 text-white/40">
            <Link
              href="/legal/privacy"
              className="text-body-sm transition-colors duration-300 hover:text-white"
            >
              Privacy
            </Link>
            <Link
              href="/legal/terms"
              className="text-body-sm transition-colors duration-300 hover:text-white"
            >
              Terms
            </Link>
            <Link
              href="/legal/cookies"
              className="text-body-sm transition-colors duration-300 hover:text-white"
            >
              Cookies
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
