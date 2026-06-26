"use client";

/**
 * CursorFollower — luxury custom cursor with magnetic + glow + dynamic text.
 *
 * Spec (DESIGN.md → Cursor Effects):
 *   - Magnetic buttons (wrapper component)
 *   - Cursor follower (this component — dot + ring)
 *   - Hover previews (dynamic text on hover)
 *   - Dynamic cursor text (label on hoverable elements)
 *
 * Features:
 *   - Small dot (instant follow) + larger ring (lagged spring follow)
 *   - On `[data-cursor="text"]` elements: ring grows + shows text label
 *   - On `[data-cursor="view"]` elements: ring grows + shows "View" label
 *   - On `[data-cursor="drag"]` elements: ring grows + shows drag indicator
 *   - Magnetic via separate `<MagneticWrap>` component
 *   - Hidden on touch devices (only activates on hover+fine pointer)
 *
 * Usage:
 *   1. Place <CursorFollower /> once in root layout
 *   2. Add data-cursor="text" data-cursor-text="View Product" to any element
 *
 *   <button data-cursor="text" data-cursor-text="Add">Add to Cart</button>
 *   <a data-cursor="view" href="/product">...</a>
 */

import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";
import { useEffect, useState } from "react";

export function CursorFollower() {
  const prefersReducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [cursorText, setCursorText] = useState<string>("");
  const [cursorMode, setCursorMode] = useState<
    "default" | "text" | "view" | "drag"
  >("default");

  // Dot = instant follow, Ring = lagged spring follow
  const dotX = useMotionValue(0);
  const dotY = useMotionValue(0);
  const ringX = useSpring(dotX, { stiffness: 350, damping: 28, mass: 0.5 });
  const ringY = useSpring(dotY, { stiffness: 350, damping: 28, mass: 0.5 });

  useEffect(() => {
    // Only enable on hover+fine pointer devices (no touch)
    const canHover = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    if (!canHover || prefersReducedMotion) return;

    // One-time enable on mount — required because we can't read window during SSR
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnabled(true);
    document.documentElement.classList.add("cursor-none");

    const handleMove = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);

      // Find element under cursor — check for data-cursor attributes
      const el = e.target as HTMLElement | null;
      const cursorEl = el?.closest("[data-cursor]") as HTMLElement | null;
      if (cursorEl) {
        const mode = cursorEl.dataset.cursor as typeof cursorMode;
        const text = cursorEl.dataset.cursorText ?? "";
        setCursorMode(mode);
        setCursorText(text);
      } else {
        setCursorMode("default");
        setCursorText("");
      }
    };

    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.documentElement.classList.remove("cursor-none");
    };
  }, [dotX, dotY, prefersReducedMotion]);

  if (!enabled) return null;

  const ringSize = cursorMode === "default" ? 32 : 80;
  const ringBg =
    cursorMode === "default"
      ? "transparent"
      : cursorMode === "view"
        ? "var(--gold)"
        : "var(--ink)";

  return (
    <>
      {/* Outer ring (lagged spring follow) */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] flex items-center justify-center rounded-full border border-[var(--ink)] mix-blend-difference"
        style={{
          x: ringX,
          y: ringY,
          width: ringSize,
          height: ringSize,
          translateX: "-50%",
          translateY: "-50%",
          backgroundColor: ringBg,
        }}
        animate={{
          width: ringSize,
          height: ringSize,
          backgroundColor: ringBg,
        }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      >
        {cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="text-[0.625rem] font-semibold tracking-[0.1em] text-white uppercase"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>

      {/* Center dot (instant follow) */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-1 w-1 rounded-full bg-[var(--gold)] mix-blend-difference"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: cursorMode === "default" ? 1 : 0,
        }}
      />
    </>
  );
}
