/**
 * Test admin login directly via Better Auth (bypasses HTTP server).
 *
 * Verifies that:
 *   1. The admin user exists in DB with credential account
 *   2. The password hash is valid (via Better Auth's verifyPassword)
 *   3. Better Auth can authenticate the credentials
 */

import { auth } from "../src/server/auth/config";
import { db } from "../src/server/db";
import { verifyPassword } from "better-auth/crypto";

const ADMIN_EMAIL = "admin@auraliving.pk";
const ADMIN_PASSWORD = "Aura@Admin2026!";

async function main() {
  console.log("\n=== Direct Auth Verification ===\n");

  // 1. Check user exists in DB
  const user = await db.user.findUnique({
    where: { email: ADMIN_EMAIL },
    include: { accounts: true },
  });

  if (!user) {
    console.error(`❌ User not found: ${ADMIN_EMAIL}`);
    console.error("   Run: bun run scripts/create-admin.ts");
    process.exit(1);
  }
  console.log(`✓ User found: ${user.email} (${user.role})`);
  console.log(`  Role: ${user.role}`);
  console.log(`  Email verified: ${user.emailVerified}`);

  // 2. Check credential account exists
  const credentialAccount = user.accounts.find(
    (a) => a.providerId === "credential",
  );
  if (!credentialAccount) {
    console.error(`❌ No credential account found for ${ADMIN_EMAIL}`);
    process.exit(1);
  }
  console.log(`✓ Credential account found`);

  // 3. Verify password hash via Better Auth's verifyPassword (scrypt-based)
  if (!credentialAccount.password) {
    console.error(`❌ Password hash is null`);
    process.exit(1);
  }
  console.log(
    `✓ Password hash stored (${credentialAccount.password.substring(0, 30)}...)`,
  );

  const passwordMatches = await verifyPassword({
    hash: credentialAccount.password,
    password: ADMIN_PASSWORD,
  });
  if (!passwordMatches) {
    console.error(`❌ Password does not match hash`);
    process.exit(1);
  }
  console.log(`✓ Password matches hash (scrypt verified)`);

  // 4. Test Better Auth sign-in API directly
  console.log(`\n→ Testing Better Auth signInEmail API...`);
  try {
    const result = await auth.api.signInEmail({
      body: {
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
      },
      headers: new Headers(),
    });

    if (result && "user" in result) {
      console.log(`✓ Better Auth sign-in succeeded`);
      console.log(`  User ID: ${result.user.id}`);
      console.log(`  Email: ${result.user.email}`);
      console.log(`  Name: ${result.user.name}`);
      if (result.token) {
        console.log(`  Session token: ${result.token.substring(0, 30)}...`);
      }
    } else {
      console.error(`❌ Sign-in returned unexpected result:`, result);
      process.exit(1);
    }
  } catch (error) {
    console.error(`❌ Better Auth sign-in failed:`, error);
    process.exit(1);
  }

  console.log("\n✅ Auth verification PASSED — admin login works correctly.\n");
  console.log("========================================");
  console.log("🔑 ADMIN CREDENTIALS (verified working)");
  console.log("========================================");
  console.log(`Email:    ${ADMIN_EMAIL}`);
  console.log(`Password: ${ADMIN_PASSWORD}`);
  console.log("========================================");
  console.log("Login URL: http://localhost:3000/sign-in");
  console.log("Admin URL: http://localhost:3000/admin");
  console.log("========================================");
  console.log("");
}

main()
  .catch((error) => {
    console.error("\n❌ Test failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
