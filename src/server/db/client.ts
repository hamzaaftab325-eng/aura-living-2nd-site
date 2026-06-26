/**
 * Prisma Client singleton — production-grade.
 *
 * Why a singleton:
 *   In dev, Next.js hot-reloads modules. Each reload would create a new
 *   PrismaClient, exhausting the Postgres connection pool (~20 connections
 *   on Supabase free tier). We cache the client on globalThis to reuse it.
 *
 * Always import `db` from `@/server/db` (which re-exports from this file):
 *   import { db } from "@/server/db";
 *
 * Never instantiate PrismaClient directly elsewhere.
 */

import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Log queries only in development. In production, errors only — keeps logs clean.
const logConfig =
  process.env.NODE_ENV === "development"
    ? (["query", "error", "warn"] as const)
    : (["error"] as const);

export const prismaClient =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: [...logConfig],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prismaClient;
}
