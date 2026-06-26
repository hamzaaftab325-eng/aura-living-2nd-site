/**
 * Aura Living — Phase 1.2 Design System Preview Page
 *
 * This is a TEMPORARY page to visually verify the luxury design system.
 * Will be replaced by the real storefront in Phase 3.
 *
 * Showcases:
 *   • Color palette (background, surface, foreground, gold, muted, line)
 *   • Typography scale (display-xl → label-caps)
 *   • Spacing rhythm (section-md, stack-xl)
 *   • Buttons (primary, gold-cta, ghost-underline)
 *   • Inputs (underline style)
 *   • Chips (pill-shaped, cream bg)
 *   • Eyebrow + LuxuryHeading composites
 *   • Glassmorphic surface preview
 */

import {
  Container,
  Section,
  Eyebrow,
  LuxuryHeading,
} from "@/components/layout";
import { brand } from "@/config/brand";
import { ArrowRight, Search, ShoppingBag, User } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* ---------------------------------------------------------------
       * Top glassmorphic preview header (real one in Phase 3.1)
       * ------------------------------------------------------------- */}
      <div className="glassmorphic sticky top-0 z-50">
        <Container className="flex h-16 items-center justify-between md:h-20">
          <span className="text-headline-sm font-medium tracking-tight">
            {brand.name}
          </span>
          <nav className="hidden gap-8 md:flex">
            <span className="btn-underline">Shop</span>
            <span className="btn-underline">Atelier</span>
            <span className="btn-underline">Journal</span>
            <span className="btn-underline">Trade</span>
          </nav>
          <div className="flex items-center gap-4 text-[var(--ink)]">
            <Search className="h-5 w-5 cursor-pointer" strokeWidth={1} />
            <User className="h-5 w-5 cursor-pointer" strokeWidth={1} />
            <ShoppingBag className="h-5 w-5 cursor-pointer" strokeWidth={1} />
          </div>
        </Container>
      </div>

      {/* ---------------------------------------------------------------
       * Hero — display-xl + eyebrow
       * ------------------------------------------------------------- */}
      <Section spacing="xl" tone="default" bare>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div className="flex flex-col gap-6">
              <Eyebrow tone="gold">New Collection — Autumn 2026</Eyebrow>
              <LuxuryHeading
                variant="display-xl"
                balance
                as="h1"
                className="max-w-[14ch]"
              >
                Curated calm for considered living.
              </LuxuryHeading>
              <p className="text-body-lg max-w-[52ch] text-[var(--stone)]">
                A refined collection of home decor, selected for craftsmanship,
                material integrity, and quiet presence. Designed in Lahore,
                crafted for the discerning Pakistani home.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <button className="btn-primary">
                  Shop the Collection
                  <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                </button>
                <button className="btn-gold">Add to Cart Preview</button>
              </div>
            </div>

            {/* Editorial image placeholder — replaced by Supabase imagery in Phase 3 */}
            <div className="aspect-editorial relative overflow-hidden bg-[var(--surface)]">
              <div className="absolute inset-0 flex items-center justify-center">
                <Eyebrow>Editorial Image</Eyebrow>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--cream-warm)]/40 to-[var(--gold)]/10" />
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------
       * Color palette preview
       * ------------------------------------------------------------- */}
      <Section spacing="md" tone="surface">
        <Eyebrow>Design System — Color Palette</Eyebrow>
        <LuxuryHeading variant="headline-md" as="h2" className="mt-3 mb-10">
          The Aura Living palette
        </LuxuryHeading>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {[
            {
              name: "Background",
              hex: "#FFFFFF",
              bg: "bg-white border border-[var(--line)]",
            },
            {
              name: "Surface",
              hex: "#FAF8F4",
              bg: "bg-[var(--surface)]",
            },
            {
              name: "Foreground",
              hex: "#121212",
              bg: "bg-[var(--ink)] text-white",
            },
            {
              name: "Gold",
              hex: "#D4AF37",
              bg: "bg-[var(--gold)] text-[var(--ink)]",
            },
            {
              name: "Muted",
              hex: "#8E8E8E",
              bg: "bg-[var(--muted)] text-white",
            },
            {
              name: "Line",
              hex: "#EBE9E4",
              bg: "bg-[var(--line)]",
            },
          ].map((c) => (
            <div key={c.name} className="flex flex-col gap-2">
              <div
                className={`flex aspect-square items-end p-3 ${c.bg}`}
                aria-hidden
              >
                <span className="text-label-caps opacity-70">{c.hex}</span>
              </div>
              <span className="text-body-sm font-medium">{c.name}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* ---------------------------------------------------------------
       * Typography scale preview
       * --------------------------------------------------------------- */}
      <Section spacing="md" tone="default">
        <Eyebrow>Design System — Typography</Eyebrow>
        <LuxuryHeading variant="headline-md" as="h2" className="mt-3 mb-10">
          Playfair Display meets Inter
        </LuxuryHeading>

        <div className="flex flex-col gap-8 border-t border-[var(--line)] pt-8">
          <div className="flex flex-col gap-2">
            <Eyebrow>Display XL (44→72px)</Eyebrow>
            <LuxuryHeading variant="display-xl">Refined living</LuxuryHeading>
          </div>
          <div className="flex flex-col gap-2">
            <Eyebrow>Display LG (40→64px)</Eyebrow>
            <LuxuryHeading variant="display-lg">
              Considered design
            </LuxuryHeading>
          </div>
          <div className="flex flex-col gap-2">
            <Eyebrow>Display MD (32→44px)</Eyebrow>
            <LuxuryHeading variant="display-md">Quiet luxury</LuxuryHeading>
          </div>
          <div className="flex flex-col gap-2">
            <Eyebrow>Headline MD (24→32px)</Eyebrow>
            <LuxuryHeading variant="headline-md">
              Material integrity
            </LuxuryHeading>
          </div>
          <div className="flex flex-col gap-2">
            <Eyebrow>Headline SM (20→24px)</Eyebrow>
            <LuxuryHeading variant="headline-sm">
              Crafted for the home
            </LuxuryHeading>
          </div>
          <div className="flex flex-col gap-2">
            <Eyebrow>Body LG (18px)</Eyebrow>
            <p className="text-body-lg text-[var(--foreground)]">
              Each piece is selected for its craftsmanship, material integrity,
              and quiet presence in the home.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <Eyebrow>Body MD (16px)</Eyebrow>
            <p className="text-body-md text-[var(--foreground)]">
              A curated collection of refined home decor for discerning
              homeowners and interior designers across Pakistan.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <Eyebrow>Body SM (14px)</Eyebrow>
            <p className="text-body-sm text-[var(--muted)]">
              Free white-glove delivery on orders over ₨25,000.
            </p>
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------------
       * Component preview — buttons, inputs, chips
       * --------------------------------------------------------------- */}
      <Section spacing="md" tone="surface">
        <Eyebrow>Design System — Components</Eyebrow>
        <LuxuryHeading variant="headline-md" as="h2" className="mt-3 mb-10">
          Buttons, inputs, chips
        </LuxuryHeading>

        <div className="grid gap-12 md:grid-cols-2">
          {/* Buttons */}
          <div className="flex flex-col gap-4">
            <Eyebrow>Buttons</Eyebrow>
            <button className="btn-primary w-fit">
              Primary CTA
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </button>
            <button className="btn-gold w-fit">Add to Cart</button>
            <button className="btn-underline w-fit">
              Ghost Underline Link
            </button>
            <button className="btn-primary w-fit" disabled>
              Disabled
            </button>
          </div>

          {/* Inputs */}
          <div className="flex flex-col gap-6">
            <Eyebrow>Underline Inputs</Eyebrow>
            <input
              type="text"
              placeholder="Search the collection"
              className="input-underline"
            />
            <input
              type="email"
              placeholder="Email address"
              className="input-underline"
            />
            <input
              type="text"
              defaultValue="Focused state preview"
              className="input-underline"
              aria-label="focused preview"
            />
          </div>

          {/* Chips */}
          <div className="flex flex-col gap-4 md:col-span-2">
            <Eyebrow>Material Chips</Eyebrow>
            <div className="flex flex-wrap gap-3">
              <button className="chip" data-selected="true">
                Velvet
              </button>
              <button className="chip">Oak</button>
              <button className="chip">Linen</button>
              <button className="chip">Brass</button>
              <button className="chip">Marble</button>
              <button className="chip">Walnut</button>
              <button className="chip">Travertine</button>
            </div>
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------------
       * Spacing rhythm preview
       * --------------------------------------------------------------- */}
      <Section spacing="md" tone="default">
        <Eyebrow>Design System — Spacing</Eyebrow>
        <LuxuryHeading variant="headline-md" as="h2" className="mt-3 mb-10">
          Generous whitespace, deliberate rhythm
        </LuxuryHeading>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="border border-[var(--line)] p-8">
            <Eyebrow tone="gold">Section XL</Eyebrow>
            <p className="text-body-md mt-3">120px vertical padding</p>
            <p className="text-body-sm mt-2 text-[var(--muted)]">
              Hero sections, major landings
            </p>
          </div>
          <div className="border border-[var(--line)] p-8">
            <Eyebrow tone="gold">Section MD</Eyebrow>
            <p className="text-body-md mt-3">64px vertical padding</p>
            <p className="text-body-sm mt-2 text-[var(--muted)]">
              Standard content sections
            </p>
          </div>
          <div className="border border-[var(--line)] p-8">
            <Eyebrow tone="gold">Container</Eyebrow>
            <p className="text-body-md mt-3">1440px max-width</p>
            <p className="text-body-sm mt-2 text-[var(--muted)]">
              64px outer margin on desktop
            </p>
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------------
       * Footer preview
       * ------------------------------------------------------------- */}
      <footer className="border-t border-[var(--line)] bg-[var(--ink)] py-16 text-[var(--cream)]">
        <Container className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <LuxuryHeading variant="headline-sm" as="p" italic>
              {brand.name}
            </LuxuryHeading>
            <p className="text-body-sm mt-3 max-w-[40ch] text-white/60">
              {brand.tagline}
            </p>
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
