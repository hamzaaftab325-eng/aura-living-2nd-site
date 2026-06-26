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
 * baseURL behavior:
 *   - If NEXT_PUBLIC_APP_URL is set → use it (explicit, works in any environment)
 *   - If not set → omit baseURL (Better Auth uses relative URLs, browser
 *     automatically uses current origin). This is the correct production
 *     pattern — no hardcoded URLs, works on any deploy domain.
 *
 * Note: forgetPassword / resetPassword / verifyEmail methods will be
 * enabled when we add the corresponding Better Auth plugins in Phase 5.
 */

import { createAuthClient } from "better-auth/react";

// Only set baseURL if explicitly provided. Otherwise let Better Auth
// use relative URLs (window.location.origin) — works on any domain
// without needing to update env vars when deploying to different URLs.
const baseURL = process.env.NEXT_PUBLIC_APP_URL || undefined;

export const authClient = createAuthClient(baseURL ? { baseURL } : undefined);

// Convenience exports (only methods that exist on the default client)
export const { signIn, signUp, signOut, useSession } = authClient;
