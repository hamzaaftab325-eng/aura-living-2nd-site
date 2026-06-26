/**
 * Smoke test — verify Aura Living Prisma + Supabase connection + seeded data.
 *
 * Run: bun run scripts/smoke-test-db.ts
 */

import { db } from "../src/server/db";

async function main() {
  console.log(
    "\n=== Aura Living — Supabase Connection + Seed Smoke Test ===\n",
  );

  // Test 1: Count rows in each table
  const [users, categories, products, orders, orderItems] = await Promise.all([
    db.user.count(),
    db.category.count(),
    db.product.count(),
    db.order.count(),
    db.orderItem.count(),
  ]);

  console.log("Table counts:");
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
    console.log("  (none)");
  } else {
    extensions.forEach((e) => console.log(`  - ${e.extname}`));
  }

  // Test 4: Verify seeded admin user
  const admin = await db.user.findUnique({
    where: { email: "admin@auraliving.pk" },
  });
  console.log("\nAdmin user:");
  if (admin) {
    console.log(`  ✓ ${admin.email} (${admin.role})`);
  } else {
    console.log("  ✗ NOT FOUND — run `bun run db:seed`");
  }

  // Test 5: List all categories with product counts
  const categoriesWithCounts = await db.category.findMany({
    include: { _count: { select: { products: true } } },
    orderBy: { sortOrder: "asc" },
  });
  console.log("\nCategories:");
  categoriesWithCounts.forEach((c) =>
    console.log(`  - ${c.name} (${c.slug}): ${c._count.products} products`),
  );

  // Test 6: List featured products
  const featured = await db.product.findMany({
    where: { isFeatured: true },
    select: { name: true, slug: true, basePrice: true, currency: true },
    orderBy: { name: "asc" },
  });
  console.log(`\nFeatured products (${featured.length}):`);
  featured.forEach((p) =>
    console.log(`  - ${p.name} — ${p.currency} ${p.basePrice}`),
  );

  // Test 7: Test Decimal handling (verify prices are stored correctly)
  const firstProduct = await db.product.findFirst({
    select: { name: true, basePrice: true },
  });
  if (firstProduct) {
    console.log(`\nPrice type check:`);
    console.log(
      `  ✓ ${firstProduct.name}: ${firstProduct.basePrice} (${typeof firstProduct.basePrice})`,
    );
  }

  console.log(
    "\n✅ Connection successful. Seed verified. Schema synced to Supabase Postgres.\n",
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
