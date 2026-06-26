/**
 * Aura Living — Database Seed Script
 *
 * Seeds Supabase Postgres with:
 *   • 1 admin user (for development/testing)
 *   • 8 categories (matching navigation config)
 *   • 16 products (2 per category, with images, materials, dimensions, care)
 *
 * Idempotent: uses upsert — safe to run multiple times.
 *
 * Run: bun run db:seed
 * Reset + seed: bun run db:reset (then bun run db:seed)
 */

import { db } from "../src/server/db";
import { Prisma } from "@prisma/client";

// ---------------------------------------------------------------------------
// Admin user — created via `bun run scripts/create-admin.ts` (handles bcrypt).
// The seed script only creates categories + products (no users).
// ---------------------------------------------------------------------------
// (Admin user creation handled separately — see scripts/create-admin.ts)

// ---------------------------------------------------------------------------
// 8 Categories — matches src/config/navigation.ts
// ---------------------------------------------------------------------------
const CATEGORIES = [
  {
    slug: "lighting",
    name: "Lighting",
    sortOrder: 1,
    imageUrl: "/images/cat-lighting.png",
  },
  {
    slug: "seating",
    name: "Seating",
    sortOrder: 2,
    imageUrl: "/images/cat-seating.png",
  },
  {
    slug: "tables",
    name: "Tables",
    sortOrder: 3,
    imageUrl: "/images/cat-tables.png",
  },
  {
    slug: "storage",
    name: "Storage",
    sortOrder: 4,
    imageUrl: "/images/cat-storage.png",
  },
  {
    slug: "textiles",
    name: "Textiles",
    sortOrder: 5,
    imageUrl: "/images/cat-textiles.png",
  },
  {
    slug: "decor",
    name: "Decor",
    sortOrder: 6,
    imageUrl: "/images/cat-decor.png",
  },
  {
    slug: "mirrors",
    name: "Mirrors",
    sortOrder: 7,
    imageUrl: "/images/cat-mirrors.png",
  },
  {
    slug: "outdoor",
    name: "Outdoor",
    sortOrder: 8,
    imageUrl: "/images/cat-outdoor.png",
  },
];

