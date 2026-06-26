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
// Admin user — for development. CHANGE PASSWORD in production.
// ---------------------------------------------------------------------------
const ADMIN_USER = {
  email: "admin@auraliving.pk",
  name: "Aura Living Admin",
  role: "ADMIN" as const,
};

// ---------------------------------------------------------------------------
// 8 Categories — matches src/config/navigation.ts
// ---------------------------------------------------------------------------
const CATEGORIES = [
  {
    slug: "lighting",
    name: "Lighting",
    sortOrder: 1,
    imageUrl:
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600&q=80",
  },
  {
    slug: "seating",
    name: "Seating",
    sortOrder: 2,
    imageUrl:
      "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=600&q=80",
  },
  {
    slug: "tables",
    name: "Tables",
    sortOrder: 3,
    imageUrl:
      "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=600&q=80",
  },
  {
    slug: "storage",
    name: "Storage",
    sortOrder: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
  },
  {
    slug: "textiles",
    name: "Textiles",
    sortOrder: 5,
    imageUrl:
      "https://images.unsplash.com/photo-1600369671236-e74521d4b6ad?w=600&q=80",
  },
  {
    slug: "decor",
    name: "Decor",
    sortOrder: 6,
    imageUrl:
      "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=600&q=80",
  },
  {
    slug: "mirrors",
    name: "Mirrors",
    sortOrder: 7,
    imageUrl:
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&q=80",
  },
  {
    slug: "outdoor",
    name: "Outdoor",
    sortOrder: 8,
    imageUrl:
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600&q=80",
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
async function seedAdminUser() {
  console.log("→ Seeding admin user...");
  const user = await db.user.upsert({
    where: { email: ADMIN_USER.email },
    update: { name: ADMIN_USER.name, role: ADMIN_USER.role },
    create: ADMIN_USER,
  });
  console.log(`  ✓ Admin user: ${user.email} (${user.role})`);
  return user;
}

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
  const [users, categories, products, orders, orderItems] = await Promise.all([
    db.user.count(),
    db.category.count(),
    db.product.count(),
    db.order.count(),
    db.orderItem.count(),
  ]);
  console.log(`  Users:       ${users}`);
  console.log(`  Categories:  ${categories}`);
  console.log(`  Products:    ${products}`);
  console.log(`  Orders:      ${orders}`);
  console.log(`  OrderItems:  ${orderItems}`);

  const featuredCount = await db.product.count({ where: { isFeatured: true } });
  console.log(`  Featured products: ${featuredCount}`);
  console.log("");
}

async function main() {
  console.log("\n🌱 Aura Living — Seeding Database...\n");

  try {
    const admin = await seedAdminUser();
    const categories = await seedCategories();
    await seedProducts(categories);
    await printSummary();

    console.log("✅ Seed complete!");
    console.log(`\nAdmin login: ${admin.email}`);
    console.log("(Set password via Better Auth in Phase 2.1)\n");
  } catch (error) {
    console.error("\n❌ Seed failed:", error);
    process.exit(1);
  } finally {
    await db.$disconnect();
  }
}

main();
