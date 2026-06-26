/**
 * UI components barrel export.
 *
 * Re-exports luxury-customized shadcn primitives + Aura Living composites.
 * Use this for app-level imports:
 *   import { Button, ProductCard, MaterialChip } from "@/components/ui";
 *
 * For shadcn primitives not yet customized, import directly from
 * their file: `import { Calendar } from "@/components/ui/calendar"`.
 */

// --- Customized shadcn primitives ---
export { Button, buttonVariants } from "./button";

// --- Aura Living luxury composites ---
export { UnderlineInput } from "./underline-input";
export { MaterialChip } from "./material-chip";
export { ProductCard } from "./product-card";
export { GlassmorphicHeader } from "./glassmorphic-header";
export { LuxuryBadge } from "./luxury-badge";
export { CategoryCard } from "./category-card";
export { TestimonialCard } from "./testimonial-card";
export { JournalCard } from "./journal-card";
export { FAQAccordion } from "./faq-accordion";
export { NewsletterSignup } from "./newsletter-signup";
export { InstagramGrid } from "./instagram-grid";
export { MegaMenu } from "./mega-menu";
export { CartBadge } from "./cart-badge";
export { QuantityStepper } from "./quantity-stepper";
export { ParallaxFooter } from "./parallax-footer";
export { SoundToggle } from "./sound-toggle";

// --- Skeletons ---
export {
  SkeletonLine,
  SkeletonText,
  SkeletonImage,
  SkeletonCard,
  SkeletonGrid,
} from "./skeleton-luxury";

// --- Types ---
export type { UnderlineInputProps } from "./underline-input";
export type { MaterialChipProps } from "./material-chip";
export type { ProductCardProps } from "./product-card";
export type { GlassmorphicHeaderProps } from "./glassmorphic-header";
export type { LuxuryBadgeProps } from "./luxury-badge";
export type { CategoryCardProps } from "./category-card";
export type { TestimonialCardProps } from "./testimonial-card";
export type { JournalCardProps } from "./journal-card";
export type { FAQAccordionProps, FAQItem } from "./faq-accordion";
export type { InstagramGridProps } from "./instagram-grid";
export type { MegaMenuProps } from "./mega-menu";
export type { CartBadgeProps } from "./cart-badge";
export type { QuantityStepperProps } from "./quantity-stepper";
export type { ParallaxFooterProps } from "./parallax-footer";
