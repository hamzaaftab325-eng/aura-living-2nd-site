"use client";

/**
 * Providers — combined client-side context providers.
 *
 * Wrap the entire app with this in the root layout.
 * Order matters: outermost first.
 *   1. MotionProvider   — sets global MotionConfig (springs, easing, reduced-motion)
 *   2. LenisProvider    — inertia-based smooth scroll
 *
 * TanStack Query, ThemeProvider, CartProvider, AuthProvider will be added
 * in Phase 2 once those services exist.
 */

import type { ReactNode } from "react";
import { MotionProvider } from "./motion-provider";
import { LenisProvider } from "./lenis-provider";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <MotionProvider>
      <LenisProvider>{children}</LenisProvider>
    </MotionProvider>
  );
}
