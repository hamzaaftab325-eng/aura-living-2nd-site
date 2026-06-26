import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Aura Living Button — luxury variants.
 *
 * Variants:
 *   - default       — shadcn default (kept for backward compat)
 *   - primary       — Deep Black (#121212), uppercase tracked, hover lift
 *   - gold          — Luxury Gold CTA (use ONLY for Add-to-Cart / Buy-Now)
 *   - ghost         — transparent, hover bg-cream
 *   - outline       — bordered, hover border-ink
 *   - underline     — text + gold underline reveal on hover
 *   - link          — text link (shadcn compat)
 *   - destructive   — red (kept for destructive actions)
 *
 * Sizes:
 *   - default, sm, lg, xl, icon, icon-sm, icon-lg
 */

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:ring-2 focus-visible:ring-[var(--gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] focus-visible:outline-none disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        // shadcn defaults (kept for backward compat)
        default:
          "rounded-md bg-[var(--ink)] text-white hover:bg-[var(--ink)]/90",
        destructive:
          "rounded-md bg-[var(--destructive)] text-white hover:bg-[var(--destructive)]/90",
        outline:
          "rounded-md border border-[var(--line)] bg-transparent hover:border-[var(--ink)] hover:bg-[var(--cream)]",
        secondary:
          "rounded-md bg-[var(--cream)] text-[var(--ink)] hover:bg-[var(--cream-warm)]",
        ghost: "rounded-md hover:bg-[var(--cream)] hover:text-[var(--ink)]",
        link: "text-[var(--ink)] underline-offset-4 hover:underline",

        // Aura Living luxury variants
        primary:
          "rounded-[0.25rem] bg-[var(--ink)] px-8 py-3.5 text-[0.75rem] font-semibold tracking-[0.1em] text-white uppercase hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(18,18,18,0.15)] active:translate-y-0",
        gold: "rounded-[0.25rem] bg-[var(--gold)] px-8 py-3.5 text-[0.75rem] font-semibold tracking-[0.1em] text-[var(--ink)] uppercase hover:-translate-y-0.5 hover:bg-[var(--gold-soft)] hover:shadow-[0_8px_24px_rgba(212,175,55,0.28)] active:translate-y-0 active:bg-[var(--gold-deep)]",
        "outline-luxury":
          "rounded-[0.25rem] border border-[var(--ink)] bg-transparent px-8 py-3.5 text-[0.75rem] font-semibold tracking-[0.1em] text-[var(--ink)] uppercase hover:-translate-y-0.5 hover:bg-[var(--ink)] hover:text-white active:translate-y-0",
        underline:
          "relative px-0 pb-1 text-[0.875rem] font-medium text-[var(--ink)] after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-right after:scale-x-0 after:bg-[var(--gold)] after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.22,1,0.36,1)] hover:after:origin-left hover:after:scale-x-100",
      },
      size: {
        default: "h-10 px-5 py-2 text-sm has-[>svg]:px-3",
        sm: "h-8 gap-1.5 rounded-md px-3 text-xs has-[>svg]:px-2.5",
        lg: "h-12 rounded-md px-6 text-base has-[>svg]:px-4",
        xl: "h-14 rounded-md px-10 text-base has-[>svg]:px-6",
        icon: "size-10 rounded-full",
        "icon-sm": "size-8 rounded-full",
        "icon-lg": "size-12 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
