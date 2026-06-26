/**
 * Section — vertical stack wrapper with luxury spacing.
 *
 * Spec:
 *   - section-xl: 120px vertical padding (hero, major landing sections)
 *   - section-md: 64px vertical padding (standard content sections)
 *   - section-sm: 32px vertical padding (compact rows)
 *
 * Wraps children in a Container by default. Pass `bare` to skip the container
 * (useful for full-bleed sections like parallax heroes).
 */

import { cn } from "@/lib/utils";
import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { Container } from "./container";

type SectionSpacing = "none" | "sm" | "md" | "lg" | "xl";
type SectionTone = "default" | "surface" | "cream" | "ink" | "transparent";

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  spacing?: SectionSpacing;
  tone?: SectionTone;
  bare?: boolean;
  containerSize?: "default" | "narrow" | "wide";
  children: ReactNode;
}

const spacingClasses: Record<SectionSpacing, string> = {
  none: "",
  sm: "section-md py-8",
  md: "section-md",
  lg: "py-20",
  xl: "section-xl",
};

const toneClasses: Record<SectionTone, string> = {
  default: "bg-background",
  surface: "bg-[var(--surface)]",
  cream: "bg-[var(--cream)]",
  ink: "bg-[var(--ink)] text-background",
  transparent: "",
};

export function Section({
  as,
  spacing = "md",
  tone = "default",
  bare = false,
  containerSize = "default",
  className,
  children,
  ...props
}: SectionProps) {
  const Component = as ?? "section";
  return (
    <Component
      className={cn(spacingClasses[spacing], toneClasses[tone], className)}
      {...props}
    >
      {bare ? children : <Container size={containerSize}>{children}</Container>}
    </Component>
  );
}

export default Section;
