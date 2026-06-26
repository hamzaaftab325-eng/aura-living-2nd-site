/**
 * Aura Living — Phase 1.3 + 1.4 Component & Animation Showcase
 *
 * This page demonstrates the full luxury design system + animation toolkit.
 * Will be replaced by the real storefront in Phase 3.
 *
 * Showcases:
 *   • GlassmorphicHeader with blur-on-scroll
 *   • Hero with SplitHeading line-by-line reveal
 *   • MagneticButton CTAs
 *   • Marquee brand strip
 *   • ParallaxImage editorial section
 *   • ProductCard grid with hover effects + quick-add slide-up
 *   • Tilt cards
 *   • Counter statistics
 *   • StaggerContainer children reveals
 *   • UnderlineInput form pattern
 *   • MaterialChip variants
 *   • RevealOnScroll section transitions
 */

import {
  Container,
  Section,
  Eyebrow,
  LuxuryHeading,
} from "@/components/layout";
import {
  RevealOnScroll,
  SplitHeading,
  MagneticButton,
  ParallaxImage,
  StaggerContainer,
  StaggerItem,
  Marquee,
  Counter,
  Tilt,
} from "@/components/motion";
import {
  Button,
  UnderlineInput,
  MaterialChip,
  ProductCard,
  GlassmorphicHeader,
  LuxuryBadge,
} from "@/components/ui";
import { brand } from "@/config/brand";
import {
  ArrowRight,
  Search,
  ShoppingBag,
  User,
  Truck,
  Shield,
  Sparkles,
} from "lucide-react";

