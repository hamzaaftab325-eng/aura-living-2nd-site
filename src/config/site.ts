/**
 * Site-wide configuration — metadata, URLs, runtime flags.
 */

import { brand } from "./brand";

export const siteConfig = {
  name: brand.name,
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  description: brand.description,
  ogImage: "/og.png",
  locale: "en_PK",
  themeColor: "#FFFFFF",
  keywords: [
    "luxury home decor Pakistan",
    "premium furniture Lahore",
    "interior design Pakistan",
    "curated decor",
    "artisan lighting",
    "velvet upholstery",
    "oak furniture",
    "designer homeware Pakistan",
    "Aura Living",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
} as const;

export type SiteConfig = typeof siteConfig;
