/**
 * LuxuryHeading — Playfair Display heading with refined kerning.
 *
 * Spec (DESIGN.md → Typography):
 *   - Display & Headlines use Playfair Display
 *   - Tight kerning for large display sizes to maintain premium feel
 *
 * Variants map to the fluid type scale defined in globals.css:
 *   - display-xl: 44→72px (hero)
 *   - display-lg: 40→64px (page titles, big statements)
 *   - display-md: 32→44px (section titles)
 *   - headline-lg: 28→36px (subsection)
 *   - headline-md: 24→32px (card group title)
 *   - headline-sm: 20→24px (small heading)
 *
 * Usage:
 *   <LuxuryHeading variant="display-lg">Curated Calm</LuxuryHeading>
 *   <LuxuryHeading variant="headline-md" as="h3">Materials</LuxuryHeading>
 *   <LuxuryHeading variant="display-xl" balance>Editorial Hero</LuxuryHeading>
 */

import { cn } from "@/lib/utils";
import type { ElementType, HTMLAttributes } from "react";

type HeadingVariant =
  | "display-xl"
  | "display-lg"
  | "display-md"
  | "headline-lg"
  | "headline-md"
  | "headline-sm";

export interface LuxuryHeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  variant?: HeadingVariant;
  as?: ElementType;
  /** text-wrap: balance — better line breaks for headings */
  balance?: boolean;
  /** italic variant (Playfair Display italic) */
  italic?: boolean;
}

const variantClasses: Record<HeadingVariant, string> = {
  "display-xl": "text-display-xl",
  "display-lg": "text-display-lg",
  "display-md": "text-display-md",
  "headline-lg": "text-headline-lg",
  "headline-md": "text-headline-md",
  "headline-sm": "text-headline-sm",
};

const defaultTags: Record<HeadingVariant, ElementType> = {
  "display-xl": "h1",
  "display-lg": "h1",
  "display-md": "h2",
  "headline-lg": "h2",
  "headline-md": "h3",
  "headline-sm": "h4",
};

export function LuxuryHeading({
  variant = "headline-md",
  as,
  balance = false,
  italic = false,
  className,
  children,
  ...props
}: LuxuryHeadingProps) {
  const Component = as ?? defaultTags[variant];
  return (
    <Component
      className={cn(
        variantClasses[variant],
        balance && "text-balance",
        italic && "italic",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

export default LuxuryHeading;
