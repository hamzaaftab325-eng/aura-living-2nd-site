/**
 * Brand configuration — single source of truth for all brand identity.
 * Update this file when brand assets change.
 *
 * Brand: Aura Living
 * Audience: Pakistani market (PKR currency, English/Urdu copy ready)
 */

export const brand = {
  name: "Aura Living",
  shortName: "Aura",
  tagline: "Curated calm for considered living.",
  description:
    "A curated collection of refined home decor for discerning homeowners and interior designers across Pakistan. Each piece is selected for its craftsmanship, material integrity, and quiet presence.",
  email: "hello@auraliving.pk",
  phone: "+92 300 0000000",
  whatsapp: "+92 300 0000000",
  address: {
    street: "Plot 12, Gulberg III",
    city: "Lahore",
    province: "Punjab",
    postalCode: "54660",
    country: "Pakistan",
  },
  social: {
    instagram: "https://instagram.com/auraliving.pk",
    pinterest: "https://pinterest.com/auraliving",
    facebook: "https://facebook.com/auraliving.pk",
    youtube: "https://youtube.com/@auraliving",
  },
  currency: {
    code: "PKR",
    symbol: "₨",
    locale: "en-PK",
    // Pakistani convention: symbol prefix, no decimals for PKR.
    position: "prefix",
    decimals: 0,
  },
  shipping: {
    freeShippingThreshold: 25000, // PKR
    defaultCountry: "PK",
    international: false, // Pakistan-only for now; expand later
    // Pakistani courier partners
    carriers: ["TCS", "Leopards", "DHL"],
  },
  tax: {
    // Pakistan standard sales tax rate on retail goods.
    standardRate: 0.17, // 17% — applied at checkout
    includedInPrice: true, // prices shown are tax-inclusive
  },
  contactHours: {
    weekdays: "Mon–Sat: 10:00 AM – 7:00 PM PKT",
    weekend: "Sunday: Closed",
  },
} as const;

export type Brand = typeof brand;
