/**
 * Better Auth Configuration.
 *
 * Spec (DESIGN.md → 2.1 Authentication System):
 *   • Email/password (scrypt hashing via Better Auth, min 8 chars)
 *   • Session strategy: JWT, 7-day expiry, refresh on activity
 *   • Admin role gate via `role` field on User
 *
 * Free tier constraint: Google OAuth deferred (can add later with credentials).
 *
 * Exports:
 *   - auth    → Better Auth instance (server-only)
 *   - handler → Next.js App Router handler
 *   - signIn, signUp, signOut, getSession → server-side helpers
 */

import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin } from "better-auth/plugins";
import { headers } from "next/headers";
import { prismaClient } from "@/server/db/client";
import { siteConfig } from "@/config/site";

export const auth = betterAuth({
  // Prisma adapter — uses our singleton client
  database: prismaAdapter(prismaClient, {
    provider: "postgresql",
  }),

  // Database hooks — populate denormalized human-readable columns
  // (Account.email + Session.userEmail) AFTER creation.
  // We use `after` (not `before`) because Better Auth's internal create
  // call rejects unknown fields. After the row is created, we UPDATE it
  // with the denormalized email so raw-table inspection in Supabase Studio
  // shows "admin@auraliving.pk" instead of just "VdrzGXwIJKI898O6mNAebMP9Sqt2mCGt".
  databaseHooks: {
    account: {
      create: {
        after: async (account) => {
          const user = await prismaClient.user.findUnique({
            where: { id: account.userId },
            select: { email: true },
          });
          if (user?.email) {
            await prismaClient.account.update({
              where: { id: account.id },
              data: { email: user.email },
            });
          }
        },
      },
    },
    session: {
      create: {
        after: async (session) => {
          const user = await prismaClient.user.findUnique({
            where: { id: session.userId },
            select: { email: true },
          });
          if (user?.email) {
            await prismaClient.session.update({
              where: { id: session.id },
              data: { userEmail: user.email },
            });
          }
        },
      },
    },
  },

  // Email/password only (Google OAuth deferred — free tier)
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
    // Auto-verify email in dev (no Resend integration yet).
    requireEmailVerification: process.env.NODE_ENV === "production",
  },

  // Session config
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // Refresh session once per day
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5, // 5 min cookie cache
    },
  },

  // Plugins — admin role gate
  plugins: [
    admin({
      // Map our UserRole enum to Better Auth's admin role
      adminRole: "ADMIN",
      defaultRole: "CUSTOMER",
    }),
  ],

  // Trusted origins for CORS (add production domain when deployed)
  trustedOrigins: [
    siteConfig.url,
    process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  ].filter(Boolean),

  // Secret for JWT signing (loaded from env)
  secret: process.env.BETTER_AUTH_SECRET,

  // Rate limiting — simple in-memory (production: Redis)
  rateLimit: {
    enabled: true,
    window: 60, // 60 seconds
    max: 10, // 10 requests per window per IP
  },
});

// ---------------------------------------------------------------------------
// Server-side helpers — call from Server Components, Server Actions, API routes
// ---------------------------------------------------------------------------

/**
 * Get the current session + user (or null if not signed in).
 * Call from Server Components / Server Actions / API routes.
 *
 * Usage:
 *   const session = await getSession();
 *   if (!session) redirect("/sign-in");
 */
export async function getSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session;
}

/**
 * Require a signed-in user. Throws redirect to /sign-in if not signed in.
 */
export async function requireUser() {
  const session = await getSession();
  if (!session) {
    throw new Error("UNAUTHORIZED");
  }
  return session;
}

/**
 * Require an admin user. Throws redirect to /sign-in if not signed in,
 * or to / if signed in but not admin.
 */
export async function requireAdmin() {
  const session = await getSession();
  if (!session) {
    throw new Error("UNAUTHORIZED");
  }
  if (session.user.role !== "ADMIN") {
    throw new Error("FORBIDDEN");
  }
  return session;
}

// Type exports for use in client components
export type Session = typeof auth.$Infer.Session;
