"use server";

/**
 * Wishlist Server Actions — toggle + remove items.
 * All actions require authentication.
 */

import { revalidatePath } from "next/cache";
import { getSession } from "@/server/auth/config";
import { db } from "@/server/db";
import { toggleWishlistSchema, removeWishlistItemSchema } from "./schemas";

export async function toggleWishlist(formData: FormData) {
  const session = await getSession();
  if (!session) return { error: "Not authenticated" };

  const parsed = toggleWishlistSchema.safeParse({
    productId: formData.get("productId"),
    variantId: formData.get("variantId") || null,
  });
  if (!parsed.success) return { error: "Invalid input" };

  // Get or create wishlist
  let wishlist = await db.wishlist.findUnique({
    where: { userId: session.user.id },
  });
  if (!wishlist) {
    wishlist = await db.wishlist.create({
      data: { userId: session.user.id, userEmail: session.user.email },
    });
  }

  // Check if item already exists
  const existing = await db.wishlistItem.findFirst({
    where: {
      wishlistId: wishlist.id,
      productId: parsed.data.productId,
      variantId: parsed.data.variantId ?? null,
    },
  });

  if (existing) {
    // Remove from wishlist
    await db.wishlistItem.delete({ where: { id: existing.id } });
    revalidatePath("/account/wishlist");
    return { success: true, action: "removed" as const };
  }

  // Add to wishlist — need product info for denormalized columns
  const product = await db.product.findUnique({
    where: { id: parsed.data.productId },
    select: { name: true, slug: true },
  });
  if (!product) return { error: "Product not found" };

  let variantSku: string | null = null;
  let variantLabel: string | null = null;
  if (parsed.data.variantId) {
    const variant = await db.productVariant.findUnique({
      where: { id: parsed.data.variantId },
      select: { sku: true, size: true, color: true, material: true },
    });
    if (variant) {
      variantSku = variant.sku;
      variantLabel = [variant.size, variant.color, variant.material]
        .filter(Boolean)
        .join(" / ");
    }
  }

  await db.wishlistItem.create({
    data: {
      wishlistId: wishlist.id,
      productId: parsed.data.productId,
      variantId: parsed.data.variantId ?? null,
      productName: product.name,
      productSlug: product.slug,
      variantSku,
      variantLabel,
    },
  });

  revalidatePath("/account/wishlist");
  return { success: true, action: "added" as const };
}

export async function removeWishlistItem(formData: FormData) {
  const session = await getSession();
  if (!session) return { error: "Not authenticated" };

  const parsed = removeWishlistItemSchema.safeParse({
    itemId: formData.get("itemId"),
  });
  if (!parsed.success) return { error: "Invalid input" };

  const item = await db.wishlistItem.findUnique({
    where: { id: parsed.data.itemId },
    include: { wishlist: { select: { userId: true } } },
  });

  if (!item || item.wishlist.userId !== session.user.id) {
    return { error: "Item not found" };
  }

  await db.wishlistItem.delete({ where: { id: parsed.data.itemId } });

  revalidatePath("/account/wishlist");
  return { success: true };
}