// ---------------------------------------------------------------------------
// 16 Products — 2 per category, luxury decor
// ---------------------------------------------------------------------------
const PRODUCTS = [
  // Lighting
  {
    slug: "lumen-pendant",
    name: "Lumen Pendant",
    description:
      "A hand-spun brass pendant with linen diffuser. Casts a warm, even glow suited to dining nooks and entryways. Each piece is finished by hand in our Lahore atelier.",
    basePrice: 45000,
    categorySlug: "lighting",
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=900&q=80",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=900&q=80",
    ],
    materials: ["Brass", "Linen"],
    dimensions: "Ø 28cm × H 32cm",
    careInstructions:
      "Wipe with a dry microfiber cloth. Avoid water on brass. Refinish annually with brass polish if patina develops.",
    isFeatured: true,
  },
  {
    slug: "brass-table-lamp",
    name: "Brass Table Lamp",
    description:
      "Solid brass column with a hand-stitched linen shade. Designed for console tables and reading nooks where the lamp itself becomes a sculptural object.",
    basePrice: 32000,
    categorySlug: "lighting",
    images: [
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=900&q=80",
    ],
    materials: ["Brass", "Linen"],
    dimensions: "W 22cm × D 22cm × H 48cm",
    careInstructions:
      "Dust weekly with a soft cloth. Brass will develop a natural patina over time — polish with brass cleaner to restore original sheen.",
    isFeatured: false,
  },
  // Seating
  {
    slug: "velvet-lounge-chair",
    name: "Velvet Lounge Chair",
    description:
      "A low-profile lounge chair upholstered in deep pile velvet, with a hand-finished walnut frame. The seat is sprung by hand for a comfort that softens gracefully over years of use.",
    basePrice: 125000,
    categorySlug: "seating",
    images: [
      "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=900&q=80",
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=900&q=80",
    ],
    materials: ["Velvet", "Walnut"],
    dimensions: "W 78cm × D 84cm × H 72cm",
    careInstructions:
      "Vacuum velvet weekly on low suction. Blot spills immediately — never rub. Keep out of direct sunlight to prevent fading.",
    isFeatured: true,
  },
  {
    slug: "linen-armchair",
    name: "Linen Armchair",
    description:
      "A pared-back armchair in oatmeal linen with oak legs. Designed for living rooms where the chair must read as furniture, not decoration.",
    basePrice: 88000,
    categorySlug: "seating",
    images: [
      "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=900&q=80",
    ],
    materials: ["Linen", "Oak"],
    dimensions: "W 72cm × D 78cm × H 76cm",
    careInstructions:
      "Vacuum weekly. Professional dry-clean recommended for stains. Rotate cushions monthly for even wear.",
    isFeatured: false,
  },
  // Tables
  {
    slug: "oak-side-table",
    name: "Oak Side Table",
    description:
      "A solid oak side table with through-tenoned joinery. The top is hand-planed, leaving visible the maker's marks. Designed to sit beside a sofa or bed.",
    basePrice: 38000,
    categorySlug: "tables",
    images: [
      "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=900&q=80",
    ],
    materials: ["Oak"],
    dimensions: "W 45cm × D 45cm × H 52cm",
    careInstructions:
      "Dust with a dry cloth. Use coasters for drinks. Re-oil annually with food-safe wax oil to maintain the finish.",
    isFeatured: false,
  },
  {
    slug: "walnut-console",
    name: "Walnut Console",
    description:
      "A long console in solid walnut with a hand-rubbed oil finish. Suited to entryways and hallways where its long line can be appreciated.",
    basePrice: 95000,
    categorySlug: "tables",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=80",
    ],
    materials: ["Walnut"],
    dimensions: "W 120cm × D 35cm × H 78cm",
    careInstructions:
      "Dust with a dry cloth. Re-oil annually. Avoid direct sunlight to prevent uneven fading.",
    isFeatured: true,
  },
  // Storage
  {
    slug: "oak-bookshelf",
    name: "Oak Bookshelf",
    description:
      "A five-shelf bookcase in solid oak with hand-cut dovetail joinery. Designed to be loaded with books without sagging.",
    basePrice: 110000,
    categorySlug: "storage",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=80",
    ],
    materials: ["Oak"],
    dimensions: "W 90cm × D 32cm × H 180cm",
    careInstructions:
      "Dust weekly. Distribute weight evenly across shelves. Secure to wall with provided anti-tip hardware.",
    isFeatured: false,
  },
  {
    slug: "walnut-sideboard",
    name: "Walnut Sideboard",
    description:
      "A two-door sideboard in walnut with hand-forged brass pulls. Interior is divided for tableware storage.",
    basePrice: 145000,
    categorySlug: "storage",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=80",
    ],
    materials: ["Walnut", "Brass"],
    dimensions: "W 160cm × D 45cm × H 72cm",
    careInstructions:
      "Dust with a dry cloth. Clean brass pulls with brass polish. Re-oil walnut annually.",
    isFeatured: false,
  },
  // Textiles
  {
    slug: "linen-throw",
    name: "Linen Throw",
    description:
      "A hand-loomed linen throw in oatmeal. Heavy enough for use as a light blanket, light enough to drape across the back of a chair.",
    basePrice: 8500,
    categorySlug: "textiles",
    images: [
      "https://images.unsplash.com/photo-1600369671236-e74521d4b6ad?w=900&q=80",
    ],
    materials: ["Linen"],
    dimensions: "W 130cm × L 180cm",
    careInstructions:
      "Machine wash cold on delicate. Hang dry. Iron on low while slightly damp. Softens with each wash.",
    isFeatured: true,
  },
  {
    slug: "wool-area-rug",
    name: "Wool Area Rug",
    description:
      "A hand-knotted wool rug in a low-key geometric pattern. Made by third-generation weavers in northern Pakistan.",
    basePrice: 78000,
    categorySlug: "textiles",
    images: [
      "https://images.unsplash.com/photo-1600369671236-e74521d4b6ad?w=900&q=80",
    ],
    materials: ["Wool"],
    dimensions: "W 180cm × L 270cm",
    careInstructions:
      "Vacuum weekly without beater bar. Rotate every 6 months. Professional cleaning only.",
    isFeatured: false,
  },
  // Decor
  {
    slug: "marble-vase",
    name: "Marble Vase",
    description:
      "A turned marble vase in creamy off-white. Each piece is carved from a single block, with natural veining unique to each vase.",
    basePrice: 18500,
    categorySlug: "decor",
    images: [
      "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=900&q=80",
    ],
    materials: ["Marble"],
    dimensions: "Ø 14cm × H 28cm",
    careInstructions:
      "Wipe with a damp cloth. Use only pH-neutral cleaners. Marble is porous — dry the inside after use with fresh flowers.",
    isFeatured: false,
  },
  {
    slug: "ceramic-bowl",
    name: "Ceramic Bowl",
    description:
      "A hand-thrown stoneware bowl with a matte glaze. Suited to display or as a fruit bowl.",
    basePrice: 12500,
    categorySlug: "decor",
    images: [
      "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=900&q=80",
    ],
    materials: ["Stoneware"],
    dimensions: "Ø 26cm × H 10cm",
    careInstructions:
      "Hand wash recommended. Not for use in microwave or oven.",
    isFeatured: false,
  },
  // Mirrors
  {
    slug: "arch-floor-mirror",
    name: "Arch Floor Mirror",
    description:
      "A full-length arched mirror in a hand-finished oak frame. Leans against the wall with a discreet anti-slip base.",
    basePrice: 88000,
    categorySlug: "mirrors",
    images: [
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=900&q=80",
    ],
    materials: ["Oak", "Glass"],
    dimensions: "W 80cm × D 6cm × H 180cm",
    careInstructions:
      "Clean glass with glass cleaner. Dust frame weekly. Secure to wall with provided anti-tip strap.",
    isFeatured: true,
  },
  {
    slug: "round-brass-mirror",
    name: "Round Brass Mirror",
    description:
      "A circular mirror with a slim hand-spun brass frame. Suited to entryways and bathrooms.",
    basePrice: 42000,
    categorySlug: "mirrors",
    images: [
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=900&q=80",
    ],
    materials: ["Brass", "Glass"],
    dimensions: "Ø 60cm × D 4cm",
    careInstructions:
      "Clean glass with glass cleaner. Polish brass frame with brass polish to maintain shine.",
    isFeatured: false,
  },
  // Outdoor
  {
    slug: "teak-bench",
    name: "Teak Bench",
    description:
      "A solid teak bench for terraces and entry porches. Teak is naturally weather-resistant and will silver gracefully with exposure.",
    basePrice: 135000,
    categorySlug: "outdoor",
    images: [
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=900&q=80",
    ],
    materials: ["Teak"],
    dimensions: "W 150cm × D 48cm × H 84cm",
    careInstructions:
      "Allow to weather naturally to a silver patina. To restore original color, clean with teak cleaner annually.",
    isFeatured: false,
  },
  {
    slug: "terracotta-planter",
    name: "Terracotta Planter",
    description:
      "A hand-thrown terracotta planter in a warm earth tone. Drainage hole included. Suited to indoor or covered outdoor use.",
    basePrice: 22000,
    categorySlug: "outdoor",
    images: [
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=900&q=80",
    ],
    materials: ["Terracotta"],
    dimensions: "Ø 36cm × H 42cm",
    careInstructions:
      "Frost-sensitive — bring indoors before first frost. Clean with a stiff brush and water.",
    isFeatured: false,
  },
];

