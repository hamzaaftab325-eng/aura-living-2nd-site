/**
 * Navigation configuration — header menu, footer links, mobile menu.
 * Driven from config so non-engineers can update menu structure without touching components.
 */

import type { LucideIcon } from "lucide-react";
import {
  Lightbulb,
  Armchair,
  Table,
  Archive,
  Shirt,
  Sparkles,
  SquareDot,
  Sun,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  description?: string;
  icon?: LucideIcon;
  children?: NavItem[];
  featured?: {
    title: string;
    href: string;
    image: string;
  }[];
}

export const headerNav: NavItem[] = [
  {
    label: "Shop",
    href: "/shop",
    children: [
      {
        label: "Collections",
        href: "/shop",
        description: "Browse all categories",
        children: [
          { label: "Lighting", href: "/shop/lighting", icon: Lightbulb },
          { label: "Seating", href: "/shop/seating", icon: Armchair },
          { label: "Tables", href: "/shop/tables", icon: Table },
          { label: "Storage", href: "/shop/storage", icon: Archive },
          { label: "Textiles", href: "/shop/textiles", icon: Shirt },
          { label: "Decor", href: "/shop/decor", icon: Sparkles },
          { label: "Mirrors", href: "/shop/mirrors", icon: SquareDot },
          { label: "Outdoor", href: "/shop/outdoor", icon: Sun },
        ],
      },
      {
        label: "Featured",
        href: "/shop/featured",
        description: "Curated selections",
        children: [
          { label: "New Arrivals", href: "/shop?filter=new" },
          { label: "Bestsellers", href: "/shop?filter=bestseller" },
          { label: "Limited Edition", href: "/shop?filter=limited" },
          { label: "Sale", href: "/shop?filter=sale" },
        ],
      },
    ],
  },
  {
    label: "Atelier",
    href: "/atelier",
    children: [
      { label: "Our Story", href: "/atelier/story" },
      { label: "Craftsmanship", href: "/atelier/craft" },
      { label: "Materials", href: "/atelier/materials" },
      { label: "Artisans", href: "/atelier/artisans" },
    ],
  },
  {
    label: "Journal",
    href: "/journal",
  },
  {
    label: "Trade",
    href: "/trade",
    description: "For interior designers",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export const footerNav: FooterColumn[] = [
  {
    title: "Shop",
    links: [
      { label: "All Collections", href: "/shop" },
      { label: "New Arrivals", href: "/shop?filter=new" },
      { label: "Bestsellers", href: "/shop?filter=bestseller" },
      { label: "Sale", href: "/shop?filter=sale" },
      { label: "Gift Cards", href: "/gift-cards" },
    ],
  },
  {
    title: "Atelier",
    links: [
      { label: "Our Story", href: "/atelier/story" },
      { label: "Craftsmanship", href: "/atelier/craft" },
      { label: "Materials", href: "/atelier/materials" },
      { label: "Sustainability", href: "/atelier/sustainability" },
      { label: "Journal", href: "/journal" },
    ],
  },
  {
    title: "Client Care",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Shipping & Delivery", href: "/shipping" },
      { label: "Returns", href: "/returns" },
      { label: "Care Guide", href: "/care-guide" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Trade & Services",
    links: [
      { label: "Trade Program", href: "/trade" },
      { label: "Interior Design", href: "/services/design" },
      { label: "Custom Orders", href: "/services/custom" },
      { label: "White Glove Delivery", href: "/services/white-glove" },
    ],
  },
];

export interface LegalLink extends FooterLink {
  label: string;
  href: string;
}

export const legalNav: LegalLink[] = [
  { label: "Privacy Policy", href: "/legal/privacy" },
  { label: "Terms of Service", href: "/legal/terms" },
  { label: "Cookie Policy", href: "/legal/cookies" },
  { label: "Accessibility", href: "/legal/accessibility" },
];
