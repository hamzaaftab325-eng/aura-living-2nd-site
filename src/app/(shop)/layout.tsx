/**
 * Shop Layout — wraps ALL public storefront pages with:
 *   • GlassmorphicHeader (sticky, blur-on-scroll, mega menu, cart badge, sound toggle)
 *   • main content
 *   • ParallaxFooter (staggered links, social, legal)
 *
 * This layout applies to: /, /shop, /shop/[category], /product/[slug]
 * Auth/Account/Admin pages have their own layouts (no shop header).
 */

import type { ReactNode } from "react";
import { GlassmorphicHeader, ParallaxFooter } from "@/components/ui";
import { Button, MegaMenu, CartBadge, SoundToggle } from "@/components/ui";
import { brand } from "@/config/brand";
import Link from "next/link";
import { Search, ShoppingBag, User } from "lucide-react";

export default function ShopLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <GlassmorphicHeader>
        <Link href="/" className="flex items-baseline gap-2">
          <span className="text-headline-sm font-medium tracking-tight text-[var(--ink)]">
            {brand.name}
          </span>
          <span className="label-caps hidden text-[var(--gold-deep)] sm:inline">
            Est. 2026
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <MegaMenu
            trigger={
              <Button variant="underline" asChild>
                <span>Shop</span>
              </Button>
            }
            sections={[
              {
                title: "Collections",
                links: [
                  { label: "Lighting", href: "/shop/lighting" },
                  { label: "Seating", href: "/shop/seating" },
                  { label: "Tables", href: "/shop/tables" },
                  { label: "Storage", href: "/shop/storage" },
                ],
              },
              {
                title: "Soft Goods",
                links: [
                  { label: "Textiles", href: "/shop/textiles" },
                  { label: "Decor", href: "/shop/decor" },
                  { label: "Mirrors", href: "/shop/mirrors" },
                  { label: "Outdoor", href: "/shop/outdoor" },
                ],
              },
            ]}
            featured={{
              title: "The Autumn Edit",
              subtitle: "New Collection",
              href: "/shop",
              image:
                "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&q=80",
            }}
          />
          <Button variant="underline" asChild>
            <Link href="/shop">All Products</Link>
          </Button>
          <Button variant="underline" asChild>
            <Link href="/#atelier">Atelier</Link>
          </Button>
          <Button variant="underline" asChild>
            <Link href="/#journal">Journal</Link>
          </Button>
        </nav>

        <div className="flex items-center gap-4 text-[var(--ink)]">
          <Link
            href="/shop"
            aria-label="Search"
            className="transition-colors duration-300 hover:text-[var(--gold-deep)]"
          >
            <Search className="h-5 w-5" strokeWidth={1} />
          </Link>
          <Link
            href="/account"
            aria-label="Account"
            className="transition-colors duration-300 hover:text-[var(--gold-deep)]"
          >
            <User className="h-5 w-5" strokeWidth={1} />
          </Link>
          <SoundToggle />
          <Link
            href="/account"
            aria-label="Cart"
            className="relative transition-colors duration-300 hover:text-[var(--gold-deep)]"
          >
            <ShoppingBag className="h-5 w-5" strokeWidth={1} />
            <CartBadge count={0} />
          </Link>
        </div>
      </GlassmorphicHeader>

      <main className="min-h-screen">{children}</main>

      <ParallaxFooter
        columns={[
          {
            title: "Shop",
            links: [
              { label: "All Collections", href: "/shop" },
              { label: "Lighting", href: "/shop/lighting" },
              { label: "Seating", href: "/shop/seating" },
              { label: "Tables", href: "/shop/tables" },
            ],
          },
          {
            title: "Atelier",
            links: [
              { label: "Our Story", href: "/#atelier" },
              { label: "Craftsmanship", href: "/#atelier" },
              { label: "Materials", href: "/#atelier" },
            ],
          },
          {
            title: "Client Care",
            links: [
              { label: "Contact Us", href: "/#faq" },
              { label: "Shipping & Delivery", href: "/#faq" },
              { label: "Returns", href: "/#faq" },
              { label: "Trade Program", href: "/#trade" },
            ],
          },
        ]}
      />
    </>
  );
}
