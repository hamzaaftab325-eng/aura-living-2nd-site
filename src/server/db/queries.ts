/**
 * Database query helpers — common typed queries used across the app.
 *
 * Centralized here so we have one source of truth for query patterns.
 * All queries use the singleton `db` client from `@/server/db`.
 *
 * Usage:
 *   import { getUserByEmail, getProductBySlug, getFeaturedProducts } from "@/server/db/queries";
 */

import { prismaClient as db } from "./client";

// ---------------------------------------------------------------------------
// User queries
// ---------------------------------------------------------------------------

export async function getUserByEmail(email: string) {
  return db.user.findUnique({ where: { email } });
}

export async function getUserById(id: string) {
  return db.user.findUnique({ where: { id } });
}

export async function isAdmin(userId: string) {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });
  return user?.role === "ADMIN";
}

// ---------------------------------------------------------------------------
// Category queries
// ---------------------------------------------------------------------------

export async function getAllCategories() {
  return db.category.findMany({
    orderBy: { sortOrder: "asc" },
    include: { _count: { select: { products: true } } },
  });
}

export async function getCategoryBySlug(slug: string) {
  return db.category.findUnique({ where: { slug } });
}

// ---------------------------------------------------------------------------
// Product queries
// ---------------------------------------------------------------------------

export async function getFeaturedProducts(limit = 8) {
  return db.product.findMany({
    where: { isFeatured: true, status: "ACTIVE" },
    take: limit,
    orderBy: { createdAt: "desc" },
    include: { category: true },
  });
}

export async function getProductBySlug(slug: string) {
  return db.product.findUnique({
    where: { slug },
    include: { category: true },
  });
}

export async function getProductsByCategory(categorySlug: string, limit = 24) {
  return db.product.findMany({
    where: {
      category: { slug: categorySlug },
      status: "ACTIVE",
    },
    take: limit,
    orderBy: { createdAt: "desc" },
    include: { category: true },
  });
}

export async function getNewArrivals(limit = 8) {
  return db.product.findMany({
    where: { status: "ACTIVE" },
    take: limit,
    orderBy: { createdAt: "desc" },
    include: { category: true },
  });
}

// ---------------------------------------------------------------------------
// Order queries
// ---------------------------------------------------------------------------

export async function getOrdersByUser(userId: string) {
  return db.order.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: {
      items: {
        include: { product: true },
      },
    },
  });
}

export async function getOrderById(orderId: string) {
  return db.order.findUnique({
    where: { id: orderId },
    include: {
      items: {
        include: { product: true },
      },
    },
  });
}
