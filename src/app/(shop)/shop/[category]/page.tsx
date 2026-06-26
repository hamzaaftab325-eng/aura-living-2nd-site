export const dynamic = "force-dynamic";
/**
 * Category Page — /shop/[category]
 * Server component with PageHero + products filtered by category.
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
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category } = await params;
  const cat = await db.category.findUnique({ where: { slug: category } });
  return {
    title: cat?.name ?? "Shop",
    description: `Browse ${cat?.name ?? "our"} collection at Aura Living.`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category: slug } = await params;
  const category = await db.category.findUnique({
    where: { slug },
    include: { _count: { select: { products: true } } },
  });

  if (!category) notFound();

  const products = await db.product.findMany({
    where: { categoryId: category.id, status: "ACTIVE" },
    orderBy: { createdAt: "desc" },
    include: {
      category: true,
      variants: { where: { isActive: true }, take: 1 },
    },
  });

  const allCategories = await db.category.findMany({
    orderBy: { sortOrder: "asc" },
    include: { _count: { select: { products: true } } },
  });

  return (
    <>
      <PageHero
        image={category.imageUrl ?? "/images/shop-hero.png"}
        eyebrow="Collection"
        title={category.name}
        description={`${products.length} ${products.length === 1 ? "piece" : "pieces"} — crafted for considered living.`}
      />

      <Container>
        <Section spacing="xl">
          {/* Category filter chips */}
          <RevealOnScroll variant="fade-up" delay={0.3}>
            <div className="flex flex-wrap gap-3 border-b border-[var(--line)] pb-8">
              <a href="/shop" className="chip">
                All
              </a>
              {allCategories.map((cat) => (
                <a
                  key={cat.id}
                  href={`/shop/${cat.slug}`}
                  className={`chip ${cat.slug === slug ? "border-[var(--ink)] bg-[var(--ink)] text-white" : ""}`}
                >
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
                    badge={product.isFeatured ? "Bestseller" : undefined}
                    href={`/product/${product.slug}`}
                  />
                </StaggerItem>
              ))}
            </StaggerContainer>
          ) : (
            <div className="mt-20 text-center">
              <p className="text-body-lg text-[var(--muted)]">
                No pieces in this collection yet.
              </p>
              <a href="/shop" className="btn-primary mt-6 inline-flex">
                View All Products
              </a>
            </div>
          )}
        </Section>
      </Container>
    </>
  );
}