// ---------------------------------------------------------------------------
// Seeder
// ---------------------------------------------------------------------------
// Note: Admin user is created via `bun run scripts/create-admin.ts`
// which uses Better Auth's signUpEmail for proper bcrypt password hashing.

async function seedCategories() {
  console.log(`→ Seeding ${CATEGORIES.length} categories...`);
  const results = [];
  for (const cat of CATEGORIES) {
    const created = await db.category.upsert({
      where: { slug: cat.slug },
      update: {
        name: cat.name,
        imageUrl: cat.imageUrl,
        sortOrder: cat.sortOrder,
      },
      create: cat,
    });
    results.push(created);
  }
  console.log(`  ✓ ${results.length} categories seeded`);
  return results;
}

async function seedProducts(categories: { id: string; slug: string }[]) {
  console.log(`→ Seeding ${PRODUCTS.length} products...`);
  const categoryMap = new Map(categories.map((c) => [c.slug, c.id]));

  let count = 0;
  for (const product of PRODUCTS) {
    const categoryId = categoryMap.get(product.categorySlug);
    if (!categoryId) {
      console.warn(`  ⚠ Skipping ${product.slug} — category not found`);
      continue;
    }

    const { categorySlug, ...productData } = product;

    await db.product.upsert({
      where: { slug: product.slug },
      update: {
        name: productData.name,
        description: productData.description,
        basePrice: new Prisma.Decimal(productData.basePrice),
        images: productData.images,
        materials: productData.materials,
        dimensions: productData.dimensions,
        careInstructions: productData.careInstructions,
        isFeatured: productData.isFeatured,
        status: "ACTIVE",
        categoryId,
      },
      create: {
        slug: productData.slug,
        name: productData.name,
        description: productData.description,
        basePrice: new Prisma.Decimal(productData.basePrice),
        currency: "PKR",
        status: "ACTIVE",
        images: productData.images,
        materials: productData.materials,
        dimensions: productData.dimensions,
        careInstructions: productData.careInstructions,
        isFeatured: productData.isFeatured,
        categoryId,
      },
    });
    count++;
  }
  console.log(`  ✓ ${count} products seeded`);
}

