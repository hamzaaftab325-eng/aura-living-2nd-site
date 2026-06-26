/**
 * Aura Living — Home Page (Server Component)
 *
 * Pulls real products + categories from Supabase Postgres.
 * All animations handled by client components (ProductCard, SplitHeading, etc.)
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
  WordReveal,
  SplitHeading,
  ImageReveal,
  StaggerContainer,
  StaggerItem,
  ScrollProgress,
  ScrollIndicator,
  Marquee,
  Counter,
  DrawLine,
  DecorativeDivider,
  FloatingElement,
} from "@/components/motion";
import {
  Button,
  ProductCard,
  CategoryCard,
  TestimonialCard,
  FAQAccordion,
  InstagramGrid,
} from "@/components/ui";
import {
  getFeaturedProducts,
  getNewArrivals,
  getAllCategories,
} from "@/server/db/queries";
import { brand } from "@/config/brand";
import {
  ArrowRight,
  ArrowUpRight,
  Truck,
  Shield,
  Hammer,
  Sparkles,
  Ruler,
  Leaf,
} from "lucide-react";
import { formatPrice } from "@/lib/format";

export default async function HomePage() {
  // Fetch real data from DB (sequential — Supabase free tier = 1 connection)
  const featuredProducts = await getFeaturedProducts(8);
  const newArrivals = await getNewArrivals(4);
  const categories = await getAllCategories();

  return (
    <>
      <ScrollProgress />

      {/* ===============================================================
       * Hero
       * ============================================================= */}
      <Section spacing="xl" tone="default" id="top" bare>
        <Container className="relative">
          <FloatingElement
            className="absolute top-[20%] right-[10%] hidden lg:block"
            floatSpeed="slow"
          >
            <Sparkles
              className="h-6 w-6 text-[var(--gold)] opacity-40"
              strokeWidth={0.75}
            />
          </FloatingElement>

          <div className="grid gap-16 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-20">
            <div className="flex flex-col gap-8">
              <RevealOnScroll variant="fade" amount={0.6}>
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-[var(--gold)]" aria-hidden />
                  <Eyebrow tone="gold">Autumn Collection — 2026</Eyebrow>
                </div>
              </RevealOnScroll>

              <SplitHeading
                text={"Curated calm\nfor considered\nliving."}
                className="text-display-xl font-medium text-[var(--ink)]"
                stagger={0.12}
                delay={0.2}
              />

              <RevealOnScroll variant="fade-up" delay={0.7} amount={0.4}>
                <p className="text-body-lg max-w-[48ch] text-[var(--stone)]">
                  A refined collection of home decor — selected for
                  craftsmanship, material integrity, and quiet presence.
                  Designed in Lahore, crafted for the discerning Pakistani home.
                </p>
              </RevealOnScroll>

              <RevealOnScroll variant="fade-up" delay={0.85} amount={0.4}>
                <div className="flex flex-wrap gap-4 pt-2">
                  <Button variant="primary" size="lg" asChild>
                    <a href="/shop" data-cursor="text" data-cursor-text="Shop">
                      Shop the Collection
                      <ArrowRight className="arrow h-4 w-4" strokeWidth={1.5} />
                    </a>
                  </Button>
                  <Button variant="outline-luxury" size="lg" asChild>
                    <a
                      href="#atelier"
                      data-cursor="text"
                      data-cursor-text="Explore"
                    >
                      Explore Atelier
                      <ArrowUpRight
                        className="arrow h-4 w-4"
                        strokeWidth={1.5}
                      />
                    </a>
                  </Button>
                </div>
              </RevealOnScroll>

              <RevealOnScroll variant="fade-up" delay={1} amount={0.4}>
                <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-[var(--line)] pt-6">
                  {[
                    { icon: Truck, label: "White Glove Delivery" },
                    { icon: Shield, label: "Lifetime Guarantee" },
                    { icon: Hammer, label: "Hand-Crafted" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="text-body-sm flex items-center gap-2 text-[var(--muted)]"
                    >
                      <item.icon
                        className="h-4 w-4 text-[var(--gold-deep)]"
                        strokeWidth={1}
                      />
                      {item.label}
                    </div>
                  ))}
                </div>
              </RevealOnScroll>
            </div>

            <div className="relative">
              <ImageReveal
                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80"
                alt="Luxury living room with curated decor"
                direction="right"
                duration={1.3}
                containerClassName="aspect-editorial rounded-[0.375rem] overflow-hidden"
                priority
              />
              <RevealOnScroll
                variant="fade-up"
                delay={0.6}
                amount={0.5}
                className="absolute bottom-6 left-6 z-10 max-w-[14rem] border-l border-[var(--gold)] bg-white/80 px-5 py-4 backdrop-blur-md"
              >
                <p className="label-caps text-[var(--gold-deep)]">Featured</p>
                <p className="text-body-sm mt-1 font-medium text-[var(--ink)]">
                  The Autumn Edit — {featuredProducts.length} new pieces,
                  hand-selected.
                </p>
              </RevealOnScroll>
            </div>
          </div>

          <div className="mt-20 flex justify-center">
            <ScrollIndicator />
          </div>
        </Container>
      </Section>

      {/* ===============================================================
       * Marquee
       * ============================================================= */}
      <div className="grain-overlay border-y border-[var(--ink)] bg-[var(--ink)] py-8 text-[var(--cream)]">
        <Marquee speed="slow" className="gap-16">
          {[
            "Refined Living",
            "Considered Design",
            "Material Integrity",
            "Quiet Luxury",
            "Crafted in Pakistan",
            "White Glove Delivery",
          ].map((item, i) => (
            <span key={i} className="flex items-center gap-16">
              <span className="text-headline-sm font-medium text-white italic">
                {item}
              </span>
              <Sparkles
                className="h-3 w-3 text-[var(--gold)]"
                strokeWidth={1}
              />
            </span>
          ))}
        </Marquee>
      </div>

      {/* ===============================================================
       * Categories (real DB data)
       * ============================================================= */}
      <Section spacing="xl" tone="default" id="categories">
        <div className="mb-16 flex flex-col items-center text-center">
          <RevealOnScroll variant="fade" amount={0.6}>
            <Eyebrow tone="gold">Shop by Category</Eyebrow>
          </RevealOnScroll>
          <RevealOnScroll variant="fade-up" delay={0.1} amount={0.5}>
            <LuxuryHeading
              variant="display-md"
              as="h2"
              balance
              className="mt-4"
            >
              Eight collections, one philosophy
            </LuxuryHeading>
          </RevealOnScroll>
          <RevealOnScroll variant="fade" delay={0.3} amount={0.5}>
            <DecorativeDivider variant="diamond" className="mt-8" />
          </RevealOnScroll>
        </div>

        <StaggerContainer
          stagger={0.08}
          amount={0.1}
          className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
        >
          {categories.map((cat) => (
            <StaggerItem key={cat.id} variant="fade-up">
              <CategoryCard
                name={cat.name}
                count={cat._count.products}
                image={
                  cat.imageUrl ??
                  "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80"
                }
                href={`/shop/${cat.slug}`}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      {/* ===============================================================
       * Featured Products (real DB data)
       * ============================================================= */}
      <Section spacing="xl" tone="surface" id="products">
        <div className="mb-16 flex flex-col items-center text-center">
          <RevealOnScroll variant="fade" amount={0.6}>
            <Eyebrow tone="gold">New Arrivals</Eyebrow>
          </RevealOnScroll>
          <RevealOnScroll variant="fade-up" delay={0.1} amount={0.5}>
            <LuxuryHeading
              variant="display-md"
              as="h2"
              balance
              className="mt-4"
            >
              The Autumn Edit
            </LuxuryHeading>
          </RevealOnScroll>
          <RevealOnScroll variant="fade" delay={0.3} amount={0.5}>
            <DecorativeDivider variant="diamond" className="mt-8" />
          </RevealOnScroll>
        </div>

        {featuredProducts.length > 0 ? (
          <StaggerContainer
            stagger={0.1}
            amount={0.1}
            className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4"
          >
            {featuredProducts.map((product) => (
              <StaggerItem key={product.id} variant="fade-up">
                <ProductCard
                  name={product.name}
                  price={Number(product.basePrice)}
                  image={
                    product.images[0] ??
                    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80"
                  }
                  alternateImage={product.images[1]}
                  badge={product.isFeatured ? "New" : undefined}
                  category={product.category?.name}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          <p className="text-body-lg text-center text-[var(--muted)]">
            No featured products yet.
          </p>
        )}

        <div className="mt-16 flex justify-center">
          <Button variant="outline-luxury" size="lg" asChild>
            <a href="/shop" data-cursor="text" data-cursor-text="Browse">
              View All Products
              <ArrowRight className="arrow h-4 w-4" strokeWidth={1.5} />
            </a>
          </Button>
        </div>
      </Section>

      {/* ===============================================================
       * Stats
       * ============================================================= */}
      <Section spacing="xl" tone="default" id="stats">
        <Container>
          <div className="mb-16 flex flex-col items-center text-center">
            <RevealOnScroll variant="fade" amount={0.6}>
              <Eyebrow tone="gold">By the Numbers</Eyebrow>
            </RevealOnScroll>
            <RevealOnScroll variant="fade-up" delay={0.1} amount={0.5}>
              <LuxuryHeading
                variant="display-md"
                as="h2"
                balance
                className="mt-4"
              >
                A measured approach to luxury
              </LuxuryHeading>
            </RevealOnScroll>
          </div>

          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                value: featuredProducts.length + newArrivals.length,
                label: "Curated Pieces",
              },
              { value: 98, suffix: "%", label: "Happy Clients" },
              { value: categories.length, label: "Collections" },
              { value: 25000, prefix: "₨", label: "Free Shipping Over" },
            ].map((stat, i) => (
              <BlurReveal
                key={i}
                variant="blur-up"
                amount={0.4}
                className="flex flex-col items-center text-center"
              >
                <Counter
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  className="text-display-md font-medium text-[var(--ink)]"
                />
                <DrawLine className="mt-4 h-px w-12" delay={0.3} />
                <p className="label-caps mt-4 text-[var(--muted)]">
                  {stat.label}
                </p>
              </BlurReveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ===============================================================
       * Atelier Story
       * ============================================================= */}
      <Section spacing="xl" tone="surface" id="atelier" bare>
        <Container>
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center lg:gap-20">
            <BlurReveal variant="blur-scale" amount={0.3}>
              <ImageReveal
                src="https://images.unsplash.com/photo-1567016432779-094069958ea5?w=900&q=80"
                alt="Artisan crafting decor"
                direction="left"
                containerClassName="aspect-[4/5] rounded-[0.375rem] overflow-hidden"
              />
            </BlurReveal>

            <div className="flex flex-col gap-6">
              <RevealOnScroll variant="fade" amount={0.5}>
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-[var(--gold)]" aria-hidden />
                  <Eyebrow tone="gold">The Atelier</Eyebrow>
                </div>
              </RevealOnScroll>

              <SplitHeading
                text={"Crafted with\nintention."}
                className="text-display-md font-medium text-[var(--ink)]"
                immediate={false}
                stagger={0.1}
              />

              <RevealOnScroll variant="fade-up" delay={0.2} amount={0.3}>
                <p className="text-body-lg max-w-[48ch] text-[var(--stone)]">
                  We work with a small collective of Pakistani artisans — third-
                  and fourth-generation craftspeople who shape each piece by
                  hand. From hand-knotted textiles to solid oak furniture, every
                  object carries the mark of its maker.
                </p>
              </RevealOnScroll>

              <RevealOnScroll variant="fade-up" delay={0.5} amount={0.3}>
                <div className="mt-8 grid grid-cols-3 gap-6 border-t border-[var(--line)] pt-8">
                  {[
                    { icon: Leaf, label: "Sustainable Materials" },
                    { icon: Ruler, label: "Made to Measure" },
                    { icon: Hammer, label: "Hand-Finished" },
                  ].map((item) => (
                    <div key={item.label} className="flex flex-col gap-3">
                      <item.icon
                        className="h-6 w-6 text-[var(--gold-deep)]"
                        strokeWidth={1}
                      />
                      <span className="text-body-sm text-[var(--stone)]">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </Container>
      </Section>

      {/* ===============================================================
       * FAQ
       * ============================================================= */}
      <Section spacing="xl" tone="default" id="faq">
        <Container size="narrow" className="flex flex-col gap-12">
          <div className="flex flex-col items-center text-center">
            <RevealOnScroll variant="fade" amount={0.6}>
              <Eyebrow tone="gold">Client Care</Eyebrow>
            </RevealOnScroll>
            <RevealOnScroll variant="fade-up" delay={0.1} amount={0.5}>
              <LuxuryHeading
                variant="display-md"
                as="h2"
                balance
                className="mt-4"
              >
                Questions, answered
              </LuxuryHeading>
            </RevealOnScroll>
            <RevealOnScroll variant="fade" delay={0.2} amount={0.5}>
              <DecorativeDivider variant="ornament" className="mt-8" />
            </RevealOnScroll>
          </div>

          <RevealOnScroll variant="fade-up" amount={0.2}>
            <FAQAccordion
              items={[
                {
                  q: "What is your delivery timeline?",
                  a: "Standard delivery across Pakistan takes 3-5 business days. White-glove delivery in Lahore, Karachi, and Islamabad within 7 business days.",
                },
                {
                  q: "Do you offer returns?",
                  a: "Yes. We accept returns within 30 days of delivery for unused items in original packaging.",
                },
                {
                  q: "Do you offer trade pricing?",
                  a: "Yes — our Trade Program offers 15-25% off retail for interior designers.",
                },
                {
                  q: "Can I customize a piece?",
                  a: "Many pieces can be customized in dimension, finish, or upholstery. Custom orders take 6-8 weeks.",
                },
                {
                  q: "What payment methods do you accept?",
                  a: "All major cards, bank transfers, JazzCash, and Easypaisa. Cash on delivery for orders under ₨25,000.",
                },
              ]}
            />
          </RevealOnScroll>
        </Container>
      </Section>

      {/* ===============================================================
       * Trade CTA
       * ============================================================= */}
      <Section spacing="xl" tone="ink" className="grain-overlay">
        <Container size="narrow" className="text-center">
          <RevealOnScroll variant="fade" amount={0.5}>
            <Eyebrow tone="gold">Trade Program</Eyebrow>
          </RevealOnScroll>
          <BlurReveal variant="blur-up" delay={0.1} amount={0.3}>
            <LuxuryHeading
              variant="display-lg"
              as="h2"
              balance
              className="mt-4 text-white"
            >
              For designers, by designers
            </LuxuryHeading>
          </BlurReveal>
          <BlurReveal variant="blur-up" delay={0.2} amount={0.3}>
            <p className="text-body-lg mx-auto mt-6 max-w-[48ch] text-white/70">
              Join our trade program for 15–25% off retail, dedicated account
              management, and priority lead times on commercial projects.
            </p>
          </BlurReveal>
          <BlurReveal variant="blur-up" delay={0.3} amount={0.3}>
            <div className="mt-10 flex justify-center">
              <Button variant="gold" size="xl" asChild>
                <a href="/sign-up" data-cursor="text" data-cursor-text="Apply">
                  Apply for Trade Access
                  <ArrowRight className="arrow h-4 w-4" strokeWidth={1.5} />
                </a>
              </Button>
            </div>
          </BlurReveal>
        </Container>
      </Section>
    </>
  );
}
