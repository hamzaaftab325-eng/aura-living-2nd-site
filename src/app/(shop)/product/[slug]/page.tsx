export const dynamic = "force-dynamic";
/**
 * Product Detail Page — /product/[slug]
 * Server component pulling full product data (variants, reviews, category).
 */

import {
  Container,
  Section,
  Eyebrow,
  LuxuryHeading,
} from "@/components/layout";
import {
  RevealOnScroll,
  BlurReveal,
  StaggerContainer,
  StaggerItem,
  DecorativeDivider,
} from "@/components/motion";
import {
  Button,
  LuxuryBadge,
  ProductCard,
  FAQAccordion,
} from "@/components/ui";
import {
  getProductBySlug,
  getReviewSummary,
  getFeaturedProducts,
} from "@/server/db/queries";
import { formatPrice } from "@/lib/format";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Star,
  Heart,
  ShoppingBag,
  Truck,
  Shield,
  Ruler,
  ArrowLeft,
} from "lucide-react";
import { ProductGallery } from "@/components/shop/product-gallery";
import { VariantSelector } from "@/components/shop/variant-selector";
import { ReviewSection } from "@/components/shop/review-section";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.name,
    description: product.description.slice(0, 160),
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  const reviewSummary = await getReviewSummary(product.id);
  const relatedProducts = await getFeaturedProducts(4);

  return (
    <>
      <Container>
        <Section spacing="lg">
          {/* Breadcrumb */}
          <RevealOnScroll variant="fade">
            <div className="text-body-sm flex items-center gap-3 text-[var(--muted)]">
              <Link
                href="/shop"
                className="transition-colors hover:text-[var(--ink)]"
              >
                Shop
              </Link>
              <span>/</span>
              {product.category && (
                <>
                  <Link
                    href={`/shop/${product.category.slug}`}
                    className="transition-colors hover:text-[var(--ink)]"
                  >
                    {product.category.name}
                  </Link>
                  <span>/</span>
                </>
              )}
              <span className="text-[var(--ink)]">{product.name}</span>
            </div>
          </RevealOnScroll>

          {/* Main layout: gallery + info */}
          <div className="mt-10 grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
            {/* Gallery */}
            <RevealOnScroll variant="fade" amount={0.2}>
              <ProductGallery images={product.images} alt={product.name} />
            </RevealOnScroll>

            {/* Product info */}
            <div className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
              <BlurReveal variant="blur-fade" amount={0.3}>
                <div className="flex flex-col gap-3">
                  {product.category && (
                    <Eyebrow tone="gold">{product.category.name}</Eyebrow>
                  )}
                  <LuxuryHeading variant="display-md" as="h1">
                    {product.name}
                  </LuxuryHeading>

                  {/* Rating */}
                  {reviewSummary.count > 0 && (
                    <div className="flex items-center gap-2">
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${star <= Math.round(reviewSummary.average) ? "fill-[var(--gold)] text-[var(--gold)]" : "text-[var(--line)]"}`}
                            strokeWidth={1}
                          />
                        ))}
                      </div>
                      <span className="text-body-sm text-[var(--muted)]">
                        {reviewSummary.average.toFixed(1)} (
                        {reviewSummary.count} review
                        {reviewSummary.count !== 1 ? "s" : ""})
                      </span>
                    </div>
                  )}

                  <p className="text-display-md font-medium text-[var(--ink)]">
                    {formatPrice(Number(product.basePrice))}
                  </p>
                </div>
              </BlurReveal>

              {/* Description */}
              <BlurReveal variant="blur-up" delay={0.1} amount={0.3}>
                <p className="text-body-md leading-relaxed text-[var(--stone)]">
                  {product.description}
                </p>
              </BlurReveal>

              {/* Variant selector */}
              {product.variants.length > 0 && (
                <BlurReveal variant="blur-up" delay={0.2} amount={0.3}>
                  <VariantSelector
                    variants={product.variants}
                    basePrice={Number(product.basePrice)}
                  />
                </BlurReveal>
              )}

              {/* Actions */}
              <BlurReveal variant="blur-up" delay={0.3} amount={0.3}>
                <div className="flex flex-col gap-4">
                  <div className="flex gap-4">
                    <Button variant="gold" size="xl" className="flex-1">
                      <ShoppingBag className="h-4 w-4" strokeWidth={1.5} />
                      Add to Cart
                    </Button>
                    <Button
                      variant="outline"
                      size="xl"
                      aria-label="Add to wishlist"
                    >
                      <Heart className="h-4 w-4" strokeWidth={1.25} />
                    </Button>
                  </div>

                  {/* Trust badges */}
                  <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-[var(--line)] pt-4">
                    {[
                      { icon: Truck, label: "Free shipping over ₨25,000" },
                      { icon: Shield, label: "Lifetime guarantee" },
                      {
                        icon: Ruler,
                        label: product.dimensions ?? "Made to measure",
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="text-body-sm flex items-center gap-2 text-[var(--muted)]"
                      >
                        <item.icon
                          className="h-3.5 w-3.5 text-[var(--gold-deep)]"
                          strokeWidth={1}
                        />
                        {item.label}
                      </div>
                    ))}
                  </div>
                </div>
              </BlurReveal>

              {/* Details accordion */}
              <BlurReveal variant="blur-up" delay={0.4} amount={0.3}>
                <FAQAccordion
                  items={[
                    ...(product.materials.length > 0
                      ? [{ q: "Materials", a: product.materials.join(", ") }]
                      : []),
                    ...(product.dimensions
                      ? [{ q: "Dimensions", a: product.dimensions }]
                      : []),
                    ...(product.careInstructions
                      ? [
                          {
                            q: "Care Instructions",
                            a: product.careInstructions,
                          },
                        ]
                      : []),
                    {
                      q: "Shipping & Returns",
                      a: "Free white-glove delivery on orders over ₨25,000. Returns accepted within 30 days for unused items in original packaging.",
                    },
                  ]}
                />
              </BlurReveal>
            </div>
          </div>
        </Section>
      </Container>

      {/* Reviews section */}
      <ReviewSection
        productId={product.id}
        reviews={product.reviews}
        summary={reviewSummary}
      />

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <Section spacing="xl" tone="surface">
          <Container>
            <div className="mb-12 flex flex-col items-center text-center">
              <Eyebrow tone="gold">You May Also Like</Eyebrow>
              <LuxuryHeading
                variant="display-md"
                as="h2"
                balance
                className="mt-4"
              >
                Complete the collection
              </LuxuryHeading>
              <DecorativeDivider variant="diamond" className="mt-6" />
            </div>

            <StaggerContainer
              stagger={0.1}
              amount={0.1}
              className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4"
            >
              {relatedProducts
                .filter((p) => p.id !== product.id)
                .slice(0, 4)
                .map((p) => (
                  <StaggerItem key={p.id} variant="fade-up">
                    <ProductCard
                      name={p.name}
                      price={Number(p.basePrice)}
                      image={p.images[0] ?? ""}
                      alternateImage={p.images[1]}
                      category={p.category?.name}
                      href={`/product/${p.slug}`}
                    />
                  </StaggerItem>
                ))}
            </StaggerContainer>
          </Container>
        </Section>
      )}
    </>
  );
}