async function printSummary() {
  console.log("\n=== Seed Summary ===");
  // Run counts sequentially — Supabase free tier limits to 1 connection
  const users = await db.user.count();
  const categories = await db.category.count();
  const products = await db.product.count();
  const variants = await db.productVariant.count();
  const reviews = await db.review.count();
  const carts = await db.cart.count();
  const wishlists = await db.wishlist.count();
  const addresses = await db.address.count();
  const coupons = await db.coupon.count();
  const orders = await db.order.count();
  const orderItems = await db.orderItem.count();

  console.log(`  Users:       ${users}`);
  console.log(`  Categories:  ${categories}`);
  console.log(`  Products:    ${products}`);
  console.log(`  Variants:    ${variants}`);
  console.log(`  Reviews:     ${reviews}`);
  console.log(`  Carts:       ${carts}`);
  console.log(`  Wishlists:   ${wishlists}`);
  console.log(`  Addresses:   ${addresses}`);
  console.log(`  Coupons:     ${coupons}`);
  console.log(`  Orders:      ${orders}`);
  console.log(`  OrderItems:  ${orderItems}`);

  const featuredCount = await db.product.count({ where: { isFeatured: true } });
  console.log(`  Featured products: ${featuredCount}`);
  console.log("");
}

// ---------------------------------------------------------------------------
// Product Variants — 2 per product (different size/material combos)
// ---------------------------------------------------------------------------

const VARIANT_TEMPLATES: Record<
  string,
  Array<{
    sku: string;
    size: string | null;
    color: string | null;
    colorHex: string | null;
    material: string | null;
    stock: number;
    priceDelta: number;
  }>
