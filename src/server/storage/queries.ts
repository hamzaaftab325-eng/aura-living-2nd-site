/**
 * Storage query helpers — typed upload utilities for each use case.
 *
 * Usage:
 *   import { uploadProductImage, uploadAvatar, uploadReviewImage } from "@/server/storage";
 *
 *   // In a Server Action:
 *   const formData = await request.formData();
 *   const file = formData.get("image") as File;
 *   const buffer = Buffer.from(await file.arrayBuffer());
 *   const result = await uploadProductImage(buffer, "lumen-pendant");
 *   // result.url = optimized Cloudinary URL
 */

import { storage } from "./client";
import type { UploadResult } from "./types";

// ---------------------------------------------------------------------------
// Product Images
// ---------------------------------------------------------------------------

export async function uploadProductImage(
  buffer: Buffer,
  productSlug: string,
  index?: number,
): Promise<UploadResult> {
  const publicId = index
    ? `${productSlug}-${index}`
    : `${productSlug}-${Date.now()}`;
  return storage.uploadBuffer(buffer, {
    folder: "aura-living/products",
    publicId,
    tags: ["product", productSlug],
  });
}

// ---------------------------------------------------------------------------
// User Avatars
// ---------------------------------------------------------------------------

export async function uploadAvatar(
  buffer: Buffer,
  userId: string,
): Promise<UploadResult> {
  // Delete old avatar first (if exists) — Cloudinary overwrites same public_id
  return storage.uploadBuffer(buffer, {
    folder: "aura-living/avatars",
    publicId: userId,
    tags: ["avatar", userId],
    transformation: "w_400,h_400,c_fill,g_face,q_auto,f_auto", // Square crop, face-focused
  });
}

// ---------------------------------------------------------------------------
// Review Images
// ---------------------------------------------------------------------------

export async function uploadReviewImage(
  buffer: Buffer,
  reviewId: string,
  index: number,
): Promise<UploadResult> {
  return storage.uploadBuffer(buffer, {
    folder: "aura-living/reviews",
    publicId: `${reviewId}-${index}`,
    tags: ["review", reviewId],
    transformation: "w_1080,q_auto,f_auto", // Max 1080px wide
  });
}

// ---------------------------------------------------------------------------
// Admin Assets (hero banners, editorial images, etc.)
// ---------------------------------------------------------------------------

export async function uploadAdminAsset(
  buffer: Buffer,
  name: string,
): Promise<UploadResult> {
  return storage.uploadBuffer(buffer, {
    folder: "aura-living/admin",
    publicId: `${name}-${Date.now()}`,
    tags: ["admin", name],
  });
}

// ---------------------------------------------------------------------------
// Delete helpers
// ---------------------------------------------------------------------------

export async function deleteImage(publicId: string): Promise<void> {
  return storage.delete(publicId);
}

// ---------------------------------------------------------------------------
// URL helpers — generate optimized URLs for different use cases
// ---------------------------------------------------------------------------

/**
 * Generate a thumbnail URL (400px wide, auto quality + format).
 * Use for: product cards in grids, cart items, wishlist.
 */
export function getThumbnailUrl(publicId: string): string {
  return storage.getOptimizedUrl(publicId, {
    width: 400,
    quality: "auto",
    crop: "limit",
  });
}

/**
 * Generate a medium URL (800px wide, auto quality + format).
 * Use for: product detail page main image, category cards.
 */
export function getMediumUrl(publicId: string): string {
  return storage.getOptimizedUrl(publicId, {
    width: 800,
    quality: "auto",
    crop: "limit",
  });
}

/**
 * Generate a large URL (1200px wide, high quality, auto format).
 * Use for: hero images, full-width editorial banners.
 */
export function getLargeUrl(publicId: string): string {
  return storage.getOptimizedUrl(publicId, {
    width: 1200,
    quality: "auto:high",
    crop: "limit",
  });
}

/**
 * Generate a square crop URL (used for avatars, category tiles).
 * Use for: user avatars, 1:1 product thumbnails.
 */
export function getSquareUrl(publicId: string, size = 400): string {
  return storage.getOptimizedUrl(publicId, {
    width: size,
    height: size,
    quality: "auto",
    crop: "fill",
  });
}
