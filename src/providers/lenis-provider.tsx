"use client";

/**
 * LenisProvider — inertia-based smooth scrolling for the entire app.
 *
 * Spec (DESIGN.md → 1.4 Animation Engine & Smooth Scroll Setup):
 *   - Integrate Lenis globally for inertia-based smooth scrolling
 *   - RAF-integrated, respects prefers-reduced-motion
 *   - Auto-syncs with GSAP ScrollTrigger in Phase 5
 *
 * Performance: Lenis uses requestAnimationFrame + transform on the scroll
 * container, so it doesn't fight the browser's compositor.
 */

import { useEffect, useRef, type ReactNode } from "react";
import Lenis from "lenis";

interface LenisProviderProps {
  children: ReactNode;
}

export function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Respect reduced motion — bail out entirely.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      // Luxurious easing — slow-out, gentle
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false, // don't smooth touch (feels weird on mobile)
      touchMultiplier: 1.6,
      wheelMultiplier: 1.0,
      // Horizontal scroll support (for future editorial sections)
      orientation: "vertical",
      gestureOrientation: "vertical",
    });

    lenisRef.current = lenis;

    let frameId: number;
    function raf(time: number) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    }
    frameId = requestAnimationFrame(raf);

    // Expose for debug + GSAP sync
    if (process.env.NODE_ENV === "development") {
      (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    }

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
      lenisRef.current = null;
      if (process.env.NODE_ENV === "development") {
        delete (window as unknown as { __lenis?: Lenis }).__lenis;
      }
    };
  }, []);

  return <>{children}</>;
}
