"use server";

/**
 * Address Server Actions — CRUD for user addresses.
 * All actions require authentication.
 */

import { revalidatePath } from "next/cache";
import { getSession } from "@/server/auth/config";
import { db } from "@/server/db";
import { addressSchema, deleteAddressSchema } from "./schemas";

export async function createAddress(formData: FormData) {
  const session = await getSession();
  if (!session) return { error: "Not authenticated" };

  const parsed = addressSchema.safeParse({
    type: formData.get("type") || "BOTH",
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    company: formData.get("company") || "",
    line1: formData.get("line1"),
    line2: formData.get("line2") || "",
    city: formData.get("city"),
    state: formData.get("state"),
    postalCode: formData.get("postalCode"),
    country: formData.get("country") || "Pakistan",
    phone: formData.get("phone") || "",
    isDefault: formData.get("isDefault") === "true",
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  // If this is the new default, unset existing defaults
  if (parsed.data.isDefault) {
    await db.address.updateMany({
      where: { userId: session.user.id, isDefault: true },
      data: { isDefault: false },
    });
  }

  // If this is the user's first address, make it default
  const count = await db.address.count({ where: { userId: session.user.id } });

  await db.address.create({
    data: {
      ...parsed.data,
      userId: session.user.id,
      userEmail: session.user.email,
      isDefault: parsed.data.isDefault || count === 0,
    },
  });

  revalidatePath("/account/addresses");
  return { success: true };
}

export async function deleteAddress(formData: FormData) {
  const session = await getSession();
  if (!session) return { error: "Not authenticated" };

  const parsed = deleteAddressSchema.safeParse({
    id: formData.get("id"),
  });
  if (!parsed.success) return { error: "Invalid address ID" };

  const address = await db.address.findUnique({
    where: { id: parsed.data.id },
    select: { userId: true, isDefault: true },
  });

  if (!address || address.userId !== session.user.id) {
    return { error: "Address not found" };
  }

  await db.address.delete({ where: { id: parsed.data.id } });

  // If deleted address was default, make the most recent address the new default
  if (address.isDefault) {
    const nextAddress = await db.address.findFirst({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    });
    if (nextAddress) {
      await db.address.update({
        where: { id: nextAddress.id },
        data: { isDefault: true },
      });
    }
  }

  revalidatePath("/account/addresses");
  return { success: true };
}

export async function setDefaultAddress(formData: FormData) {
  const session = await getSession();
  if (!session) return { error: "Not authenticated" };

  const id = formData.get("id") as string;
  if (!id) return { error: "Invalid address ID" };

  // Unset all defaults
  await db.address.updateMany({
    where: { userId: session.user.id },
    data: { isDefault: false },
  });

  // Set new default
  await db.address.update({
    where: { id },
    data: { isDefault: true },
  });

  revalidatePath("/account/addresses");
  return { success: true };
}
