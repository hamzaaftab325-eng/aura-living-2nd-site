/**
 * Zod schemas for all Server Actions.
 * Every mutation is validated before hitting the database.
 */

import { z } from "zod";

// ---------------------------------------------------------------------------
// Profile
// ---------------------------------------------------------------------------

export const updateProfileSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128),
});

// ---------------------------------------------------------------------------
// Address
// ---------------------------------------------------------------------------

export const addressSchema = z.object({
  type: z.enum(["SHIPPING", "BILLING", "BOTH"]).default("BOTH"),
  firstName: z.string().min(1, "First name is required").max(50),
  lastName: z.string().min(1, "Last name is required").max(50),
  company: z.string().max(100).optional().or(z.literal("")),
  line1: z.string().min(1, "Address line 1 is required").max(200),
  line2: z.string().max(200).optional().or(z.literal("")),
  city: z.string().min(1, "City is required").max(100),
  state: z.string().min(1, "Province is required").max(100),
  postalCode: z.string().min(1, "Postal code is required").max(20),
  country: z.string().default("Pakistan"),
  phone: z.string().max(20).optional().or(z.literal("")),
  isDefault: z.boolean().default(false),
});

export const updateAddressSchema = addressSchema.extend({
  id: z.string().min(1),
});

export const deleteAddressSchema = z.object({
  id: z.string().min(1),
});

// ---------------------------------------------------------------------------
// Wishlist
// ---------------------------------------------------------------------------

export const toggleWishlistSchema = z.object({
  productId: z.string().min(1),
  variantId: z.string().optional().nullable(),
});

export const removeWishlistItemSchema = z.object({
  itemId: z.string().min(1),
});

// ---------------------------------------------------------------------------
// Cart (will be expanded in Phase 4)
// ---------------------------------------------------------------------------

export const addToCartSchema = z.object({
  productId: z.string().min(1),
  variantId: z.string().optional().nullable(),
  quantity: z.number().int().min(1).max(99).default(1),
});

export const updateCartQuantitySchema = z.object({
  itemId: z.string().min(1),
  quantity: z.number().int().min(1).max(99),
});

export const removeFromCartSchema = z.object({
  itemId: z.string().min(1),
});
