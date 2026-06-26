/**
 * Aura Living — Design System Showcase
 *
 * A comprehensive reference page showing ALL design system elements.
 * Useful for:
 *   - Reviewing the full design system in one place
 *   - Onboarding new developers
 *   - QA testing all components
 *   - Client preview of available components
 *
 * Sections:
 *   1. Hero — title + intro
 *   2. Color Palette — all brand colors with hex values
 *   3. Typography — full type scale (display-xl → label-caps)
 *   4. Buttons — all variants + sizes
 *   5. Inputs — UnderlineInput with all states
 *   6. Chips — MaterialChip variants
 *   7. Badges — LuxuryBadge variants
 *   8. Decorative — DrawLine, DecorativeDivider variants
 *   9. Motion — RevealOnScroll, BlurReveal, WordReveal, SplitHeading, Counter
 *  10. Luxury Components — ProductCard, CategoryCard, TestimonialCard, JournalCard
 *  11. FAQ — FAQAccordion
 *  12. Cart + Quantity — CartBadge, QuantityStepper
 *  13. Status — SuccessCheckmark, StepProgress
 *  14. Utility Classes — hover-lift, hover-zoom, hover-glow, glass-panel, etc.
 *  15. Gradients — all gradient utilities
 *  16. Shadows — all shadow utilities
 *
 * URL: /design
 * Public — no auth required (so client + designers can review)
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
  Counter,
  DrawLine,
  DecorativeDivider,
  StaggerContainer,
  StaggerItem,
  Marquee,
  Tilt,
  SuccessCheckmark,
  StepProgress,
  ScrollProgress,
} from "@/components/motion";
import {
  Button,
  UnderlineInput,
  MaterialChip,
  ProductCard,
  CategoryCard,
  TestimonialCard,
  JournalCard,
  FAQAccordion,
  CartBadge,
  LuxuryBadge,
} from "@/components/ui";
import {
  ArrowRight,
  ArrowUpRight,
  ShoppingBag,
  Heart,
  Sparkles,
  Truck,
  Shield,
  Hammer,
  Leaf,
  Check,
  Plus,
} from "lucide-react";
import { QuantityStepperDemo } from "@/components/design/quantity-stepper-demo";

export const metadata = {
  title: "Design System",
  description:
    "Aura Living design system — all colors, typography, components, animations, and utilities.",
};

export default function DesignSystemPage() {
  return (
    <main className="bg-background min-h-screen">
      <ScrollProgress />

      {/* ===============================================================
       * 1. Hero
       * ============================================================= */}
      <Section spacing="xl" tone="default">
        <Container>
          <div className="flex flex-col gap-6">
            <RevealOnScroll variant="fade">
              <Eyebrow tone="gold">Design System Reference</Eyebrow>
            </RevealOnScroll>
            <SplitHeading
              text={"Aura Living\nDesign System"}
              className="text-display-xl font-medium text-[var(--ink)]"
              stagger={0.1}
              delay={0.2}
            />
            <RevealOnScroll variant="fade-up" delay={0.6} amount={0.4}>
              <p className="text-body-lg max-w-[60ch] text-[var(--stone)]">
                A comprehensive reference of all colors, typography, components,
                animations, and utility classes. Use this as the source of truth
                when building new pages.
              </p>
            </RevealOnScroll>
            <RevealOnScroll variant="fade" delay={0.8} amount={0.5}>
              <DecorativeDivider variant="ornament" className="mt-8" />
            </RevealOnScroll>
          </div>
        </Container>
      </Section>

      {/* ===============================================================
       * 2. Color Palette
       * ============================================================= */}
      <Section spacing="md" tone="surface">
        <DesignSectionHeader
          eyebrow="Foundation"
          title="Color Palette"
          description="Brand colors defined as CSS variables in globals.css, mapped to Tailwind v4 @theme."
        />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {COLORS.map((c) => (
            <div key={c.name} className="flex flex-col gap-2">
              <div
                className={`flex aspect-square items-end p-3 ${c.bg}`}
                aria-hidden
              >
                <span className="text-label-caps opacity-70">{c.hex}</span>
              </div>
              <span className="text-body-sm font-medium">{c.name}</span>
              <span className="text-body-sm text-[var(--muted)]">
                {c.token}
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* ===============================================================
       * 3. Typography Scale
       * ============================================================= */}
      <Section spacing="md" tone="default">
        <DesignSectionHeader
          eyebrow="Foundation"
          title="Typography Scale"
          description="Playfair Display for headings, Inter for body. Fluid via clamp()."
        />
        <div className="flex flex-col gap-8 border-t border-[var(--line)] pt-8">
          {TYPOGRAPHY.map((t) => (
            <div key={t.name} className="flex flex-col gap-2">
              <Eyebrow>
                {t.name} ({t.spec})
              </Eyebrow>
              <t.Component className={t.className}>{t.sample}</t.Component>
            </div>
          ))}
        </div>
      </Section>

      {/* ===============================================================
       * 4. Buttons
       * ============================================================= */}
      <Section spacing="md" tone="surface">
        <DesignSectionHeader
          eyebrow="Components"
          title="Buttons"
          description="All button variants + sizes. Pure CSS hover effects (no magnetic)."
        />
        <div className="grid gap-12 md:grid-cols-2">
          <div className="flex flex-col gap-4">
            <Eyebrow>Variants</Eyebrow>
            <Button variant="primary">
              Primary CTA
              <ArrowRight className="arrow h-4 w-4" strokeWidth={1.5} />
            </Button>
            <Button variant="gold">
              Add to Cart
              <ArrowRight className="arrow h-4 w-4" strokeWidth={1.5} />
            </Button>
            <Button variant="outline-luxury">
              Outline Luxury
              <ArrowUpRight className="arrow h-4 w-4" strokeWidth={1.5} />
            </Button>
            <Button variant="underline">Ghost Underline Link</Button>
            <Button variant="link-arrow">
              Read More
              <ArrowRight className="arrow h-4 w-4" strokeWidth={1.5} />
            </Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button variant="primary" disabled>
              Disabled
            </Button>
          </div>
          <div className="flex flex-col gap-4">
            <Eyebrow>Sizes</Eyebrow>
            <Button variant="primary" size="sm">
              Small
            </Button>
            <Button variant="primary" size="default">
              Default
            </Button>
            <Button variant="primary" size="lg">
              Large
            </Button>
            <Button variant="primary" size="xl">
              Extra Large
            </Button>
            <Eyebrow>Icon Buttons</Eyebrow>
            <div className="flex gap-3">
              <Button variant="outline" size="icon">
                <Heart className="h-4 w-4" strokeWidth={1.25} />
              </Button>
              <Button variant="outline" size="icon-sm">
                <Plus className="h-3 w-3" strokeWidth={1.5} />
              </Button>
              <Button variant="outline" size="icon-lg">
                <ShoppingBag className="h-5 w-5" strokeWidth={1} />
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* ===============================================================
       * 5. Inputs
       * ============================================================= */}
      <Section spacing="md" tone="default">
        <DesignSectionHeader
          eyebrow="Components"
          title="Inputs"
          description="UnderlineInput with floating Label-Caps label + gold focus underline."
        />
        <div className="grid gap-12 md:grid-cols-2">
          <div className="flex flex-col gap-8">
            <UnderlineInput
              label="Email Address"
              type="email"
              placeholder="you@example.com"
            />
            <UnderlineInput
              label="Search"
              type="text"
              placeholder="Search the collection..."
            />
            <UnderlineInput
              label="With Hint"
              type="text"
              placeholder="Enter value..."
              hint="This is helper text below the input."
            />
          </div>
          <div className="flex flex-col gap-8">
            <UnderlineInput
              label="With Error"
              type="text"
              placeholder="Enter value..."
              error="This field is required."
            />
            <UnderlineInput
              label="Password"
              type="password"
              placeholder="••••••••"
            />
            <UnderlineInput label="Number" type="number" placeholder="0" />
          </div>
        </div>
      </Section>

      {/* ===============================================================
       * 6. Chips
       * ============================================================= */}
      <Section spacing="md" tone="surface">
        <DesignSectionHeader
          eyebrow="Components"
          title="Material Chips"
          description="Pill-shaped chips for materials, filters, and variants."
        />
        <div className="flex flex-col gap-6">
          <div>
            <Eyebrow>Variants</Eyebrow>
            <div className="mt-4 flex flex-wrap gap-3">
              <MaterialChip label="Default" />
              <MaterialChip label="Selected" selected />
              <MaterialChip label="Gold" variant="gold" />
              <MaterialChip label="Gold Selected" variant="gold" selected />
              <MaterialChip label="Outline" variant="outline" />
              <MaterialChip
                label="Outline Selected"
                variant="outline"
                selected
              />
            </div>
          </div>
          <div>
            <Eyebrow>Real Materials</Eyebrow>
            <div className="mt-4 flex flex-wrap gap-3">
              <MaterialChip label="Velvet" selected />
              <MaterialChip label="Oak" />
              <MaterialChip label="Linen" />
              <MaterialChip label="Brass" variant="gold" />
              <MaterialChip label="Marble" />
              <MaterialChip label="Walnut" />
              <MaterialChip label="Travertine" />
              <MaterialChip label="Teak" />
            </div>
          </div>
        </div>
      </Section>

      {/* ===============================================================
       * 7. Badges
       * ============================================================= */}
      <Section spacing="md" tone="default">
        <DesignSectionHeader
          eyebrow="Components"
          title="Luxury Badges"
          description="Status badges for products, users, and orders."
        />
        <div className="flex flex-col gap-6">
          <div>
            <Eyebrow>Variants</Eyebrow>
            <div className="mt-4 flex flex-wrap gap-3">
              <LuxuryBadge variant="new">New</LuxuryBadge>
              <LuxuryBadge variant="bestseller">Bestseller</LuxuryBadge>
              <LuxuryBadge variant="limited">Limited</LuxuryBadge>
              <LuxuryBadge variant="sale">Sale</LuxuryBadge>
              <LuxuryBadge variant="subtle">Subtle</LuxuryBadge>
            </div>
          </div>
          <div>
            <Eyebrow>Sizes</Eyebrow>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <LuxuryBadge variant="bestseller" size="sm">
                Small
              </LuxuryBadge>
              <LuxuryBadge variant="bestseller" size="md">
                Medium
              </LuxuryBadge>
            </div>
          </div>
          <div>
            <Eyebrow>With Icons</Eyebrow>
            <div className="mt-4 flex flex-wrap gap-3">
              <LuxuryBadge variant="new" size="md">
                <Check className="h-3 w-3" strokeWidth={1.5} />
                Verified
              </LuxuryBadge>
              <LuxuryBadge variant="bestseller" size="md">
                <Sparkles className="h-3 w-3" strokeWidth={1.5} />
                Featured
              </LuxuryBadge>
            </div>
          </div>
        </div>
      </Section>

      {/* ===============================================================
       * 8. Decorative Elements
       * ============================================================= */}
      <Section spacing="md" tone="surface">
        <DesignSectionHeader
          eyebrow="Components"
          title="Decorative Elements"
          description="Animated dividers + lines for editorial transitions."
        />
        <div className="flex flex-col gap-12">
          <div>
            <Eyebrow>DrawLine — self-drawing horizontal line</Eyebrow>
            <div className="mt-6">
              <DrawLine />
            </div>
          </div>
          <div>
            <Eyebrow>DecorativeDivider — 4 variants</Eyebrow>
            <div className="mt-6 flex flex-col gap-8">
              <DecorativeDivider variant="line" />
              <DecorativeDivider variant="diamond" />
              <DecorativeDivider variant="dots" />
              <DecorativeDivider variant="ornament" />
            </div>
          </div>
          <div>
            <Eyebrow>DecorativeDivider — 3 tones</Eyebrow>
            <div className="mt-6 flex flex-col gap-8">
              <DecorativeDivider variant="ornament" tone="light" />
              <div className="bg-[var(--ink)] py-8">
                <DecorativeDivider variant="ornament" tone="dark" />
              </div>
              <DecorativeDivider variant="ornament" tone="gold" />
            </div>
          </div>
        </div>
      </Section>

      {/* ===============================================================
       * 9. Motion Components
       * ============================================================= */}
      <Section spacing="md" tone="default">
        <DesignSectionHeader
          eyebrow="Animation"
          title="Motion Components"
          description="Reusable animation wrappers — all respect prefers-reduced-motion."
        />
        <div className="flex flex-col gap-12">
          <div>
            <Eyebrow>RevealOnScroll — 9 variants</Eyebrow>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <RevealOnScroll
                variant="fade"
                className="bg-[var(--cream)] p-6 text-center"
              >
                <span className="text-body-sm font-medium">fade</span>
              </RevealOnScroll>
              <RevealOnScroll
                variant="fade-up"
                className="bg-[var(--cream)] p-6 text-center"
              >
                <span className="text-body-sm font-medium">fade-up</span>
              </RevealOnScroll>
              <RevealOnScroll
                variant="fade-down"
                className="bg-[var(--cream)] p-6 text-center"
              >
                <span className="text-body-sm font-medium">fade-down</span>
              </RevealOnScroll>
              <RevealOnScroll
                variant="fade-left"
                className="bg-[var(--cream)] p-6 text-center"
              >
                <span className="text-body-sm font-medium">fade-left</span>
              </RevealOnScroll>
              <RevealOnScroll
                variant="fade-right"
                className="bg-[var(--cream)] p-6 text-center"
              >
                <span className="text-body-sm font-medium">fade-right</span>
              </RevealOnScroll>
              <RevealOnScroll
                variant="scale"
                className="bg-[var(--cream)] p-6 text-center"
              >
                <span className="text-body-sm font-medium">scale</span>
              </RevealOnScroll>
              <RevealOnScroll
                variant="blur"
                className="bg-[var(--cream)] p-6 text-center"
              >
                <span className="text-body-sm font-medium">blur</span>
              </RevealOnScroll>
              <RevealOnScroll
                variant="blur-up"
                className="bg-[var(--cream)] p-6 text-center"
              >
                <span className="text-body-sm font-medium">blur-up</span>
              </RevealOnScroll>
              <RevealOnScroll
                variant="blur-scale"
                className="bg-[var(--cream)] p-6 text-center"
              >
                <span className="text-body-sm font-medium">blur-scale</span>
              </RevealOnScroll>
            </div>
          </div>

          <div>
            <Eyebrow>WordReveal — word-by-word stagger</Eyebrow>
            <p className="text-headline-md mt-6 font-medium text-[var(--ink)]">
              <WordReveal
                text="Every word animates in sequence for cinematic luxury."
                immediate={false}
                stagger={0.08}
                amount={0.3}
              />
            </p>
          </div>

          <div>
            <Eyebrow>SplitHeading — line-by-line reveal</Eyebrow>
            <div className="mt-6">
              <SplitHeading
                text={"Refined typography\nmeets motion design."}
                className="text-display-md font-medium text-[var(--ink)]"
                immediate={false}
                stagger={0.1}
              />
            </div>
          </div>

          <div>
            <Eyebrow>Counter — animated number count-up</Eyebrow>
            <div className="mt-6 grid grid-cols-2 gap-8 md:grid-cols-4">
              <div className="text-center">
                <Counter
                  value={1247}
                  className="text-display-md font-medium text-[var(--ink)]"
                />
                <p className="label-caps mt-2 text-[var(--muted)]">Products</p>
              </div>
              <div className="text-center">
                <Counter
                  value={98}
                  suffix="%"
                  className="text-display-md font-medium text-[var(--ink)]"
                />
                <p className="label-caps mt-2 text-[var(--muted)]">
                  Satisfaction
                </p>
              </div>
              <div className="text-center">
                <Counter
                  value={25000}
                  prefix="₨"
                  className="text-display-md font-medium text-[var(--ink)]"
                />
                <p className="label-caps mt-2 text-[var(--muted)]">
                  Free Shipping
                </p>
              </div>
              <div className="text-center">
                <Counter
                  value={3.5}
                  decimals={1}
                  prefix="$"
                  suffix="M"
                  className="text-display-md font-medium text-[var(--ink)]"
                />
                <p className="label-caps mt-2 text-[var(--muted)]">Revenue</p>
              </div>
            </div>
          </div>

          <div>
            <Eyebrow>StaggerContainer + StaggerItem</Eyebrow>
            <StaggerContainer
              stagger={0.1}
              amount={0.2}
              className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4"
            >
              {[1, 2, 3, 4].map((i) => (
                <StaggerItem key={i} variant="fade-up">
                  <div className="bg-[var(--cream)] p-8 text-center">
                    <span className="text-headline-md font-medium text-[var(--ink)]">
                      {i}
                    </span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          <div>
            <Eyebrow>Tilt — 3D hover effect</Eyebrow>
            <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-4">
              {[1, 2, 3, 4].map((i) => (
                <Tilt key={i} max={6} scale={1.02}>
                  <div className="hover-lift bg-[var(--cream)] p-8 text-center">
                    <Sparkles
                      className="mx-auto h-6 w-6 text-[var(--gold-deep)]"
                      strokeWidth={1}
                    />
                    <p className="text-body-sm mt-3 font-medium">
                      Tilt Card {i}
                    </p>
                  </div>
                </Tilt>
              ))}
            </div>
          </div>

          <div>
            <Eyebrow>Marquee — infinite scroll</Eyebrow>
            <div className="mt-6 border-y border-[var(--line)] py-6">
              <Marquee speed="medium">
                {["Refined", "Considered", "Material", "Quiet", "Crafted"].map(
                  (w, i) => (
                    <span key={i} className="flex items-center gap-8">
                      <span className="text-headline-sm font-medium italic">
                        {w}
                      </span>
                      <Sparkles
                        className="h-3 w-3 text-[var(--gold)]"
                        strokeWidth={1}
                      />
                    </span>
                  ),
                )}
              </Marquee>
            </div>
          </div>
        </div>
      </Section>

      {/* ===============================================================
       * 10. Luxury Components
       * ============================================================= */}
      <Section spacing="md" tone="surface">
        <DesignSectionHeader
          eyebrow="Showcase"
          title="Luxury Components"
          description="Production-grade composable components for the storefront."
        />

        {/* ProductCard */}
        <div className="mt-12">
          <Eyebrow>ProductCard</Eyebrow>
          <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
            {DEMO_PRODUCTS.map((p) => (
              <ProductCard
                key={p.id}
                name={p.name}
                price={p.price}
                image={p.image}
                alternateImage={p.alternateImage}
                badge={p.badge}
                category={p.category}
              />
            ))}
          </div>
        </div>

        {/* CategoryCard */}
        <div className="mt-16">
          <Eyebrow>CategoryCard</Eyebrow>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {DEMO_CATEGORIES.map((c) => (
              <CategoryCard
                key={c.slug}
                name={c.name}
                count={c.count}
                image={c.image}
                href={`/shop/${c.slug}`}
              />
            ))}
          </div>
        </div>

        {/* TestimonialCard */}
        <div className="mt-16">
          <Eyebrow>TestimonialCard</Eyebrow>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <TestimonialCard
              quote="Beautiful craftsmanship and the white-glove delivery was exceptional."
              author="Ayesha Khan"
              role="Interior Designer, Lahore"
              rating={5}
            />
            <TestimonialCard
              quote="The walnut console feels like an heirloom in the making."
              author="Bilal Ahmed"
              role="Architect, Islamabad"
              rating={5}
            />
            <TestimonialCard
              quote="Finally, a Pakistani brand that understands quiet luxury."
              author="Mariam Hassan"
              role="Homeowner, Karachi"
              rating={5}
            />
          </div>
        </div>

        {/* JournalCard */}
        <div className="mt-16">
          <Eyebrow>JournalCard</Eyebrow>
          <div className="mt-6 grid gap-8 md:grid-cols-3">
            <JournalCard
              title="The Art of Slow Living"
              excerpt="How to cultivate calm in your home through considered design..."
              category="Atelier Journal"
              date="March 2026"
              readingTime="6 min read"
              image="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80"
              href="#"
            />
            <JournalCard
              title="Meet the Artisans"
              excerpt="Inside the Lahore workshop where third-generation craftspeople..."
              category="Meet the Maker"
              date="February 2026"
              readingTime="8 min read"
              image="https://images.unsplash.com/photo-1567016432779-094069958ea5?w=800&q=80"
              href="#"
            />
            <JournalCard
              title="Material Guide"
              excerpt="Understanding velvet, linen, and brass — and how to care for them..."
              category="Material Guide"
              date="January 2026"
              readingTime="5 min read"
              image="https://images.unsplash.com/photo-1600369671236-e74521d4b6ad?w=800&q=80"
              href="#"
            />
          </div>
        </div>
      </Section>

      {/* ===============================================================
       * 11. FAQ Accordion
       * ============================================================= */}
      <Section spacing="md" tone="default">
        <Container size="narrow">
          <DesignSectionHeader
            eyebrow="Components"
            title="FAQ Accordion"
            description="Luxury accordion with rotating plus/minus indicator."
          />
          <div className="mt-12">
            <FAQAccordion
              items={[
                {
                  q: "What is your delivery timeline?",
                  a: "Standard delivery across Pakistan takes 3-5 business days.",
                },
                {
                  q: "Do you offer returns?",
                  a: "Yes. We accept returns within 30 days of delivery.",
                },
                {
                  q: "Do you offer trade pricing?",
                  a: "Yes — our Trade Program offers 15-25% off retail.",
                },
                {
                  q: "Can I customize a piece?",
                  a: "Many pieces can be customized in dimension, finish, or upholstery.",
                },
              ]}
            />
          </div>
        </Container>
      </Section>

      {/* ===============================================================
       * 12. Cart + Quantity
       * ============================================================= */}
      <Section spacing="md" tone="surface">
        <DesignSectionHeader
          eyebrow="Components"
          title="Cart + Quantity"
          description="Cart badge with bounce + animated quantity stepper."
        />
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <Eyebrow>CartBadge — animated count</Eyebrow>
            <div className="mt-6 flex items-center gap-8">
              <div className="relative">
                <ShoppingBag
                  className="h-8 w-8 text-[var(--ink)]"
                  strokeWidth={1}
                />
                <CartBadge count={3} />
              </div>
              <div className="relative">
                <ShoppingBag
                  className="h-8 w-8 text-[var(--ink)]"
                  strokeWidth={1}
                />
                <CartBadge count={12} />
              </div>
              <div className="relative">
                <ShoppingBag
                  className="h-8 w-8 text-[var(--ink)]"
                  strokeWidth={1}
                />
                <CartBadge count={0} />
              </div>
            </div>
          </div>
          <div>
            <Eyebrow>QuantityStepper — animated number</Eyebrow>
            <div className="mt-6 flex flex-col gap-6">
              <QuantityStepperDemo label="Small" size="sm" initial={1} />
              <QuantityStepperDemo label="Medium" size="md" initial={3} />
              <QuantityStepperDemo label="Large" size="lg" initial={5} />
            </div>
          </div>
        </div>
      </Section>

      {/* ===============================================================
       * 13. Status Indicators
       * ============================================================= */}
      <Section spacing="md" tone="default">
        <DesignSectionHeader
          eyebrow="Components"
          title="Status Indicators"
          description="Success checkmark + multi-step progress for checkout."
        />
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <Eyebrow>SuccessCheckmark — animated SVG</Eyebrow>
            <div className="mt-6 flex items-center gap-8 bg-[var(--cream)] p-8">
              <SuccessCheckmark size={64} />
              <div>
                <p className="text-headline-sm font-medium text-[var(--ink)]">
                  Order Confirmed
                </p>
                <p className="text-body-sm text-[var(--stone)]">
                  Thank you for your purchase.
                </p>
              </div>
            </div>
          </div>
          <div>
            <Eyebrow>StepProgress — checkout flow</Eyebrow>
            <div className="mt-6">
              <StepProgress
                steps={["Information", "Shipping", "Payment", "Review"]}
                currentStep={2}
              />
            </div>
          </div>
        </div>
      </Section>

      {/* ===============================================================
       * 14. Utility Classes
       * ============================================================= */}
      <Section spacing="md" tone="surface">
        <DesignSectionHeader
          eyebrow="Utilities"
          title="Hover + Glass Utilities"
          description="Reusable global classes — apply to any element via className."
        />
        <div className="grid gap-8 md:grid-cols-3">
          <UtilityCard
            name="hover-lift"
            description="translateY(-4px) + soft shadow"
          >
            <div className="hover-lift border border-[var(--line)] bg-white p-8 text-center">
              <span className="text-body-sm font-medium">Hover me</span>
            </div>
          </UtilityCard>
          <UtilityCard
            name="hover-lift-strong"
            description="translateY(-8px) + deeper shadow"
          >
            <div className="hover-lift-strong border border-[var(--line)] bg-white p-8 text-center">
              <span className="text-body-sm font-medium">Hover me</span>
            </div>
          </UtilityCard>
          <UtilityCard name="hover-zoom" description="scale(1.04) on hover">
            <div className="hover-zoom flex aspect-square items-center justify-center bg-[var(--cream)]">
              <span className="text-body-sm font-medium">Hover me</span>
            </div>
          </UtilityCard>
          <UtilityCard
            name="hover-zoom-strong"
            description="scale(1.08) on hover"
          >
            <div className="hover-zoom-strong flex aspect-square items-center justify-center bg-[var(--cream)]">
              <span className="text-body-sm font-medium">Hover me</span>
            </div>
          </UtilityCard>
          <UtilityCard
            name="hover-glow"
            description="Gold glow shadow on hover"
          >
            <div className="hover-glow border border-[var(--line)] bg-white p-8 text-center">
              <span className="text-body-sm font-medium">Hover me</span>
            </div>
          </UtilityCard>
          <UtilityCard
            name="hover-gold"
            description="Text shifts to gold on hover"
          >
            <div className="hover-gold border border-[var(--line)] bg-white p-8 text-center">
              <span className="text-body-sm font-medium">Hover me</span>
            </div>
          </UtilityCard>
          <UtilityCard
            name="glass-panel"
            description="Frosted glass effect (backdrop-blur)"
          >
            <div className="glass-panel p-8 text-center">
              <span className="text-body-sm font-medium">Frosted glass</span>
            </div>
          </UtilityCard>
          <UtilityCard name="soft-shadow" description="Ambient soft shadow">
            <div className="soft-shadow bg-white p-8 text-center">
              <span className="text-body-sm font-medium">Soft shadow</span>
            </div>
          </UtilityCard>
          <UtilityCard name="floating" description="Infinite float animation">
            <div className="floating flex aspect-square items-center justify-center bg-[var(--gold)]">
              <Sparkles className="h-6 w-6 text-[var(--ink)]" strokeWidth={1} />
            </div>
          </UtilityCard>
        </div>
      </Section>

      {/* ===============================================================
       * 15. Gradients
       * ============================================================= */}
      <Section spacing="md" tone="default">
        <DesignSectionHeader
          eyebrow="Utilities"
          title="Gradients"
          description="Luxury gradient backgrounds."
        />
        <div className="grid gap-4 md:grid-cols-3">
          <GradientCard name="gradient-gold" className="gradient-gold" />
          <GradientCard
            name="gradient-ink"
            className="gradient-ink text-white"
          />
          <GradientCard name="gradient-cream" className="gradient-cream" />
          <GradientCard
            name="gradient-overlay-dark"
            className="bg-[var(--ink)]"
            overlay="gradient-overlay-dark"
          />
          <GradientCard name="text-gradient-gold" textGradient />
          <GradientCard name="text-outline" textOutline />
        </div>
      </Section>

      {/* ===============================================================
       * 16. Shadows
       * ============================================================= */}
      <Section spacing="md" tone="surface">
        <DesignSectionHeader
          eyebrow="Utilities"
          title="Shadows"
          description="Depth via transparency, never heavy borders."
        />
        <div className="grid gap-8 md:grid-cols-4">
          <ShadowCard name="soft-shadow" className="soft-shadow" />
          <ShadowCard name="layered-shadow" className="layered-shadow" />
          <ShadowCard name="luxury-shadow" className="luxury-shadow" />
          <ShadowCard name="gold-shadow" className="gold-shadow" />
        </div>
      </Section>

      {/* ===============================================================
       * 17. Service Highlights
       * ============================================================= */}
      <Section spacing="md" tone="default">
        <DesignSectionHeader
          eyebrow="Patterns"
          title="Service Highlights"
          description="Common pattern — icon + label for trust indicators."
        />
        <div className="mt-8 grid gap-6 md:grid-cols-4">
          {[
            { icon: Truck, label: "White Glove Delivery" },
            { icon: Shield, label: "Lifetime Guarantee" },
            { icon: Hammer, label: "Hand-Crafted" },
            { icon: Leaf, label: "Sustainable" },
          ].map((s) => (
            <div
              key={s.label}
              className="hover-lift flex flex-col items-center gap-3 border border-[var(--line)] p-8"
            >
              <s.icon
                className="h-6 w-6 text-[var(--gold-deep)]"
                strokeWidth={1}
              />
              <span className="text-body-sm text-center text-[var(--stone)]">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* ===============================================================
       * Footer
       * ============================================================= */}
      <Section spacing="md" tone="ink" className="grain-overlay">
        <Container size="narrow" className="text-center">
          <Eyebrow tone="gold">End of Design System</Eyebrow>
          <LuxuryHeading
            variant="display-md"
            as="h2"
            balance
            className="mt-4 text-white"
          >
            Build something beautiful
          </LuxuryHeading>
          <p className="text-body-lg mx-auto mt-4 max-w-[48ch] text-white/70">
            Every component, animation, and utility class is documented above.
            Use this page as your reference when building new pages.
          </p>
          <div className="mt-8">
            <Button variant="gold" size="lg" asChild>
              <a href="/">
                Back to Home
                <ArrowRight className="arrow h-4 w-4" strokeWidth={1.5} />
              </a>
            </Button>
          </div>
        </Container>
      </Section>
    </main>
  );
}

// ---------- Helper Components ----------

function DesignSectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-12 flex flex-col gap-3">
      <BlurReveal variant="blur-fade" amount={0.5}>
        <Eyebrow tone="gold">{eyebrow}</Eyebrow>
      </BlurReveal>
      <BlurReveal variant="blur-up" delay={0.1} amount={0.3}>
        <LuxuryHeading variant="display-md" as="h2" balance>
          {title}
        </LuxuryHeading>
      </BlurReveal>
      <BlurReveal variant="blur-up" delay={0.2} amount={0.3}>
        <p className="text-body-lg max-w-[60ch] text-[var(--stone)]">
          {description}
        </p>
      </BlurReveal>
    </div>
  );
}

function UtilityCard({
  name,
  description,
  children,
}: {
  name: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4">
      <Eyebrow>{name}</Eyebrow>
      <p className="text-body-sm text-[var(--muted)]">{description}</p>
      {children}
    </div>
  );
}

function GradientCard({
  name,
  className,
  overlay,
  textGradient,
  textOutline,
}: {
  name: string;
  className?: string;
  overlay?: string;
  textGradient?: boolean;
  textOutline?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Eyebrow>{name}</Eyebrow>
      <div
        className={`relative aspect-[4/3] overflow-hidden ${className ?? ""}`}
      >
        {overlay && <div className={`absolute inset-0 ${overlay}`} />}
        {textGradient && (
          <div className="flex h-full items-center justify-center">
            <span className="text-gradient-gold text-display-md font-medium">
              Aura
            </span>
          </div>
        )}
        {textOutline && (
          <div className="flex h-full items-center justify-center">
            <span className="text-outline text-display-md font-medium">
              Aura
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function ShadowCard({ name, className }: { name: string; className: string }) {
  return (
    <div className="flex flex-col gap-3">
      <Eyebrow>{name}</Eyebrow>
      <div className={`${className} bg-white p-8 text-center`}>
        <span className="text-body-sm font-medium">{name}</span>
      </div>
    </div>
  );
}

// ---------- Data ----------

const COLORS = [
  {
    name: "Background",
    token: "--background",
    hex: "#FFFFFF",
    bg: "bg-white border border-[var(--line)]",
  },
  {
    name: "Surface / Cream",
    token: "--cream",
    hex: "#FAF8F4",
    bg: "bg-[var(--cream)]",
  },
  {
    name: "Cream Warm",
    token: "--cream-warm",
    hex: "#FDFBF7",
    bg: "bg-[var(--cream-warm)]",
  },
  {
    name: "Foreground / Ink",
    token: "--ink",
    hex: "#121212",
    bg: "bg-[var(--ink)] text-white",
  },
  {
    name: "Gold",
    token: "--gold",
    hex: "#D4AF37",
    bg: "bg-[var(--gold)] text-[var(--ink)]",
  },
  {
    name: "Gold Soft",
    token: "--gold-soft",
    hex: "#E8C971",
    bg: "bg-[var(--gold-soft)] text-[var(--ink)]",
  },
  {
    name: "Gold Deep",
    token: "--gold-deep",
    hex: "#B8962E",
    bg: "bg-[var(--gold-deep)] text-white",
  },
  {
    name: "Muted",
    token: "--muted",
    hex: "#8E8E8E",
    bg: "bg-[var(--muted)] text-white",
  },
  {
    name: "Stone",
    token: "--stone",
    hex: "#6B6B6B",
    bg: "bg-[var(--stone)] text-white",
  },
  { name: "Line", token: "--line", hex: "#EBE9E4", bg: "bg-[var(--line)]" },
  {
    name: "Destructive",
    token: "--destructive",
    hex: "#BA1A1A",
    bg: "bg-[var(--destructive)] text-white",
  },
  {
    name: "Outline",
    token: "--outline",
    hex: "#C4C7C7",
    bg: "bg-[var(--outline)]",
  },
];

const TYPOGRAPHY = [
  {
    name: "Display XL",
    spec: "44→72px",
    sample: "Refined Living",
    Component: LuxuryHeading,
    className: "text-display-xl font-medium",
  },
  {
    name: "Display LG",
    spec: "40→64px",
    sample: "Considered Design",
    Component: LuxuryHeading,
    className: "text-display-lg font-medium",
  },
  {
    name: "Display MD",
    spec: "32→44px",
    sample: "Quiet Luxury",
    Component: LuxuryHeading,
    className: "text-display-md font-medium",
  },
  {
    name: "Headline LG",
    spec: "28→36px",
    sample: "Material Integrity",
    Component: LuxuryHeading,
    className: "text-headline-lg font-medium",
  },
  {
    name: "Headline MD",
    spec: "24→32px",
    sample: "Crafted for the Home",
    Component: LuxuryHeading,
    className: "text-headline-md font-medium",
  },
  {
    name: "Headline SM",
    spec: "20→24px",
    sample: "Editorial Heading",
    Component: LuxuryHeading,
    className: "text-headline-sm font-medium",
  },
  {
    name: "Body LG",
    spec: "18px",
    sample:
      "Each piece is selected for its craftsmanship, material integrity, and quiet presence.",
    Component: "p" as const,
    className: "text-body-lg",
  },
  {
    name: "Body MD",
    spec: "16px",
    sample:
      "A curated collection of refined home decor for discerning homeowners.",
    Component: "p" as const,
    className: "text-body-md",
  },
  {
    name: "Body SM",
    spec: "14px",
    sample: "Free white-glove delivery on orders over ₨25,000.",
    Component: "p" as const,
    className: "text-body-sm",
  },
  {
    name: "Label Caps",
    spec: "12px tracked",
    sample: "AUTUMN COLLECTION 2026",
    Component: "p" as const,
    className: "label-caps",
  },
];

const DEMO_PRODUCTS = [
  {
    id: "1",
    name: "Lumen Pendant",
    price: 45000,
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80",
    alternateImage:
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600&q=80",
    category: "Lighting",
    badge: "New" as const,
  },
  {
    id: "2",
    name: "Velvet Lounge Chair",
    price: 125000,
    image:
      "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=600&q=80",
    alternateImage:
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&q=80",
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
    name: "Marble Vase",
    price: 18500,
    image:
      "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=600&q=80",
    category: "Decor",
    badge: "Limited" as const,
  },
];

const DEMO_CATEGORIES = [
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
    slug: "decor",
    name: "Decor",
    count: 78,
    image:
      "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=600&q=80",
  },
];
