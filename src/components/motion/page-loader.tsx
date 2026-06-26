"use client";

/**
 * PageLoader — elegant logo animation + progressive reveal on initial load.
 *
 * Spec (DESIGN.md → Page Loading):
 *   - Elegant logo animation
 *   - Progressive content reveal
 *   - Skeleton loading
 *   - Smooth fade into the page
 *
 * Features:
 *   - Logo "Aura" letters draw in one-by-one
 *   - Gold underline draws across
 *   - Loader fades out + slides up after ~1.5s (or on window load)
 *   - Only shows on first visit per session (sessionStorage)
 *
 * Usage:
 *   Place <PageLoader /> once in root layout (outside the page tree).
 */

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { brand } from "@/config/brand";

const STORAGE_KEY = "aura-living-loader-shown";

export function PageLoader() {
  const prefersReducedMotion = useReducedMotion();
  const [show, setShow] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Skip if reduced motion OR if already shown this session
    if (prefersReducedMotion) return;
    if (sessionStorage.getItem(STORAGE_KEY)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDone(true);
      return;
    }

    setShow(true);
    sessionStorage.setItem(STORAGE_KEY, "true");
    // Hide after minimum display time (allow logo animation to complete)
    const hideTimer = setTimeout(() => setShow(false), 1800);
    const doneTimer = setTimeout(() => setDone(true), 2400);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(doneTimer);
    };
  }, [prefersReducedMotion]);

  if (done) return null;

  const letters = brand.name.split("");

  return (
    <motion.div
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[var(--background)]"
      initial={{ opacity: 1 }}
      animate={show ? { opacity: 1 } : { opacity: 0, y: "-100%" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Logo — letters draw in one-by-one */}
      <div className="flex items-baseline overflow-hidden">
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            className="text-display-lg font-medium text-[var(--ink)]"
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.1 + i * 0.06,
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </div>

      {/* Gold underline — draws across */}
      <motion.div
        className="mt-2 h-px bg-[var(--gold)]"
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: "120px", opacity: 1 }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.4,
        }}
      />

      {/* Tagline — fades in below */}
      <motion.p
        className="label-caps mt-6 text-[var(--muted)]"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.9,
        }}
      >
        Curated calm for considered living
      </motion.p>

      {/* Progress dots */}
      <motion.div
        className="mt-8 flex gap-1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-1 w-1 rounded-full bg-[var(--ink)]"
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
