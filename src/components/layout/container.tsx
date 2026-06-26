/**
 * Container — luxury max-width wrapper with responsive outer margins.
 *
 * Spec (DESIGN.md → Layout & Spacing):
 *   - max-width: 1440px
 *   - mobile outer margin: 20px
 *   - tablet outer margin: 32px
 *   - desktop outer margin: 64px
 *
 * Usage:
 *   <Container>...</Container>
 *   <Container as="section">...</Container>
 *   <Container size="narrow">...</Container>  // editorial narrow (1024px)
 *   <Container size="wide">...</Container>    // full-bleed (no max-width)
 */

import { cn } from "@/lib/utils";
import type { ElementType, HTMLAttributes, ReactNode } from "react";

type ContainerSize = "default" | "narrow" | "wide";

export interface ContainerProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  size?: ContainerSize;
  children: ReactNode;
}

const sizeClasses: Record<ContainerSize, string> = {
  default: "container-luxury",
  narrow: "mx-auto w-full max-w-[1024px] px-5 md:px-8 lg:px-12",
  wide: "mx-auto w-full max-w-[1760px] px-5 md:px-8 lg:px-16",
};

export function Container({
  as,
  size = "default",
  className,
  children,
  ...props
}: ContainerProps) {
  const Component = as ?? "div";
  return (
    <Component className={cn(sizeClasses[size], className)} {...props}>
      {children}
    </Component>
  );
}

export default Container;
