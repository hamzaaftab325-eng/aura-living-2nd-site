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

// --- Types ---
export type { UnderlineInputProps } from "./underline-input";
export type { MaterialChipProps } from "./material-chip";
export type { ProductCardProps } from "./product-card";
export type { GlassmorphicHeaderProps } from "./glassmorphic-header";
export type { LuxuryBadgeProps } from "./luxury-badge";
