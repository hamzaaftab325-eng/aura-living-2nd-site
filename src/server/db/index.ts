/**
 * Database barrel export.
 *
 * Single import surface for all server-side Prisma access:
 *   import { db, PrismaClient, prisma } from "@/server/db";
 *
 * The `db` alias is preferred for queries:
 *   const user = await db.user.findUnique({ where: { email } });
 *
 * The `prisma` alias is kept for backward compat with code that uses it.
 */

export { prismaClient as db, prismaClient as prisma } from "./client";
export { PrismaClient } from "@prisma/client";
// Re-export all Prisma types for convenience
export type * from "@prisma/client";
