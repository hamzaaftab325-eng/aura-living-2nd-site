/**
 * Smoke test — verify Aura Living Prisma + Supabase connection.
 * Lists all tables created by db:push.
 *
 * Run: bun run scripts/smoke-test-db.ts
 */

import { db } from "../src/lib/db";

async function main() {
  console.log("\n=== Aura Living — Supabase Connection Smoke Test ===\n");

  // Test 1: Count rows in each table (should be 0 since we haven't seeded)
  const [users, categories, products, orders, orderItems] = await Promise.all([
    db.user.count(),
    db.category.count(),
    db.product.count(),
    db.order.count(),
    db.orderItem.count(),
  ]);

  console.log("Table counts (should all be 0):");
  console.log(`  users:        ${users}`);
  console.log(`  categories:   ${categories}`);
  console.log(`  products:     ${products}`);
  console.log(`  orders:       ${orders}`);
  console.log(`  order_items:  ${orderItems}`);

  // Test 2: List actual Postgres tables
  const tables = await db.$queryRaw<{ tablename: string }[]>`
    SELECT tablename FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename;
  `;
  console.log("\nTables in public schema:");
  tables.forEach((t) => console.log(`  - ${t.tablename}`));

  // Test 3: Test Postgres extensions (pg_trgm + unaccent for Phase 2 FTS)
  const extensions = await db.$queryRaw<{ extname: string }[]>`
    SELECT extname FROM pg_extension WHERE extname IN ('pg_trgm', 'unaccent');
  `;
  console.log("\nInstalled extensions:");
  if (extensions.length === 0) {
    console.log(
      "  (pg_trgm and unaccent not yet installed — will enable in Phase 2)",
    );
  } else {
    extensions.forEach((e) => console.log(`  - ${e.extname}`));
  }

  console.log(
    "\n✅ Connection successful. Schema synced to Supabase Postgres.\n",
  );
}

main()
  .catch((error) => {
    console.error("\n❌ Smoke test failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
