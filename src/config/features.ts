/**
 * Feature flags — gate functionality without code removal.
 * All flags resolve at build time via `process.env.NEXT_PUBLIC_FEATURE_*`.
 * Default values ensure safe fallback when env is missing.
 */

export const features = {
  // Storefront
  wishlist: true,
  recentlyViewed: true,
  productComparisons: false,
  liveInventory: true,
  preorder: false,

  // Account
  multiAddress: true,
  savedPaymentMethods: false, // depends on payment provider
  orderHistory: true,
  abandonedCartEmails: true,

  // Search & Discovery
  fullTextSearch: true,
  facetedFilters: true,
  smartRecommendations: false, // AI-driven, toggle when ready

  // Marketing
  newsletter: true,
  referralProgram: false,
  loyaltyProgram: false,

  // International
  multiCurrency: false,
  multiLanguage: false,

  // AI features (in-house via z-ai-web-dev-sdk)
  aiProductAssistant: false,
  aiStyleQuiz: false,
  aiRoomVisualizer: false,
} as const;

export type Features = typeof features;
