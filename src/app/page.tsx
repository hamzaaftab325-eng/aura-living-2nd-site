/**
 * Aura Living — Production Showcase (Phase 1.3 + 1.4 Refined)
 *
 * 12 sections, all luxury-polished:
 *   1. GlassmorphicHeader — sticky, blur-on-scroll, shrinks on scroll
 *   2. Hero — char-by-char SplitHeading + ImageReveal + scroll cue
 *   3. Marquee — brand values strip on ink
 *   4. Categories — 8 category tiles with image zoom + arrow slide
 *   5. Editorial banner — full-bleed parallax with WordReveal overlay
 *   6. Product grid — StaggerContainer + Tilt + ProductCard (8 products)
 *   7. Stats — animated Counters with BlurReveal
 *   8. Testimonials — 3 testimonial cards with star ratings
 *   9. Atelier story — SplitHeading + parallax + MaterialChips
 *  10. Journal — 3 editorial article previews
 *  11. Newsletter — split layout on ink with WordReveal + success state
 *  12. FAQ — luxury accordion
 *  13. Instagram — 5-cell editorial grid
 *  14. Footer — multi-column with LuxuryBadges
 *
 * No magnetic buttons. Premium CSS-driven hover effects everywhere.
 * No inline styles (animation `style` props on motion components excepted).
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
  ParallaxImage,
  ImageReveal,
  StaggerContainer,
  StaggerItem,
  ScrollProgress,
  Marquee,
  Counter,
  Tilt,
  DrawLine,
} from "@/components/motion";
import {
  Button,
  ProductCard,
  GlassmorphicHeader,
  CategoryCard,
  TestimonialCard,
  JournalCard,
  FAQAccordion,
  NewsletterSignup,
  InstagramGrid,
  MaterialChip,
} from "@/components/ui";
import { brand } from "@/config/brand";
import {
  ArrowRight,
  ArrowUpRight,
  Search,
  ShoppingBag,
  User,
  Truck,
  Shield,
  Sparkles,
  Ruler,
  Hammer,
  Leaf,
  ChevronDown,
  Instagram,
} from "lucide-react";

export default function HomePage() {
  return (
    <main className="bg-background min-h-screen">
      <ScrollProgress />

      {/* ===============================================================
       * 1. Glassmorphic Header
       * ============================================================= */}
      <GlassmorphicHeader>
        <a href="#top" className="flex items-baseline gap-2">
          <span className="text-headline-sm font-medium tracking-tight text-[var(--ink)]">
            {brand.name}
          </span>
          <span className="label-caps hidden text-[var(--gold-deep)] sm:inline">
            Est. 2026
          </span>
        </a>
        <nav className="hidden gap-10 md:flex">
          <Button variant="underline" asChild>
            <a href="#categories">Shop</a>
          </Button>
          <Button variant="underline" asChild>
            <a href="#atelier">Atelier</a>
          </Button>
          <Button variant="underline" asChild>
            <a href="#journal">Journal</a>
          </Button>
          <Button variant="underline" asChild>
            <a href="#faq">Help</a>
          </Button>
        </nav>
        <div className="flex items-center gap-5 text-[var(--ink)]">
          <button
            aria-label="Search"
            className="transition-colors duration-300 hover:text-[var(--gold-deep)]"
          >
            <Search className="h-5 w-5" strokeWidth={1} />
          </button>
          <button
            aria-label="Account"
            className="transition-colors duration-300 hover:text-[var(--gold-deep)]"
          >
            <User className="h-5 w-5" strokeWidth={1} />
          </button>
          <button
            aria-label="Cart"
            className="relative transition-colors duration-300 hover:text-[var(--gold-deep)]"
          >
            <ShoppingBag className="h-5 w-5" strokeWidth={1} />
            <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--gold)] text-[0.625rem] font-semibold text-[var(--ink)]">
              3
            </span>
          </button>
        </div>
      </GlassmorphicHeader>

      {/* ===============================================================
       * 2. Hero — SplitHeading + ImageReveal + scroll cue
       * ============================================================= */}
      <Section spacing="xl" tone="default" id="top" bare>
        <Container>
          <div className="grid gap-16 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-20">
            {/* Left — copy */}
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
                    <a href="#products">
                      Shop the Collection
                      <ArrowRight className="arrow h-4 w-4" strokeWidth={1.5} />
                    </a>
                  </Button>
                  <Button variant="outline-luxury" size="lg" asChild>
                    <a href="#atelier">
                      Explore Atelier
                      <ArrowUpRight
                        className="arrow h-4 w-4"
                        strokeWidth={1.5}
                      />
                    </a>
                  </Button>
                </div>
              </RevealOnScroll>

              {/* Trust strip */}
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

            {/* Right — hero image with cinematic reveal */}
            <div className="relative">
              <ImageReveal
                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80"
                alt="Luxury living room with curated decor"
                direction="right"
                duration={1.3}
                containerClassName="aspect-editorial rounded-[0.375rem] overflow-hidden"
                priority
              />
              {/* Floating editorial label */}
              <RevealOnScroll
                variant="fade-up"
                delay={0.6}
                amount={0.5}
                className="absolute bottom-6 left-6 z-10 max-w-[14rem] border-l border-[var(--gold)] bg-white/80 px-5 py-4 backdrop-blur-md"
              >
                <p className="label-caps text-[var(--gold-deep)]">Featured</p>
                <p className="text-body-sm mt-1 font-medium text-[var(--ink)]">
                  The Autumn Edit — 32 new pieces, hand-selected.
                </p>
              </RevealOnScroll>
            </div>
          </div>

          {/* Scroll cue */}
          <RevealOnScroll variant="fade" delay={1.2} amount={0.3}>
            <div className="mt-20 flex flex-col items-center gap-3 text-[var(--muted)]">
              <span className="label-caps">Scroll to discover</span>
              <ChevronDown className="h-4 w-4 animate-bounce" strokeWidth={1} />
            </div>
          </RevealOnScroll>
        </Container>
      </Section>

      {/* ===============================================================
       * 3. Marquee — brand values strip on ink
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
            "Trade Program",
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
       * 4. Categories — 8 luxury category tiles
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
          <RevealOnScroll variant="fade-up" delay={0.2} amount={0.4}>
            <p className="text-body-lg mx-auto mt-4 max-w-[52ch] text-[var(--stone)]">
              From hand-knotted textiles to solid oak furniture — explore the
              collections that define considered Pakistani living.
            </p>
          </RevealOnScroll>
        </div>

        <StaggerContainer
          stagger={0.08}
          amount={0.1}
          className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
        >
          {CATEGORIES.map((cat) => (
            <StaggerItem key={cat.slug} variant="fade-up">
              <CategoryCard
                name={cat.name}
                count={cat.count}
                image={cat.image}
                href={`/shop/${cat.slug}`}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      {/* ===============================================================
       * 5. Editorial Banner — full-bleed parallax with WordReveal overlay
       * ============================================================= */}
      <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-[var(--ink)]">
        <div className="absolute inset-0">
          <ParallaxImage
            src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1920&q=80"
            alt="Editorial atelier interior"
            speed={0.4}
            scale={1.2}
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
              <WordReveal
                text="Where every object earns its place."
                immediate={false}
                stagger={0.06}
                amount={0.3}
              />
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
              <Button variant="gold" size="lg" asChild className="mt-8">
                <a href="#atelier">
                  Read the Story
                  <ArrowRight className="arrow h-4 w-4" strokeWidth={1.5} />
                </a>
              </Button>
            </BlurReveal>
          </div>
        </Container>
      </section>

      {/* ===============================================================
       * 6. Product Grid — StaggerContainer + Tilt + ProductCard
       * ============================================================= */}
      <Section spacing="xl" tone="default" id="products">
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
          <RevealOnScroll variant="fade-up" delay={0.2} amount={0.4}>
            <p className="text-body-lg mt-4 max-w-[52ch] text-[var(--stone)]">
              Each piece is selected for its craftsmanship, material integrity,
              and quiet presence in the home.
            </p>
          </RevealOnScroll>
        </div>

        <StaggerContainer
          stagger={0.1}
          amount={0.1}
          className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4"
        >
          {PRODUCTS.map((product) => (
            <StaggerItem key={product.id} variant="fade-up">
              <Tilt max={3} scale={1.01}>
                <ProductCard
                  name={product.name}
                  price={product.price}
                  image={product.image}
                  badge={product.badge}
                  category={product.category}
                />
              </Tilt>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="mt-16 flex justify-center">
          <Button variant="outline-luxury" size="lg" asChild>
            <a href="/shop">
              View All Products
              <ArrowRight className="arrow h-4 w-4" strokeWidth={1.5} />
            </a>
          </Button>
        </div>
      </Section>

      {/* ===============================================================
       * 7. Stats — animated Counters with BlurReveal
       * ============================================================= */}
      <Section spacing="xl" tone="surface" id="stats">
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
            <StatBlock value={1247} label="Curated Pieces" />
            <StatBlock value={98} suffix="%" label="Happy Clients" />
            <StatBlock value={32} label="Artisan Partners" />
            <StatBlock value={25000} prefix="₨" label="Free Shipping Over" />
          </div>
        </Container>
      </Section>

      {/* ===============================================================
       * 8. Testimonials — 3 testimonial cards
       * ============================================================= */}
      <Section spacing="xl" tone="default">
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
        </div>

        <StaggerContainer
          stagger={0.15}
          amount={0.1}
          className="grid gap-6 md:grid-cols-3"
        >
          {TESTIMONIALS.map((testimonial, i) => (
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
      </Section>

      {/* ===============================================================
       * 9. Atelier Story — SplitHeading + parallax + chips
       * ============================================================= */}
      <Section spacing="xl" tone="surface" id="atelier" bare>
        <Container>
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center lg:gap-20">
            {/* Left — image */}
            <BlurReveal variant="blur-scale" amount={0.3}>
              <ParallaxImage
                src="https://images.unsplash.com/photo-1567016432779-094069958ea5?w=900&q=80"
                alt="Artisan crafting decor"
                speed={0.3}
                containerClassName="aspect-[4/5] rounded-[0.375rem] overflow-hidden"
              />
            </BlurReveal>

            {/* Right — copy */}
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

              <RevealOnScroll variant="fade-up" delay={0.3} amount={0.3}>
                <div className="flex flex-wrap gap-3 pt-2">
                  <MaterialChipDemo />
                </div>
              </RevealOnScroll>

              <RevealOnScroll variant="fade-up" delay={0.4} amount={0.3}>
                <div className="mt-4">
                  <Button variant="link-arrow" size="lg" asChild>
                    <a href="/atelier">
                      Read our story
                      <ArrowRight className="arrow h-4 w-4" strokeWidth={1.5} />
                    </a>
                  </Button>
                </div>
              </RevealOnScroll>

              {/* Service highlights */}
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
       * 10. Journal — 3 editorial article previews
       * ============================================================= */}
      <Section spacing="xl" tone="default" id="journal">
        <div className="mb-16 flex items-end justify-between gap-6">
          <div className="flex flex-col gap-4">
            <RevealOnScroll variant="fade" amount={0.6}>
              <Eyebrow tone="gold">The Journal</Eyebrow>
            </RevealOnScroll>
            <RevealOnScroll variant="fade-up" delay={0.1} amount={0.5}>
              <LuxuryHeading variant="display-md" as="h2" balance>
                Stories from the atelier
              </LuxuryHeading>
            </RevealOnScroll>
          </div>
          <RevealOnScroll variant="fade" delay={0.2} amount={0.5}>
            <Button
              variant="link-arrow"
              size="lg"
              asChild
              className="hidden shrink-0 sm:inline-flex"
            >
              <a href="/journal">
                All Articles
                <ArrowRight className="arrow h-4 w-4" strokeWidth={1.5} />
              </a>
            </Button>
          </RevealOnScroll>
        </div>

        <StaggerContainer
          stagger={0.15}
          amount={0.1}
          className="grid gap-8 md:grid-cols-3"
        >
          {JOURNAL.map((article) => (
            <StaggerItem key={article.title} variant="fade-up">
              <JournalCard
                title={article.title}
                excerpt={article.excerpt}
                category={article.category}
                date={article.date}
                image={article.image}
                href={article.href}
                readingTime={article.readingTime}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      {/* ===============================================================
       * 11. Newsletter — split layout on ink
       * ============================================================= */}
      <Section spacing="xl" tone="ink" className="grain-overlay">
        <Container>
          <NewsletterSignup />
        </Container>
      </Section>

      {/* ===============================================================
       * 12. FAQ — luxury accordion
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
          </div>

          <RevealOnScroll variant="fade-up" amount={0.2}>
            <FAQAccordion items={FAQ_ITEMS} />
          </RevealOnScroll>

          <div className="flex flex-col items-center gap-4 border-t border-[var(--line)] pt-12 text-center">
            <p className="text-body-md text-[var(--stone)]">
              Still have questions?
            </p>
            <Button variant="underline" size="lg" asChild>
              <a href="/contact">
                Contact our concierge
                <ArrowRight className="arrow h-4 w-4" strokeWidth={1.5} />
              </a>
            </Button>
          </div>
        </Container>
      </Section>

      {/* ===============================================================
       * 13. Instagram — editorial grid
       * ============================================================= */}
      <Section spacing="lg" tone="surface">
        <Container>
          <InstagramGrid handle="auraliving.pk" images={INSTAGRAM_IMAGES} />
        </Container>
      </Section>

      {/* ===============================================================
       * 14. Footer
       * ============================================================= */}
      <footer className="grain-overlay border-t border-white/10 bg-[var(--ink)] py-20 text-[var(--cream)]">
        <Container>
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div className="lg:col-span-1">
              <LuxuryHeading variant="headline-md" as="p" italic>
                {brand.name}
              </LuxuryHeading>
              <p className="text-body-sm mt-4 max-w-[36ch] text-white/60">
                {brand.tagline}
              </p>
              <div className="mt-6 flex gap-3">
                <a
                  href={brand.social.instagram}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 transition-all duration-300 hover:border-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--ink)]"
                  aria-label="Instagram"
                >
                  <Instagram className="h-4 w-4" strokeWidth={1} />
                </a>
                <a
                  href={brand.social.pinterest}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 transition-all duration-300 hover:border-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--ink)]"
                  aria-label="Pinterest"
                >
                  <Sparkles className="h-4 w-4" strokeWidth={1} />
                </a>
              </div>
            </div>

            {/* Shop */}
            <FooterColumn
              title="Shop"
              links={[
                { label: "All Collections", href: "/shop" },
                { label: "New Arrivals", href: "/shop?filter=new" },
                { label: "Bestsellers", href: "/shop?filter=bestseller" },
                { label: "Limited Edition", href: "/shop?filter=limited" },
              ]}
            />

            {/* Atelier */}
            <FooterColumn
              title="Atelier"
              links={[
                { label: "Our Story", href: "/atelier" },
                { label: "Craftsmanship", href: "/atelier/craft" },
                { label: "Materials", href: "/atelier/materials" },
                { label: "Sustainability", href: "/atelier/sustainability" },
              ]}
            />

            {/* Client Care */}
            <FooterColumn
              title="Client Care"
              links={[
                { label: "Contact Us", href: "/contact" },
                { label: "Shipping & Delivery", href: "/shipping" },
                { label: "Returns", href: "/returns" },
                { label: "Care Guide", href: "/care-guide" },
                { label: "Trade Program", href: "/trade" },
              ]}
            />
          </div>

          <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 md:flex-row">
            <p className="text-body-sm text-white/40">
              © 2026 {brand.name}. Crafted in Lahore, Pakistan.
            </p>
            <div className="flex gap-6 text-white/40">
              <a
                href="/legal/privacy"
                className="text-body-sm transition-colors duration-300 hover:text-white"
              >
                Privacy
              </a>
              <a
                href="/legal/terms"
                className="text-body-sm transition-colors duration-300 hover:text-white"
              >
                Terms
              </a>
              <a
                href="/legal/cookies"
                className="text-body-sm transition-colors duration-300 hover:text-white"
              >
                Cookies
              </a>
            </div>
          </div>
        </Container>
      </footer>
    </main>
  );
}

// ---------- Helpers ----------

function StatBlock({
  value,
  prefix,
  suffix,
  label,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
}) {
  return (
    <BlurReveal
      variant="blur-up"
      amount={0.4}
      className="flex flex-col items-center text-center"
    >
      <Counter
        value={value}
        prefix={prefix}
        suffix={suffix}
        className="text-display-md font-medium text-[var(--ink)]"
      />
      <DrawLine className="mt-4 h-px w-12" delay={0.3} />
      <p className="label-caps mt-4 text-[var(--muted)]">{label}</p>
    </BlurReveal>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="flex flex-col gap-5">
      <span className="label-caps text-[var(--gold)]">{title}</span>
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="text-body-sm text-white/70 transition-colors duration-300 hover:text-white"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

// MaterialChip demo for the atelier section
function MaterialChipDemo() {
  return (
    <>
      <MaterialChip label="Velvet" selected />
      <MaterialChip label="Oak" />
      <MaterialChip label="Linen" />
      <MaterialChip label="Brass" variant="gold" />
      <MaterialChip label="Marble" />
      <MaterialChip label="Walnut" />
    </>
  );
}

// ---------- Mock data ----------

const CATEGORIES = [
  {
    slug: "lighting",
    name: "Lighting",
    count: 42,
    image:
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600&q=80",
  },
  {
    slug: "seating",
    name: "Seating",
    count: 28,
    image:
      "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=600&q=80",
  },
  {
    slug: "tables",
    name: "Tables",
    count: 35,
    image:
      "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=600&q=80",
  },
  {
    slug: "textiles",
    name: "Textiles",
    count: 56,
    image:
      "https://images.unsplash.com/photo-1600369671236-e74521d4b6ad?w=600&q=80",
  },
  {
    slug: "decor",
    name: "Decor",
    count: 78,
    image:
      "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=600&q=80",
  },
  {
    slug: "mirrors",
    name: "Mirrors",
    count: 18,
    image:
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&q=80",
  },
  {
    slug: "storage",
    name: "Storage",
    count: 24,
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
  },
  {
    slug: "outdoor",
    name: "Outdoor",
    count: 16,
    image:
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600&q=80",
  },
];

const PRODUCTS = [
  {
    id: "1",
    name: "Lumen Pendant",
    price: 45000,
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80",
    category: "Lighting",
    badge: "New" as const,
  },
  {
    id: "2",
    name: "Velvet Lounge Chair",
    price: 125000,
    image:
      "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=600&q=80",
    category: "Seating",
    badge: "Bestseller" as const,
  },
  {
    id: "3",
    name: "Oak Side Table",
    price: 38000,
    image:
      "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=600&q=80",
    category: "Tables",
  },
  {
    id: "4",
    name: "Linen Throw",
    price: 8500,
    image:
      "https://images.unsplash.com/photo-1600369671236-e74521d4b6ad?w=600&q=80",
    category: "Textiles",
    badge: "Limited" as const,
  },
  {
    id: "5",
    name: "Brass Table Lamp",
    price: 32000,
    image:
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600&q=80",
    category: "Lighting",
  },
  {
    id: "6",
    name: "Marble Vase",
    price: 18500,
    image:
      "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=600&q=80",
    category: "Decor",
  },
  {
    id: "7",
    name: "Walnut Console",
    price: 95000,
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
    category: "Tables",
    badge: "New" as const,
  },
  {
    id: "8",
    name: "Ceramic Bowl",
    price: 12500,
    image:
      "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=600&q=80",
    category: "Decor",
  },
];

const TESTIMONIALS = [
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
];

const JOURNAL = [
  {
    title: "The Art of Slow Living",
    excerpt:
      "How to cultivate calm in your home through considered design, natural materials, and intentional negative space.",
    category: "Atelier Journal",
    date: "March 2026",
    readingTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
    href: "/journal/slow-living",
  },
  {
    title: "Meet the Artisans: Oak & Iron",
    excerpt:
      "Inside the Lahore workshop where third-generation craftspeople shape solid oak into furniture built to outlive trends.",
    category: "Meet the Maker",
    date: "February 2026",
    readingTime: "8 min read",
    image:
      "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=800&q=80",
    href: "/journal/oak-and-iron",
  },
  {
    title: "A Material Guide: Velvet, Linen, Brass",
    excerpt:
      "Understanding the materials that define considered interiors — and how to care for them across the seasons.",
    category: "Material Guide",
    date: "January 2026",
    readingTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1600369671236-e74521d4b6ad?w=800&q=80",
    href: "/journal/material-guide",
  },
];

const FAQ_ITEMS = [
  {
    q: "What is your delivery timeline?",
    a: "Standard delivery across Pakistan takes 3-5 business days. White-glove delivery (assembly + placement) is available in Lahore, Karachi, and Islamabad within 7 business days. International shipping is not currently offered.",
  },
  {
    q: "Do you offer returns?",
    a: "Yes. We accept returns within 30 days of delivery for unused items in original packaging. Custom and made-to-order pieces are non-returnable. Return shipping is complimentary for orders over ₨25,000.",
  },
  {
    q: "How do I care for my Aura Living pieces?",
    a: "Each product ships with a material-specific care card. Generally: dust wood weekly with a dry microfiber cloth, avoid direct sunlight on textiles, and use only pH-neutral cleaners on marble and stone. Detailed guides are available on each product page.",
  },
  {
    q: "Do you offer trade pricing for designers?",
    a: "Yes — our Trade Program offers 15-25% off retail, dedicated account management, and priority lead times for commercial projects. Apply via the Trade page with your business registration or design portfolio.",
  },
  {
    q: "Can I customize a piece?",
    a: "Many of our furniture pieces can be customized in dimension, finish, or upholstery. Custom orders take 6-8 weeks and carry a 25% surcharge. Contact our concierge to discuss your requirements.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major debit/credit cards, bank transfers, JazzCash, and Easypaisa. For orders above ₨100,000 we offer a 50/50 split-payment option. Cash on delivery is available for orders under ₨25,000.",
  },
];

const INSTAGRAM_IMAGES = [
  "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80",
  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80",
  "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=600&q=80",
  "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=600&q=80",
  "https://images.unsplash.com/photo-1600369671236-e74521d4b6ad?w=600&q=80",
];
