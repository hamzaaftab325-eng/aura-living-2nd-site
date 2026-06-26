/**
 * Shop Listing Page — all products with PageHero + filters.
 * Server component pulling real products from DB.
 */

import { Container, Section } from "@/components/layout";
import {
  RevealOnScroll,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion";
import { ProductCard } from "@/components/ui";
import { PageHero } from "@/components/shop/page-hero";
import { db } from "@/server/db";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop All",
  description: "Browse the full Aura Living collection of luxury home decor.",
};

export default async function ShopPage() {
  const products = await db.product.findMany({
    where: { status: "ACTIVE" },
    orderBy: { createdAt: "desc" },
    include: {
      category: true,
      variants: { where: { isActive: true }, take: 1 },
    },
  });

  const categories = await db.category.findMany({
    orderBy: { sortOrder: "asc" },
    include: { _count: { select: { products: true } } },
  });

  return (
    <>
      <PageHero
        image="/images/shop-hero.png"
        eyebrow="The Collection"
        title="All Products"
        description={`${products.length} curated pieces — each selected for craftsmanship, material integrity, and quiet presence.`}
      />

      <Container>
        <Section spacing="xl">
          <RevealOnScroll variant="fade-up" delay={0.3}>
            <div className="flex flex-wrap gap-3 border-b border-[var(--line)] pb-8">
              <a href="/shop" className="chip" data-selected="true">
                All ({products.length})
              </a>
              {categories.map((cat) => (
                <a key={cat.id} href={`/shop/${cat.slug}`} className="chip">
                  {cat.name} ({cat._count.products})
                </a>
              ))}
            </div>
          </RevealOnScroll>

          {products.length > 0 ? (
            <StaggerContainer
              stagger={0.08}
              amount={0.1}
              className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4"
            >
              {products.map((product) => (
                <StaggerItem key={product.id} variant="fade-up">
                  <ProductCard
                    name={product.name}
                    price={Number(product.basePrice)}
                    image={product.images[0] ?? "/images/hero-1.png"}
                    alternateImage={product.images[1]}
                    category={product.category?.name}
                    badge={product.isFeatured ? "New" : undefined}
                    href={`/product/${product.slug}`}
                  />
                </StaggerItem>
              ))}
            </StaggerContainer>
          ) : (
            <div className="mt-20 text-center">
              <p className="text-body-lg text-[var(--muted)]">
                No products available yet.
              </p>
            </div>
          )}
        </Section>
      </Container>
    </>
  );
}