> = {
  "velvet-lounge-chair": [
    {
      sku: "VLC-WAL-EMR",
      size: null,
      color: "Emerald",
      colorHex: "#2D6A4F",
      material: "Velvet",
      stock: 5,
      priceDelta: 0,
    },
    {
      sku: "VLC-WAL-OAT",
      size: null,
      color: "Oatmeal",
      colorHex: "#E8DCC8",
      material: "Linen",
      stock: 8,
      priceDelta: -5000,
    },
  ],
  "oak-side-table": [
    {
      sku: "OST-SML-NAT",
      size: "Small",
      color: "Natural Oak",
      colorHex: "#D4A76A",
      material: "Oak",
      stock: 12,
      priceDelta: 0,
    },
    {
      sku: "OST-LRG-NAT",
      size: "Large",
      color: "Natural Oak",
      colorHex: "#D4A76A",
      material: "Oak",
      stock: 6,
      priceDelta: 8000,
    },
  ],
  "lumen-pendant": [
    {
      sku: "LUM-BRS-SML",
      size: "Small (Ø22cm)",
      color: "Brass",
      colorHex: "#B5A642",
      material: "Brass",
      stock: 10,
      priceDelta: 0,
    },
    {
      sku: "LUM-BRS-LRG",
      size: "Large (Ø32cm)",
      color: "Brass",
      colorHex: "#B5A642",
      material: "Brass",
      stock: 4,
      priceDelta: 12000,
    },
  ],
};

const DEFAULT_VARIANTS = (productSlug: string) => [
  {
    sku: `${productSlug.toUpperCase().replace(/-/g, "-")}-STD`,
    size: "Standard",
    color: null,
    colorHex: null,
    material: null,
    stock: 10,
    priceDelta: 0,
  },
];

async function seedVariants() {
  console.log("→ Seeding product variants...");
  const products = await db.product.findMany({
    select: { id: true, slug: true, name: true },
  });
  let count = 0;

  for (const product of products) {
    const templates =
      VARIANT_TEMPLATES[product.slug] ?? DEFAULT_VARIANTS(product.slug);

    for (const tpl of templates) {
      await db.productVariant.upsert({
        where: { sku: tpl.sku },
        update: {
          productId: product.id,
          productName: product.name,
          size: tpl.size,
          color: tpl.color,
          colorHex: tpl.colorHex,
          material: tpl.material,
          stock: tpl.stock,
          priceDelta: new Prisma.Decimal(tpl.priceDelta),
        },
        create: {
          productId: product.id,
          productName: product.name,
          sku: tpl.sku,
          size: tpl.size,
          color: tpl.color,
          colorHex: tpl.colorHex,
          material: tpl.material,
          stock: tpl.stock,
          priceDelta: new Prisma.Decimal(tpl.priceDelta),
          isActive: true,
        },
      });
      count++;
    }
  }
  console.log(`  ✓ ${count} variants seeded`);
}

// ---------------------------------------------------------------------------
// Reviews — sample reviews on featured products
// ---------------------------------------------------------------------------

const SAMPLE_REVIEWS = [
  {
    productSlug: "velvet-lounge-chair",
    rating: 5,
    title: "Exceptional craftsmanship",
    body: "The velvet lounge chair exceeded our expectations. The walnut frame is flawless and the emerald velvet is even more beautiful in person. White-glove delivery was professional and timely. This piece will be in our family for generations.",
  },
  {
    productSlug: "lumen-pendant",
    rating: 5,
    title: "Perfect warm glow",
    body: "We hung three of these over our dining table and the light they cast is warm and even — exactly what we wanted. The brass develops a beautiful patina. Highly recommend.",
  },
  {
    productSlug: "oak-side-table",
    rating: 4,
    title: "Solid and well-made",
    body: "Beautiful grain and the through-tenoned joinery is visible — exactly as described. Knocked one star because the oil finish needed a second coat after a month. Otherwise perfect.",
  },
  {
    productSlug: "linen-throw",
    rating: 5,
    title: "My favorite throw",
    body: "I bought this on a whim and now use it daily. It has softened beautifully with washing and the oatmeal color goes with everything. Considering buying a second one.",
  },
  {
    productSlug: "walnut-console",
    rating: 5,
    title: "Worth every rupee",
    body: "The walnut grain is stunning and the hand-rubbed oil finish feels premium. This is the kind of furniture you pass down to your children. Delivery team placed it perfectly in our entryway.",
  },
];