export default function HomePage() {
  return (
    <main className="bg-background min-h-screen">
      {/* ===============================================================
       * Glassmorphic Header
       * ============================================================= */}
      <GlassmorphicHeader>
        <span className="text-headline-sm font-medium tracking-tight">
          {brand.name}
        </span>
        <nav className="hidden gap-10 md:flex">
          <Button variant="underline" asChild>
            <a href="#shop">Shop</a>
          </Button>
          <Button variant="underline" asChild>
            <a href="#atelier">Atelier</a>
          </Button>
          <Button variant="underline" asChild>
            <a href="#stats">Story</a>
          </Button>
          <Button variant="underline" asChild>
            <a href="#contact">Contact</a>
          </Button>
        </nav>
        <div className="flex items-center gap-5 text-[var(--ink)]">
          <Search
            className="h-5 w-5 cursor-pointer transition-colors hover:text-[var(--gold-deep)]"
            strokeWidth={1}
          />
          <User
            className="h-5 w-5 cursor-pointer transition-colors hover:text-[var(--gold-deep)]"
            strokeWidth={1}
          />
          <button className="relative" aria-label="Cart">
            <ShoppingBag
              className="h-5 w-5 transition-colors hover:text-[var(--gold-deep)]"
              strokeWidth={1}
            />
            <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--gold)] text-[0.625rem] font-semibold text-[var(--ink)]">
              3
            </span>
          </button>
        </div>
      </GlassmorphicHeader>

      {/* ===============================================================
       * Hero — SplitHeading + Magnetic CTAs
       * ============================================================= */}
      <Section spacing="xl" tone="default" bare>
        <Container>
          <div className="grid gap-16 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div className="flex flex-col gap-8">
              <RevealOnScroll variant="fade" amount={0.5}>
                <Eyebrow tone="gold">Autumn Collection — 2026</Eyebrow>
              </RevealOnScroll>

              <SplitHeading
                text={"Curated calm\nfor considered\nliving."}
                className="text-display-xl font-medium text-[var(--ink)]"
                stagger={0.12}
                delay={0.2}
              />

              <RevealOnScroll variant="fade-up" delay={0.6} amount={0.4}>
                <p className="text-body-lg max-w-[48ch] text-[var(--stone)]">
                  A refined collection of home decor, selected for
                  craftsmanship, material integrity, and quiet presence.
                  Designed in Lahore, crafted for the discerning Pakistani home.
                </p>
              </RevealOnScroll>

              <RevealOnScroll variant="fade-up" delay={0.8} amount={0.4}>
                <div className="flex flex-wrap gap-4 pt-2">
                  <MagneticButton>
                    <Button variant="primary" size="lg">
                      Shop the Collection
                      <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                    </Button>
                  </MagneticButton>
                  <MagneticButton strength={0.2}>
                    <Button variant="outline-luxury" size="lg">
                      Explore Atelier
                    </Button>
                  </MagneticButton>
                </div>
              </RevealOnScroll>
            </div>

            {/* Hero image with parallax */}
            <RevealOnScroll variant="blur" delay={0.4} amount={0.3}>
              <ParallaxImage
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&q=80"
                alt="Luxury living room with curated decor"
                speed={0.3}
                scale={1.15}
                containerClassName="aspect-editorial rounded-[0.375rem] overflow-hidden"
                priority
              />
            </RevealOnScroll>
          </div>
        </Container>
      </Section>

      {/* ===============================================================
       * Marquee — brand values strip
       * ============================================================= */}
      <div className="border-y border-[var(--line)] bg-[var(--ink)] py-6 text-[var(--cream)]">
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
              <span className="text-headline-sm font-medium italic">
                {item}
              </span>
              <Sparkles
                className="h-4 w-4 text-[var(--gold)]"
                strokeWidth={1}
              />
            </span>
          ))}
        </Marquee>
      </div>

      {/* ===============================================================
       * Product Grid — ProductCard with hover effects
       * ============================================================= */}
      <Section spacing="xl" tone="default" id="shop">
        <div className="mb-12 flex flex-col items-center text-center">
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
          stagger={0.12}
          amount={0.1}
          className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4"
        >
          {PRODUCTS.map((product) => (
            <StaggerItem key={product.id} variant="fade-up">
              <Tilt max={4} scale={1.01}>
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
          <MagneticButton>
            <Button variant="outline-luxury" size="lg">
              View All Products
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </Button>
          </MagneticButton>
        </div>
      </Section>

      {/* ===============================================================
       * Stats — Counter section
       * ============================================================= */}
      <Section spacing="xl" tone="surface" id="stats">
        <Container>
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            <StatBlock value={1247} label="Curated Pieces" />
            <StatBlock value={98} suffix="%" label="Happy Clients" />
            <StatBlock value={32} label="Artisan Partners" />
            <StatBlock value={25000} prefix="₨" label="Free Shipping Over" />
          </div>
        </Container>
      </Section>

      {/* ===============================================================
       * Atelier Story — parallax + split text
       * ============================================================= */}
      <Section spacing="xl" tone="default" id="atelier" bare>
        <Container>
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <RevealOnScroll variant="blur" amount={0.3}>
              <ParallaxImage
                src="https://images.unsplash.com/photo-1567016432779-094069958ea5?w=900&q=80"
                alt="Artisan crafting decor"
                speed={0.4}
                containerClassName="aspect-[4/5] rounded-[0.375rem] overflow-hidden"
              />
            </RevealOnScroll>

            <div className="flex flex-col gap-6">
              <RevealOnScroll variant="fade" amount={0.5}>
                <Eyebrow tone="gold">The Atelier</Eyebrow>
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
                  <MaterialChip label="Velvet" selected />
                  <MaterialChip label="Oak" />
                  <MaterialChip label="Linen" />
                  <MaterialChip label="Brass" variant="gold" />
                  <MaterialChip label="Marble" />
                  <MaterialChip label="Walnut" />
                </div>
              </RevealOnScroll>
              <RevealOnScroll variant="fade-up" delay={0.4} amount={0.3}>
                <MagneticButton className="mt-4">
                  <Button variant="underline" size="lg">
                    Read our story
                    <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                  </Button>
                </MagneticButton>
              </RevealOnScroll>
            </div>
          </div>
        </Container>
      </Section>

      {/* ===============================================================
       * Service Highlights — Tilt cards
       * ============================================================= */}
      <Section spacing="lg" tone="default">
        <StaggerContainer
          stagger={0.15}
          amount={0.2}
          className="grid gap-8 md:grid-cols-3"
        >
          {[
            {
              icon: Truck,
              title: "White Glove Delivery",
              desc: "Free over ₨25,000 — assembled in your home",
            },
            {
              icon: Shield,
              title: "Lifetime Guarantee",
              desc: "Crafted to last — backed by our promise",
            },
            {
              icon: Sparkles,
              title: "Trade Program",
              desc: "Exclusive pricing for interior designers",
            },
          ].map((service, i) => (
            <StaggerItem key={i} variant="fade-up">
              <Tilt max={5} scale={1.01} className="group h-full">
                <div className="h-full border border-[var(--line)] bg-[var(--cream)] p-10 transition-colors duration-500 group-hover:bg-[var(--cream-warm)]">
                  <service.icon
                    className="h-8 w-8 text-[var(--gold-deep)]"
                    strokeWidth={1}
                  />
                  <h3 className="text-headline-sm mt-6 font-medium text-[var(--ink)]">
                    {service.title}
                  </h3>
                  <p className="text-body-md mt-3 text-[var(--stone)]">
                    {service.desc}
                  </p>
                </div>
              </Tilt>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      {/* ===============================================================
       * Newsletter — UnderlineInput + RevealOnScroll
       * ============================================================= */}
      <Section spacing="xl" tone="ink" id="contact">
        <Container size="narrow" className="text-center">
          <RevealOnScroll variant="fade" amount={0.5}>
            <Eyebrow tone="gold">Stay in touch</Eyebrow>
          </RevealOnScroll>
          <RevealOnScroll variant="fade-up" delay={0.1} amount={0.4}>
            <LuxuryHeading
              variant="display-md"
              as="h2"
              balance
              className="mt-4 text-white"
            >
              Letters from the atelier
            </LuxuryHeading>
          </RevealOnScroll>
          <RevealOnScroll variant="fade-up" delay={0.2} amount={0.3}>
            <p className="text-body-lg mx-auto mt-4 max-w-[48ch] text-white/70">
              New arrivals, artisan stories, and seasonal notes — delivered
              quietly, once a month.
            </p>
          </RevealOnScroll>
          <RevealOnScroll variant="fade-up" delay={0.3} amount={0.3}>
            <form className="mx-auto mt-10 flex max-w-md flex-col gap-6">
              <UnderlineInput
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                className="text-white placeholder:text-white/40"
              />
              <MagneticButton>
                <Button variant="gold" size="lg" type="submit">
                  Subscribe
                  <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                </Button>
              </MagneticButton>
            </form>
          </RevealOnScroll>
        </Container>
      </Section>

      {/* ===============================================================
       * Footer
       * ============================================================= */}
      <footer className="border-t border-white/10 bg-[var(--ink)] py-16 text-[var(--cream)]">
        <Container className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <LuxuryHeading variant="headline-sm" as="p" italic>
              {brand.name}
            </LuxuryHeading>
            <p className="text-body-sm mt-3 max-w-[40ch] text-white/60">
              {brand.tagline}
            </p>
            <div className="mt-6 flex gap-3">
              <LuxuryBadge variant="bestseller" size="sm">
                {brand.currency.code}
              </LuxuryBadge>
              <LuxuryBadge variant="limited" size="sm">
                Made in Pakistan
              </LuxuryBadge>
            </div>
          </div>
          <div>
            <Eyebrow tone="gold">Visit</Eyebrow>
            <p className="text-body-sm mt-3 text-white/80">
              {brand.address.street}
              <br />
              {brand.address.city}, {brand.address.province}
              <br />
              {brand.address.country}
            </p>
          </div>
          <div>
            <Eyebrow tone="gold">Contact</Eyebrow>
            <p className="text-body-sm mt-3 text-white/80">
              {brand.email}
              <br />
              {brand.phone}
            </p>
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
    <RevealOnScroll variant="fade-up" amount={0.4} className="text-center">
      <Counter
        value={value}
        prefix={prefix}
        suffix={suffix}
        className="text-display-md font-medium text-[var(--ink)]"
      />
      <p className="label-caps mt-3 text-[var(--muted)]">{label}</p>
    </RevealOnScroll>
  );
}

// ---------- Mock data ----------

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
      "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=600&q=80&sat=-20",
    category: "Tables",
    badge: "New" as const,
  },
  {
    id: "8",
    name: "Travertine Bowl",
    price: 12500,
    image:
      "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=600&q=80",
    category: "Decor",
  },
];
