/**
 * Generate luxury images — valid sizes only, with 5s delays.
 * 1344x768 = landscape (heroes, banners)
 * 864x1152 = portrait (atelier)
 * 1024x1024 = square (categories)
 */

import ZAI from "z-ai-web-dev-sdk";
import fs from "fs";
import path from "path";

const OUTPUT_DIR = path.join(process.cwd(), "public", "images");
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const IMAGES = [
  {
    name: "hero-1",
    prompt:
      "Ultra-luxury living room interior, warm ambient lighting, cream and beige tones, brass pendant lights, velvet sofa, oak coffee table, marble vase, large windows with soft natural light, editorial photography, warm color grading, shallow depth of field, minimalist luxury aesthetic",
    size: "1344x768" as const,
  },
  {
    name: "hero-2",
    prompt:
      "Artisan workshop in Lahore Pakistan, hands crafting wooden furniture, warm golden light through window, wood shavings on workbench, traditional hand tools, walnut wood, focused craftsman, documentary photography style, warm tones, premium craftsmanship",
    size: "1344x768" as const,
  },
  {
    name: "hero-3",
    prompt:
      "Luxury bedroom interior at dusk, warm bedside lamp glow, linen bedding in oatmeal color, walnut nightstand, brass table lamp, wool rug, soft shadows, editorial interior photography, calm serene mood, warm color palette",
    size: "1344x768" as const,
  },
  {
    name: "shop-hero",
    prompt:
      "Curated luxury home decor collection in minimalist gallery setting, warm white walls, oak shelving, brass and marble objects, ceramic vases, soft directional lighting, editorial product photography, premium aesthetic, warm neutral palette",
    size: "1344x768" as const,
  },
  {
    name: "editorial-banner",
    prompt:
      "Dramatic luxury interior with single statement chair in emerald velvet, large arched window, warm golden hour light, marble floor, minimal decor, editorial photography, moody atmosphere, deep shadows, premium design magazine aesthetic",
    size: "1344x768" as const,
  },
  {
    name: "cat-lighting",
    prompt:
      "Elegant brass pendant light in minimalist white room, warm golden glow, soft shadows, luxury lighting design, editorial product photography, neutral background, premium aesthetic",
    size: "1024x1024" as const,
  },
  {
    name: "cat-seating",
    prompt:
      "Luxury velvet armchair in emerald green, walnut wood frame, minimalist room with cream walls, soft natural light, editorial furniture photography, premium home decor",
    size: "1024x1024" as const,
  },
  {
    name: "cat-tables",
    prompt:
      "Solid oak side table with visible grain, natural finish, cream background, soft shadow, minimalist product photography, premium furniture, warm tones",
    size: "1024x1024" as const,
  },
  {
    name: "cat-storage",
    prompt:
      "Walnut wood bookshelf with brass details, styled with books and ceramic objects, luxury interior, warm lighting, editorial photography, premium furniture",
    size: "1024x1024" as const,
  },
  {
    name: "cat-textiles",
    prompt:
      "Folded linen textiles in oatmeal and cream colors, soft natural light, wool and linen fabric texture, premium home goods, editorial product photography, warm neutral palette",
    size: "1024x1024" as const,
  },
  {
    name: "cat-decor",
    prompt:
      "Marble vase and ceramic bowl on oak surface, soft directional light, minimalist styling, premium home decor objects, editorial product photography, warm tones",
    size: "1024x1024" as const,
  },
  {
    name: "cat-mirrors",
    prompt:
      "Large arched floor mirror in oak frame, leaning against cream wall, reflecting luxury interior, soft natural light, editorial interior photography, premium aesthetic",
    size: "1024x1024" as const,
  },
  {
    name: "cat-outdoor",
    prompt:
      "Solid teak bench on covered terrace, warm evening light, minimal landscaping, luxury outdoor furniture, editorial photography, warm golden tones, premium aesthetic",
    size: "1024x1024" as const,
  },
];

async function generateAll() {
  console.log(`\n🎨 Generating ${IMAGES.length} images...\n`);
  const zai = await ZAI.create();
  let success = 0;

  for (const job of IMAGES) {
    const outputPath = path.join(OUTPUT_DIR, `${job.name}.png`);
    if (fs.existsSync(outputPath)) {
      console.log(`  ⏭  ${job.name}.png exists`);
      success++;
      continue;
    }

    try {
      console.log(`  → ${job.name}...`);
      const response = await zai.images.generations.create({
        prompt: job.prompt,
        size: job.size,
      });
      const base64 = response.data[0]?.base64;
      if (!base64) throw new Error("No data");
      const buffer = Buffer.from(base64, "base64");
      fs.writeFileSync(outputPath, buffer);
      console.log(
        `  ✓ ${job.name}.png (${(buffer.length / 1024).toFixed(0)} KB)`,
      );
      success++;
    } catch (error) {
      console.error(`  ✗ ${job.name}: ${error}`);
    }

    await sleep(5000);
  }

  console.log(`\n✅ Done: ${success}/${IMAGES.length}\n`);
}

generateAll().catch(console.error);
