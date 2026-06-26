/**
 * Prisma Client singleton.
 *
 * Production-grade concerns:
 * - Prevents hot-reload exhaustion by reusing the global instance in dev.
 * - Logs queries only in development (avoid noisy prod logs).
 * - Strongly typed via Prisma's generated client.
 *
 * Always import from this file: `import { db } from "@/lib/db"`.
 * Never instantiate `PrismaClient` directly elsewhere.
 */

import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const logLevel =
  process.env.NODE_ENV === "development"
    ? (["query", "error", "warn"] as const)
    : (["error"] as const);

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: [...logLevel],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}

export type { PrismaClient } from "@prisma/client";
