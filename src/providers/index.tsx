"use client";

/**
 * Providers — combined client-side context providers + system components.
 *
 * Wrap the entire app with this in the root layout.
 * Order matters: outermost first.
 *   1. MotionProvider   — sets global MotionConfig (springs, easing, reduced-motion)
 *   2. LenisProvider    — inertia-based smooth scroll
 *   3. CursorFollower   — custom luxury cursor (hidden on touch)
 *   4. PageLoader       — elegant logo animation on initial load
 *
 * TanStack Query, ThemeProvider, CartProvider, AuthProvider will be added
 * in Phase 2 once those services exist.
 */

import type { ReactNode } from "react";
import { MotionProvider } from "./motion-provider";
import { LenisProvider } from "./lenis-provider";
import { CursorFollower, PageLoader } from "@/components/motion";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <MotionProvider>
      <LenisProvider>
        <PageLoader />
        <CursorFollower />
        {children}
      </LenisProvider>
    </MotionProvider>
  );
}
