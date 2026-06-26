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
 * Note: forgetPassword / resetPassword / verifyEmail methods will be
 * enabled when we add the corresponding Better Auth plugins in Phase 5.
 */

import { createAuthClient } from "better-auth/react";
import { siteConfig } from "@/config/site";

export const authClient = createAuthClient({
  baseURL: siteConfig.url,
});

// Convenience exports (only methods that exist on the default client)
export const { signIn, signUp, signOut, useSession } = authClient;
