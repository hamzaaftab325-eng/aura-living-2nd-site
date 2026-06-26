"use client";

/**
 * GSAP registration — client-only, tree-shaken.
 * Imported on demand by scroll-trigger components.
 *
 * Spec: Install GSAP and ScrollTrigger for future advanced timelines.
 * We register plugins here so they're available globally without
 * re-registration per component.
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  // Default easing — luxury
  gsap.defaults({
    ease: "power3.out",
    duration: 0.8,
  });

  // Respect reduced motion globally
  ScrollTrigger.config({
    ignoreMobileResize: true,
  });
}

export { gsap, ScrollTrigger };
