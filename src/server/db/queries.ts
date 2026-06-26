/**
 * Database query helpers — common typed queries used across the app.
 *
 * Centralized here so we have one source of truth for query patterns.
 * All queries use the singleton `db` client from `@/server/db`.
 *
 * IMPORTANT: Run queries SEQUENTIALLY on Supabase free tier (1 connection limit).
 * Avoid Promise.all for DB queries — use sequential await instead.
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
    include: {
      category: true,
      variants: { where: { isActive: true } },
    },
  });
}

export async function getProductBySlug(slug: string) {
  return db.product.findUnique({
    where: { slug },
    include: {
      category: true,
      variants: { where: { isActive: true }, orderBy: { priceDelta: "asc" } },
      reviews: {
        where: { isApproved: true },
        orderBy: { createdAt: "desc" },
        include: { images: true },
      },
    },
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
    include: {
      category: true,
      variants: { where: { isActive: true }, take: 1 },
    },
  });
}

export async function getNewArrivals(limit = 8) {
  return db.product.findMany({
    where: { status: "ACTIVE" },
    take: limit,
    orderBy: { createdAt: "desc" },
    include: {
      category: true,
      variants: { where: { isActive: true }, take: 1 },
    },
  });
}

// ---------------------------------------------------------------------------
// Product Variant queries
// ---------------------------------------------------------------------------

export async function getVariantsByProduct(productId: string) {
  return db.productVariant.findMany({
    where: { productId, isActive: true },
    orderBy: { priceDelta: "asc" },
  });
}

export async function getVariantBySku(sku: string) {
  return db.productVariant.findUnique({
    where: { sku },
    include: { product: true },
  });
}

// ---------------------------------------------------------------------------
// Review queries
// ---------------------------------------------------------------------------

export async function getApprovedReviews(productId: string) {
  return db.review.findMany({
    where: { productId, isApproved: true },
    orderBy: { createdAt: "desc" },
    include: { images: true },
  });
}

export async function getReviewSummary(productId: string) {
  const reviews = await db.review.findMany({
    where: { productId, isApproved: true },
    select: { rating: true },
  });

  if (reviews.length === 0) {
    return { average: 0, count: 0, distribution: [0, 0, 0, 0, 0] };
  }

  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  const average = sum / reviews.length;
  const distribution = [1, 2, 3, 4, 5].map(
    (star) => reviews.filter((r) => r.rating === star).length,
  );

  return { average, count: reviews.length, distribution };
}

// ---------------------------------------------------------------------------
// Cart queries
// ---------------------------------------------------------------------------

export async function getCartByUserId(userId: string) {
  return db.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          product: { select: { name: true, slug: true, images: true } },
          variant: {
            select: { sku: true, size: true, color: true, material: true },
          },
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });
}

export async function getOrCreateCart(userId: string, userEmail?: string) {
  const existing = await db.cart.findUnique({ where: { userId } });
  if (existing) return existing;

  return db.cart.create({
    data: {
      userId,
      userEmail,
    },
  });
}

// ---------------------------------------------------------------------------
// Wishlist queries
// ---------------------------------------------------------------------------

export async function getWishlistByUserId(userId: string) {
  return db.wishlist.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          product: {
            select: {
              id: true,
              name: true,
              slug: true,
              basePrice: true,
              images: true,
            },
          },
          variant: {
            select: { sku: true, size: true, color: true, material: true },
          },
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });
}

export async function getOrCreateWishlist(userId: string, userEmail?: string) {
  const existing = await db.wishlist.findUnique({ where: { userId } });
  if (existing) return existing;

  return db.wishlist.create({
    data: {
      userId,
      userEmail,
    },
  });
}

// ---------------------------------------------------------------------------
// Address queries
// ---------------------------------------------------------------------------

export async function getAddressesByUser(userId: string) {
  return db.address.findMany({
    where: { userId },
    orderBy: [{ isDefault: "desc" }, { createdAt: "desc" }],
  });
}

export async function getDefaultAddress(userId: string) {
  return db.address.findFirst({
    where: { userId, isDefault: true },
  });
}

// ---------------------------------------------------------------------------
// Coupon queries
// ---------------------------------------------------------------------------

export async function getCouponByCode(code: string) {
  const upperCode = code.toUpperCase().trim();
  return db.coupon.findUnique({
    where: { code: upperCode },
  });
}

export async function getActiveCoupons() {
  const now = new Date();
  return db.coupon.findMany({
    where: {
      isActive: true,
      startsAt: { lte: now },
      OR: [{ expiresAt: null }, { expiresAt: { gte: now } }],
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function validateCoupon(
  code: string,
  cartTotal: number,
  userId?: string,
) {
  const coupon = await getCouponByCode(code);

  if (!coupon || !coupon.isActive) {
    return { valid: false, error: "Invalid coupon code" };
  }

  const now = new Date();
  if (coupon.startsAt > now) {
    return { valid: false, error: "Coupon is not yet active" };
  }

  if (coupon.expiresAt && coupon.expiresAt < now) {
    return { valid: false, error: "Coupon has expired" };
  }

  if (coupon.minOrder && cartTotal < Number(coupon.minOrder)) {
    return {
      valid: false,
      error: `Minimum order of ₨${Number(coupon.minOrder).toLocaleString()} required`,
    };
  }

  if (coupon.maxUses && coupon.usesCount >= coupon.maxUses) {
    return { valid: false, error: "Coupon usage limit reached" };
  }

  if (userId && coupon.maxUsesPerUser) {
    const userUsageCount = await db.couponUsage.count({
      where: { userId, couponId: coupon.id },
    });
    if (userUsageCount >= coupon.maxUsesPerUser) {
      return { valid: false, error: "You have already used this coupon" };
    }
  }

  // Calculate discount amount
  let discountAmount = 0;
  if (coupon.type === "PERCENT") {
    discountAmount = (cartTotal * Number(coupon.value)) / 100;
    if (coupon.maxDiscount && discountAmount > Number(coupon.maxDiscount)) {
      discountAmount = Number(coupon.maxDiscount);
    }
  } else if (coupon.type === "FIXED") {
    discountAmount = Number(coupon.value);
  }
  // FREE_SHIPPING type — discount applied as free shipping, not amount off

  return {
    valid: true,
    coupon,
    discountAmount,
    freeShipping: coupon.type === "FREE_SHIPPING",
  };
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

// ---------------------------------------------------------------------------
// Admin queries
// ---------------------------------------------------------------------------

export async function getAllUsersWithStats() {
  const users = await db.user.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      sessions: {
        orderBy: { createdAt: "desc" },
        take: 1, // Most recent session for last login
      },
      _count: {
        select: { orders: true },
      },
    },
  });
  return users;
}

export async function getAdminStats() {
  const users = await db.user.count();
  const products = await db.product.count();
  const categories = await db.category.count();
  const orders = await db.order.count();
  const reviews = await db.review.count();
  const coupons = await db.coupon.count();

  return { users, products, categories, orders, reviews, coupons };
}
