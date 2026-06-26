"use client";

/**
 * GlassmorphicHeader — sticky luxury header with blur-on-scroll effect.
 *
 * Spec (DESIGN.md → Elevation & Depth → Navigation):
 *   - backdrop-blur (20px)
 *   - 80% opacity white fill
 *   - Hairline bottom border (#111111 at 5% opacity)
 *   - Shrinks height on scroll
 *
 * Usage:
 *   <GlassmorphicHeader>
 *     <Logo />
 *     <Nav />
 *     <Actions />
 *   </GlassmorphicHeader>
 *
 *   <GlassmorphicHeader compact>  // 56px height always
 *     ...
 *   </GlassmorphicHeader>
 */

import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface GlassmorphicHeaderProps {
  children: ReactNode;
  /** Compact mode = always small. Default false (shrinks on scroll). */
  compact?: boolean;
  className?: string;
}

export function GlassmorphicHeader({
  children,
  compact = false,
  className,
}: GlassmorphicHeaderProps) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 8);
  });

  const isCompact = compact || scrolled;

  return (
    <motion.header
      className={cn(
        "sticky top-0 z-50 w-full",
        // Glassmorphic surface
        "border-b border-[rgba(18,18,18,0.05)]",
        "bg-white/80 backdrop-blur-xl backdrop-saturate-150",
        // Shadow appears on scroll
        scrolled && "shadow-[0_4px_24px_rgba(18,18,18,0.05)]",
        className,
      )}
      animate={{
        height: isCompact ? 56 : 80,
      }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex h-full items-center justify-between px-5 md:px-8 lg:px-16">
        {children}
      </div>
    </motion.header>
  );
}
