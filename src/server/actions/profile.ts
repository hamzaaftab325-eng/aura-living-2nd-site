"use server";

/**
 * Profile Server Actions — update name + change password.
 * All actions require authentication via getSession().
 */

import { revalidatePath } from "next/cache";
import { auth, getSession } from "@/server/auth/config";
import { db } from "@/server/db";
import { updateProfileSchema, changePasswordSchema } from "./schemas";

export async function updateProfile(formData: FormData) {
  const session = await getSession();
  if (!session) return { error: "Not authenticated" };

  const parsed = updateProfileSchema.safeParse({
    name: formData.get("name"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  await db.user.update({
    where: { id: session.user.id },
    data: { name: parsed.data.name },
  });

  revalidatePath("/account/profile");
  revalidatePath("/account");
  revalidatePath("/admin/users");
  return { success: true };
}

export async function changePassword(formData: FormData) {
  const session = await getSession();
  if (!session) return { error: "Not authenticated" };

  const parsed = changePasswordSchema.safeParse({
    currentPassword: formData.get("currentPassword"),
    newPassword: formData.get("newPassword"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  try {
    await auth.api.changePassword({
      headers: await import("next/headers").then((m) => m.headers()),
      body: {
        currentPassword: parsed.data.currentPassword,
        newPassword: parsed.data.newPassword,
      },
    });
    return { success: true };
  } catch {
    return { error: "Current password is incorrect" };
  }
}
