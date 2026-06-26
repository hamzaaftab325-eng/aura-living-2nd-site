/**
 * Better Auth client — for client-side components.
 *
 * Use these in 'use client' components to sign in / sign up / sign out
 * and to read the current session.
 *
 * Usage:
 *   "use client";
 *   import { authClient } from "@/server/auth/client";
 *
 *   await authClient.signIn.email({ email, password });
 *   await authClient.signUp.email({ email, password, name });
 *   await authClient.signOut();
 *   const { data: session } = authClient.useSession();
 *
 * baseURL strategy (bulletproof — works on ANY deploy domain):
 *   - In the browser: ALWAYS use window.location.origin
 *     (automatically adapts to localhost:3000 in dev, your-project.vercel.app
 *     in preview, auraliving.pk in production — no env vars needed)
 *   - During SSR: fall back to NEXT_PUBLIC_APP_URL or undefined (relative URLs)
 *
 * This fixes the issue where uploading a local .env (with
 * NEXT_PUBLIC_APP_URL=http://localhost:3000) to Vercel caused the auth client
 * to POST to localhost:3000 even in production.
 *
 * Note: forgetPassword / resetPassword / verifyEmail methods will be
 * enabled when we add the corresponding Better Auth plugins in Phase 5.
 */

import { createAuthClient } from "better-auth/react";

function getBaseURL(): string | undefined {
  // In the browser — always use the current origin.
  // This is bulletproof: works on localhost, vercel.app, custom domain.
  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  // During SSR — use env var if set, otherwise let Better Auth use relative URLs.
  return process.env.NEXT_PUBLIC_APP_URL || undefined;
}

export const authClient = createAuthClient({
  baseURL: getBaseURL(),
});

// Convenience exports (only methods that exist on the default client)
export const { signIn, signUp, signOut, useSession } = authClient;