async function seedReviews() {
  console.log("→ Seeding sample reviews...");

  // Get admin user for review author
  const admin = await db.user.findFirst({
    where: { role: "ADMIN" },
    select: { id: true, email: true, name: true },
  });

  if (!admin) {
    console.log(
      "  ⚠ Skipping reviews — no admin user found. Run create-admin.ts first.",
    );
    return;
  }

  for (const review of SAMPLE_REVIEWS) {
    const product = await db.product.findUnique({
      where: { slug: review.productSlug },
      select: { id: true, name: true, slug: true },
    });
    if (!product) continue;

    // Use a composite unique key to make idempotent
    const reviewId = `review-${product.slug}`;
    await db.review.upsert({
      where: { id: reviewId },
      update: {
        productId: product.id,
        userId: admin.id,
        rating: review.rating,
        title: review.title,
        body: review.body,
        isVerified: true,
        isApproved: true,
      },
      create: {
        id: reviewId,
        productId: product.id,
        userId: admin.id,
        userEmail: admin.email,
        userName: admin.name,
        productName: product.name,
        productSlug: product.slug,
        rating: review.rating,
        title: review.title,
        body: review.body,
        isVerified: true,
        isApproved: true,
      },
    });
  }
  console.log(`  ✓ ${SAMPLE_REVIEWS.length} reviews seeded`);
}

// ---------------------------------------------------------------------------
// Coupons — 3 sample discount codes
// ---------------------------------------------------------------------------

const SAMPLE_COUPONS = [
  {
    code: "WELCOME10",
    type: "PERCENT" as const,
    value: 10,
    minOrder: 10000,
    maxDiscount: 15000,
    maxUses: 100,
    maxUsesPerUser: 1,
    expiresAt: new Date("2026-12-31"),
    description: "10% off for new customers (max ₨15,000 discount)",
  },
  {
    code: "AURA5000",
    type: "FIXED" as const,
    value: 5000,
    minOrder: 50000,
    maxUses: 50,
    maxUsesPerUser: 1,
    expiresAt: new Date("2026-09-30"),
    description: "₨5,000 off orders over ₨50,000",
  },
  {
    code: "FREESHIP",
    type: "FREE_SHIPPING" as const,
    value: 0,
    minOrder: 25000,
    maxUses: null,
    maxUsesPerUser: null,
    expiresAt: null,
    description: "Free shipping on orders over ₨25,000",
  },
];

async function seedCoupons() {
  console.log("→ Seeding sample coupons...");
  for (const coupon of SAMPLE_COUPONS) {
    await db.coupon.upsert({
      where: { code: coupon.code },
      update: {
        type: coupon.type,
        value: new Prisma.Decimal(coupon.value),
        minOrder: coupon.minOrder ? new Prisma.Decimal(coupon.minOrder) : null,
        maxDiscount: coupon.maxDiscount
          ? new Prisma.Decimal(coupon.maxDiscount)
          : null,
        maxUses: coupon.maxUses,
        maxUsesPerUser: coupon.maxUsesPerUser,
        expiresAt: coupon.expiresAt,
        description: coupon.description,
        isActive: true,
      },
      create: {
        code: coupon.code,
        type: coupon.type,
        value: new Prisma.Decimal(coupon.value),
        minOrder: coupon.minOrder ? new Prisma.Decimal(coupon.minOrder) : null,
        maxDiscount: coupon.maxDiscount
          ? new Prisma.Decimal(coupon.maxDiscount)
          : null,
        maxUses: coupon.maxUses,
        maxUsesPerUser: coupon.maxUsesPerUser,
        expiresAt: coupon.expiresAt,
        description: coupon.description,
        isActive: true,
      },
    });
  }
  console.log(`  ✓ ${SAMPLE_COUPONS.length} coupons seeded`);
}

async function main() {
  console.log("\n🌱 Aura Living — Seeding Database...\n");

  try {
    const categories = await seedCategories();
    await seedProducts(categories);
    await seedVariants();
    await seedReviews();
    await seedCoupons();
    await printSummary();

    console.log("✅ Seed complete!");
    console.log(
      "\nNext: Run `bun run scripts/create-admin.ts` to create the admin user.\n",
    );
  } catch (error) {
    console.error("\n❌ Seed failed:", error);
    process.exit(1);
  } finally {
    await db.$disconnect();
  }
}

main();
