/**
 * Create Admin User Script.
 *
 * Creates the admin user via Better Auth (handles password hashing via bcrypt).
 * Idempotent — if admin already exists with credentials, just ensures role.
 * If admin exists WITHOUT credentials (e.g., from seed), deletes + recreates.
 *
 * Run: bun run scripts/create-admin.ts
 *
 * The script will print the admin credentials at the end.
 * CHANGE THE PASSWORD IMMEDIATELY after first login in production.
 */

import { auth } from "../src/server/auth/config";
import { db } from "../src/server/db";

// ---------------------------------------------------------------------------
// Admin credentials — change these for production
// ---------------------------------------------------------------------------
const ADMIN_EMAIL = "admin@auraliving.pk";
const ADMIN_NAME = "Aura Living Admin";
const ADMIN_PASSWORD = "Aura@Admin2026!"; // Meets min 8 chars + mixed case + symbol

async function main() {
  console.log("\n🔑 Aura Living — Admin User Creation\n");

  // Check if admin already exists with a credential account
  const existing = await db.user.findUnique({
    where: { email: ADMIN_EMAIL },
    include: { accounts: true },
  });

  if (existing) {
    const hasCredentials = existing.accounts.some(
      (a) => a.providerId === "credential",
    );

    if (hasCredentials) {
      console.log(`→ Admin already exists with credentials: ${ADMIN_EMAIL}`);
      // Ensure role is ADMIN
      if (existing.role !== "ADMIN") {
        await db.user.update({
          where: { id: existing.id },
          data: { role: "ADMIN", name: ADMIN_NAME },
        });
        console.log("  ✓ Updated role to ADMIN");
      }
      printCredentials();
      return;
    }

    // Admin exists without credentials (from seed) — delete and recreate via Better Auth
    console.log(
      `→ Admin exists without credentials (likely from seed). Deleting + recreating...`,
    );
    await db.user.delete({ where: { id: existing.id } });
    console.log("  ✓ Deleted old admin user");
  }

  // Create admin via Better Auth signUpEmail (handles bcrypt hashing)
  console.log(`→ Creating admin user: ${ADMIN_EMAIL}`);
  const result = await auth.api.signUpEmail({
    body: {
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      name: ADMIN_NAME,
    },
  });

  if (!result) {
    console.error("❌ No response from Better Auth");
    process.exit(1);
  }

  // Update role to ADMIN (Better Auth creates as CUSTOMER by default)
  const user = await db.user.findUnique({
    where: { email: ADMIN_EMAIL },
  });

  if (!user) {
    console.error("❌ User was not created");
    process.exit(1);
  }

  await db.user.update({
    where: { id: user.id },
    data: { role: "ADMIN", emailVerified: true },
  });

  console.log("  ✓ Admin user created with ADMIN role + credential account");
  printCredentials();
}

function printCredentials() {
  console.log("\n========================================");
  console.log("🔑 ADMIN CREDENTIALS");
  console.log("========================================");
  console.log(`Email:    ${ADMIN_EMAIL}`);
  console.log(`Password: ${ADMIN_PASSWORD}`);
  console.log("========================================");
  console.log("Login URL: http://localhost:3000/sign-in");
  console.log("Admin URL: http://localhost:3000/admin");
  console.log("========================================");
  console.log("\n⚠  CHANGE THIS PASSWORD after first login in production.");
  console.log("⚠  Do NOT commit this password to git.\n");
}

main()
  .catch((error) => {
    console.error("\n❌ Script failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
