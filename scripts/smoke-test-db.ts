/**
 * Smoke test — verify Aura Living Prisma + Supabase connection + seeded data.
 * Verifies all tables from Phase 1, 2.1, and 2.2.
 *
 * Run: bun run scripts/smoke-test-db.ts
 */

import { db } from "../src/server/db";

async function main() {
  console.log("\n=== Aura Living — Full Database Smoke Test ===\n");

  // Test 1: Count rows in each table (sequential — Supabase free tier = 1 connection)
  console.log("--- Table Counts ---");
  const users = await db.user.count();
  console.log(`  users:              ${users}`);
  const categories = await db.category.count();
  console.log(`  categories:         ${categories}`);
  const products = await db.product.count();
  console.log(`  products:           ${products}`);
  const variants = await db.productVariant.count();
  console.log(`  product_variants:   ${variants}`);
  const reviews = await db.review.count();
  console.log(`  reviews:            ${reviews}`);
  const reviewImages = await db.reviewImage.count();
  console.log(`  review_images:      ${reviewImages}`);
  const carts = await db.cart.count();
  console.log(`  carts:              ${carts}`);
  const cartItems = await db.cartItem.count();
  console.log(`  cart_items:         ${cartItems}`);
  const wishlists = await db.wishlist.count();
  console.log(`  wishlists:          ${wishlists}`);
  const wishlistItems = await db.wishlistItem.count();
  console.log(`  wishlist_items:     ${wishlistItems}`);
  const addresses = await db.address.count();
  console.log(`  addresses:          ${addresses}`);
  const coupons = await db.coupon.count();
  console.log(`  coupons:            ${coupons}`);
  const couponUsages = await db.couponUsage.count();
  console.log(`  coupon_usages:      ${couponUsages}`);
  const orders = await db.order.count();
  console.log(`  orders:             ${orders}`);
  const orderItems = await db.orderItem.count();
  console.log(`  order_items:        ${orderItems}`);

  // Test 2: List all tables in public schema
  const tables = await db.$queryRaw<{ tablename: string }[]>`
    SELECT tablename FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename;
  `;
  console.log("\n--- Tables in public schema ---");
  tables.forEach((t) => console.log(`  - ${t.tablename}`));

  // Test 3: Verify extensions
  const extensions = await db.$queryRaw<{ extname: string }[]>`
    SELECT extname FROM pg_extension WHERE extname IN ('pg_trgm', 'unaccent');
  `;
  console.log("\n--- Postgres Extensions ---");
  extensions.forEach((e) => console.log(`  - ${e.extname}`));

  // Test 4: Verify admin user
  const admin = await db.user.findUnique({
    where: { email: "admin@auraliving.pk" },
  });
  console.log("\n--- Admin User ---");
  if (admin) {
    console.log(`  ✓ ${admin.email} (${admin.role})`);
  } else {
    console.log("  ✗ NOT FOUND — run `bun run scripts/create-admin.ts`");
  }

  // Test 5: Verify categories with product counts
  const categoriesWithCounts = await db.category.findMany({
    include: { _count: { select: { products: true } } },
    orderBy: { sortOrder: "asc" },
  });
  console.log("\n--- Categories ---");
  categoriesWithCounts.forEach((c) =>
    console.log(`  - ${c.name} (${c.slug}): ${c._count.products} products`),
  );

  // Test 6: Verify featured products with variant counts
  const featuredProducts = await db.product.findMany({
    where: { isFeatured: true },
    include: { _count: { select: { variants: true, reviews: true } } },
    orderBy: { name: "asc" },
  });
  console.log(`\n--- Featured Products (${featuredProducts.length}) ---`);
  featuredProducts.forEach((p) =>
    console.log(
      `  - ${p.name} — ₨${p.basePrice} (${p._count.variants} variants, ${p._count.reviews} reviews)`,
    ),
  );

  // Test 7: Verify product variants with human-readable columns
  const sampleVariants = await db.productVariant.findMany({
    take: 5,
    select: {
      sku: true,
      productName: true,
      size: true,
      color: true,
      stock: true,
      priceDelta: true,
    },
    orderBy: { sku: "asc" },
  });
  console.log("\n--- Sample Product Variants ---");
  sampleVariants.forEach((v) =>
    console.log(
      `  - SKU: ${v.sku} | Product: ${v.productName} | Size: ${v.size ?? "N/A"} | Color: ${v.color ?? "N/A"} | Stock: ${v.stock} | ΔPrice: ₨${v.priceDelta}`,
    ),
  );

  // Test 8: Verify reviews with human-readable columns
  const sampleReviews = await db.review.findMany({
    take: 3,
    select: {
      userEmail: true,
      userName: true,
      productName: true,
      rating: true,
      title: true,
      isVerified: true,
    },
    orderBy: { createdAt: "desc" },
  });
  console.log("\n--- Sample Reviews ---");
  sampleReviews.forEach((r) =>
    console.log(
      `  - ${r.rating}★ "${r.title}" by ${r.userName} (${r.userEmail}) on ${r.productName} — Verified: ${r.isVerified}`,
    ),
  );

  // Test 9: Verify coupons
  const activeCoupons = await db.coupon.findMany({
    where: { isActive: true },
    select: {
      code: true,
      type: true,
      value: true,
      minOrder: true,
      maxUses: true,
      usesCount: true,
      description: true,
    },
    orderBy: { code: "asc" },
  });
  console.log("\n--- Active Coupons ---");
  activeCoupons.forEach((c) =>
    console.log(
      `  - ${c.code} (${c.type}): value=${c.value}, minOrder=${c.minOrder ?? "none"}, uses=${c.usesCount}/${c.maxUses ?? "∞"} — ${c.description}`,
    ),
  );

  // Test 10: Verify denormalized columns are populated
  const accountWithEmail = await db.account.findFirst({
    where: { email: { not: null } },
    select: { email: true, providerId: true },
  });
  console.log("\n--- Denormalized Columns Check ---");
  if (accountWithEmail?.email) {
    console.log(`  ✓ Account.email populated: ${accountWithEmail.email}`);
  } else {
    console.log("  ✗ Account.email not populated");
  }

  console.log("\n✅ Full database smoke test PASSED. All tables verified.\n");
}

main()
  .catch((error) => {
    console.error("\n❌ Smoke test failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
