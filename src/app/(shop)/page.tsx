/**
 * Aura Living — Home Page
 * Full-bleed hero slider + real DB products + editorial sections.
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
  SplitHeading,
  ImageReveal,
  StaggerContainer,
  StaggerItem,
  ScrollProgress,
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
import { HeroSlider } from "@/components/shop/hero-slider";
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

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts(8);
  const newArrivals = await getNewArrivals(4);
  const categories = await getAllCategories();

  return (
    <>
      <ScrollProgress />

      {/* ===============================================================
       * 1. Hero Slider — full-bleed, auto-advancing
       * ============================================================= */}
      <HeroSlider />

      {/* ===============================================================
       * 2. Marquee — brand values strip
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
       * 3. Categories (real DB data)
       * ============================================================= */}
      <Section spacing="xl" tone="default" id="categories">
        <Container>
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
                  image={cat.imageUrl ?? "/images/hero-1.png"}
                  href={`/shop/${cat.slug}`}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      {/* ===============================================================
       * 4. Featured Products (real DB data)
       * ============================================================= */}
      <Section spacing="xl" tone="surface" id="products">
        <Container>
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
                    image={product.images[0] ?? "/images/hero-1.png"}
                    alternateImage={product.images[1]}
                    badge={product.isFeatured ? "New" : undefined}
                    category={product.category?.name}
                    href={`/product/${product.slug}`}
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
              <a href="/shop">
                View All Products
                <ArrowRight className="arrow h-4 w-4" strokeWidth={1.5} />
              </a>
            </Button>
          </div>
        </Container>
      </Section>

      {/* ===============================================================
       * 5. Editorial Banner — full-bleed parallax
       * ============================================================= */}
      <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-[var(--ink)]">
        <div className="absolute inset-0">
          <ImageReveal
            src="/images/editorial-banner.png"
            alt="Editorial atelier interior"
            direction="up"
            duration={1.5}
            containerClassName="absolute inset-0"
          />
          <div className="absolute inset-0 bg-[rgba(18,18,18,0.55)]" />
          <div className="grain-overlay absolute inset-0" />
        </div>

        <Container className="relative z-10 py-24">
          <div className="max-w-3xl">
            <BlurReveal variant="blur-fade" amount={0.4}>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[var(--gold)]" aria-hidden />
                <span className="label-caps text-[var(--gold)]">
                  The Atelier Issue 03
                </span>
              </div>
            </BlurReveal>
            <h2 className="text-display-lg mt-6 leading-[1.05] font-medium tracking-[-0.02em] text-white">
              {["Where", "every", "object", "earns", "its", "place."].map(
                (word, i) => (
                  <span key={i} className="inline-block overflow-hidden">
                    <BlurReveal
                      variant="blur-up"
                      delay={i * 0.06}
                      amount={0.3}
                      className="inline-block"
                    >
                      {word}&nbsp;
                    </BlurReveal>
                  </span>
                ),
              )}
            </h2>
            <BlurReveal variant="blur-up" delay={0.4} amount={0.3}>
              <p className="text-body-lg mt-6 max-w-[48ch] text-white/80">
                We work with a small collective of Pakistani artisans — third-
                and fourth-generation craftspeople who shape each piece by hand.
                No mass production. No compromises. Just objects made to outlive
                trends.
              </p>
            </BlurReveal>
            <BlurReveal variant="blur-up" delay={0.5} amount={0.3}>
              <div className="mt-8">
                <Button variant="gold" size="lg" asChild>
                  <a href="#atelier">
                    Read the Story
                    <ArrowRight className="arrow h-4 w-4" strokeWidth={1.5} />
                  </a>
                </Button>
              </div>
            </BlurReveal>
          </div>
        </Container>
      </section>

      {/* ===============================================================
       * 6. Stats — animated Counters
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
       * 7. Testimonials
       * ============================================================= */}
      <Section spacing="xl" tone="surface">
        <Container>
          <div className="mb-16 flex flex-col items-center text-center">
            <RevealOnScroll variant="fade" amount={0.6}>
              <Eyebrow tone="gold">Client Voices</Eyebrow>
            </RevealOnScroll>
            <RevealOnScroll variant="fade-up" delay={0.1} amount={0.5}>
              <LuxuryHeading
                variant="display-md"
                as="h2"
                balance
                className="mt-4"
              >
                Quietly trusted, by design
              </LuxuryHeading>
            </RevealOnScroll>
            <RevealOnScroll variant="fade" delay={0.2} amount={0.5}>
              <DecorativeDivider variant="ornament" className="mt-8" />
            </RevealOnScroll>
          </div>

          <StaggerContainer
            stagger={0.15}
            amount={0.1}
            className="grid gap-6 md:grid-cols-3"
          >
            {[
              {
                quote:
                  "Aura Living transformed our Lahore home into a sanctuary. Every piece feels considered, intentional, and quietly luxurious.",
                author: "Ayesha Khan",
                role: "Interior Designer, Lahore",
                rating: 5,
              },
              {
                quote:
                  "The craftsmanship is unmatched. Our walnut console arrived with white-glove delivery and feels like an heirloom in the making.",
                author: "Bilal Ahmed",
                role: "Architect, Islamabad",
                rating: 5,
              },
              {
                quote:
                  "Finally, a Pakistani brand that understands quiet luxury. The materials, the scale, the service — everything is right.",
                author: "Mariam Hassan",
                role: "Homeowner, Karachi",
                rating: 5,
              },
            ].map((testimonial, i) => (
              <StaggerItem key={i} variant="fade-up">
                <TestimonialCard
                  quote={testimonial.quote}
                  author={testimonial.author}
                  role={testimonial.role}
                  rating={testimonial.rating}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      {/* ===============================================================
       * 8. Atelier Story
       * ============================================================= */}
      <Section spacing="xl" tone="default" id="atelier" bare>
        <Container>
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center lg:gap-20">
            <BlurReveal variant="blur-scale" amount={0.3}>
              <ImageReveal
                src="/images/atelier-story.png"
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
       * 9. FAQ
       * ============================================================= */}
      <Section spacing="xl" tone="surface" id="faq">
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
       * 10. Instagram
       * ============================================================= */}
      <Section spacing="lg" tone="default">
        <Container>
          <InstagramGrid
            handle="auraliving.pk"
            images={[
              "/images/hero-1.png",
              "/images/hero-2.png",
              "/images/atelier-story.png",
              "/images/cat-tables.png",
              "/images/cat-textiles.png",
            ]}
          />
        </Container>
      </Section>

      {/* ===============================================================
       * 11. Trade CTA
       * ============================================================= */}
      <Section spacing="xl" tone="ink" className="grain-overlay" id="trade">
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
                <a href="/sign-up">
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
