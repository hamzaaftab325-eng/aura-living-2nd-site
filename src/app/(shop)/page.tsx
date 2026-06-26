export const dynamic = "force-dynamic";
/**
 * Aura Living — Home Page
 * Editorial luxury composition with varied section layouts.
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
  DecorativeDivider,
} from "@/components/motion";
import {
  Button,
  ProductCard,
  CategoryCard,
  TestimonialCard,
  FAQAccordion,
} from "@/components/ui";
import { HeroSlider } from "@/components/shop/hero-slider";
import { getFeaturedProducts, getAllCategories } from "@/server/db/queries";
import {
  ArrowRight,
  Truck,
  Shield,
  Hammer,
  Sparkles,
  Leaf,
  Ruler,
} from "lucide-react";

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts(4);
  const categories = await getAllCategories();

  return (
    <>
      <ScrollProgress />

      {/* 1. Hero Slider */}
      <HeroSlider />

      {/* 2. Marquee */}
      <div className="grain-overlay border-y border-[var(--ink)] bg-[var(--ink)] py-6">
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

      {/* 3. Featured Products — editorial 2-column layout */}
      <section className="bg-[var(--background)] py-24 md:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-20">
            {/* Left — title column */}
            <div className="flex flex-col gap-6 lg:sticky lg:top-32 lg:self-start">
              <RevealOnScroll variant="fade">
                <Eyebrow tone="gold">New Arrivals</Eyebrow>
              </RevealOnScroll>
              <SplitHeading
                text={"The\nAutumn\nEdit."}
                className="text-display-lg font-medium text-[var(--ink)]"
                immediate={false}
                stagger={0.1}
              />
              <RevealOnScroll variant="fade-up" delay={0.3}>
                <p className="text-body-lg max-w-[40ch] text-[var(--stone)]">
                  {featuredProducts.length} hand-selected pieces — each chosen
                  for craftsmanship, material integrity, and quiet presence.
                </p>
              </RevealOnScroll>
              <RevealOnScroll variant="fade-up" delay={0.4}>
                <Button variant="link-arrow" size="lg" asChild>
                  <a href="/shop">
                    View All Products
                    <ArrowRight className="arrow h-4 w-4" strokeWidth={1.5} />
                  </a>
                </Button>
              </RevealOnScroll>
            </div>

            {/* Right — product grid */}
            <StaggerContainer
              stagger={0.1}
              amount={0.1}
              className="grid grid-cols-2 gap-x-6 gap-y-10"
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
          </div>
        </Container>
      </section>

      {/* 4. Categories — full-width dark section */}
      <section className="bg-[var(--ink)] py-24 md:py-32">
        <Container>
          <div className="mb-16 flex flex-col gap-3">
            <RevealOnScroll variant="fade">
              <Eyebrow tone="gold">Shop by Category</Eyebrow>
            </RevealOnScroll>
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <RevealOnScroll variant="fade-up" delay={0.1}>
                <LuxuryHeading
                  variant="display-md"
                  as="h2"
                  balance
                  className="text-white"
                >
                  Eight collections, one philosophy
                </LuxuryHeading>
              </RevealOnScroll>
              <RevealOnScroll variant="fade-up" delay={0.2}>
                <Button variant="link-arrow" size="lg" asChild>
                  <a href="/shop" className="text-white">
                    Browse All
                    <ArrowRight className="arrow h-4 w-4" strokeWidth={1.5} />
                  </a>
                </Button>
              </RevealOnScroll>
            </div>
          </div>

          <StaggerContainer
            stagger={0.06}
            amount={0.05}
            className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-8"
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
      </section>

      {/* 5. Editorial banner — full-bleed parallax */}
      <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-[var(--ink)]">
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

      {/* 6. Atelier Story — split layout */}
      <section className="bg-[var(--background)] py-24 md:py-32" id="atelier">
        <Container>
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center lg:gap-20">
            <BlurReveal variant="blur-scale" amount={0.3}>
              <ImageReveal
                src="/images/atelier-story.png"
                alt="Artisan crafting decor"
                direction="left"
                containerClassName="aspect-[4/5] overflow-hidden"
              />
            </BlurReveal>

            <div className="flex flex-col gap-6">
              <RevealOnScroll variant="fade">
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

              <RevealOnScroll variant="fade-up" delay={0.2}>
                <p className="text-body-lg max-w-[48ch] text-[var(--stone)]">
                  We work with a small collective of Pakistani artisans — third-
                  and fourth-generation craftspeople who shape each piece by
                  hand. From hand-knotted textiles to solid oak furniture, every
                  object carries the mark of its maker.
                </p>
              </RevealOnScroll>

              <RevealOnScroll variant="fade-up" delay={0.5}>
                <div className="mt-8 grid grid-cols-3 gap-6 border-t border-[var(--line)] pt-8">
                  {[
                    { icon: Leaf, label: "Sustainable" },
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
      </section>

      {/* 7. Stats — dark band */}
      <section className="bg-[var(--ink)] py-20">
        <Container>
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            {[
              { value: 16, label: "Curated Pieces" },
              { value: 98, suffix: "%", label: "Happy Clients" },
              { value: 8, label: "Collections" },
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
                  className="text-display-md font-medium text-white"
                />
                <p className="label-caps mt-3 text-white/50">{stat.label}</p>
              </BlurReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 8. Testimonials */}
      <section className="bg-[var(--background)] py-24 md:py-32">
        <Container>
          <div className="mb-16 flex flex-col items-center text-center">
            <RevealOnScroll variant="fade">
              <Eyebrow tone="gold">Client Voices</Eyebrow>
            </RevealOnScroll>
            <RevealOnScroll variant="fade-up" delay={0.1}>
              <LuxuryHeading
                variant="display-md"
                as="h2"
                balance
                className="mt-4"
              >
                Quietly trusted, by design
              </LuxuryHeading>
            </RevealOnScroll>
            <RevealOnScroll variant="fade" delay={0.2}>
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
      </section>

      {/* 9. FAQ */}
      <section className="bg-[var(--cream)] py-24 md:py-32" id="faq">
        <Container size="narrow" className="flex flex-col gap-12">
          <div className="flex flex-col items-center text-center">
            <RevealOnScroll variant="fade">
              <Eyebrow tone="gold">Client Care</Eyebrow>
            </RevealOnScroll>
            <RevealOnScroll variant="fade-up" delay={0.1}>
              <LuxuryHeading
                variant="display-md"
                as="h2"
                balance
                className="mt-4"
              >
                Questions, answered
              </LuxuryHeading>
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
      </section>

      {/* 10. Trade CTA — dark */}
      <section
        className="grain-overlay bg-[var(--ink)] py-24 md:py-32"
        id="trade"
      >
        <Container size="narrow" className="text-center">
          <RevealOnScroll variant="fade">
            <Eyebrow tone="gold">Trade Program</Eyebrow>
          </RevealOnScroll>
          <BlurReveal variant="blur-up" delay={0.1}>
            <LuxuryHeading
              variant="display-lg"
              as="h2"
              balance
              className="mt-4 text-white"
            >
              For designers, by designers
            </LuxuryHeading>
          </BlurReveal>
          <BlurReveal variant="blur-up" delay={0.2}>
            <p className="text-body-lg mx-auto mt-6 max-w-[48ch] text-white/70">
              Join our trade program for 15–25% off retail, dedicated account
              management, and priority lead times on commercial projects.
            </p>
          </BlurReveal>
          <BlurReveal variant="blur-up" delay={0.3}>
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
      </section>
    </>
  );
}
