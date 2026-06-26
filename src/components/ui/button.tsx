import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Aura Living Button — luxury variants with premium hover effects.
 *
 * Premium hover behaviors (no magnetic effect — pure CSS-driven):
 *   - primary       — Deep Black bg, white text. Hover: bg lightens, arrow
 *                     slides right, subtle lift, soft shadow bloom.
 *   - gold          — Gold CTA. Hover: bg softens, gold glow shadow, lift.
 *   - outline-luxury— Bordered. Hover: ink fill sweeps up from bottom, text inverts.
 *   - underline     — Text + gold underline that grows from left on hover.
 *   - link-arrow    — Text + arrow icon. Hover: text → gold, arrow slides right.
 *   - ghost         — Transparent. Hover: cream bg, subtle text shift.
 *
 * Sizes:
 *   - default, sm, lg, xl, icon, icon-sm, icon-lg
 */

const buttonVariants = cva(
  "group/btn relative inline-flex shrink-0 items-center justify-center gap-2 overflow-hidden whitespace-nowrap transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] focus-visible:outline-none disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-500 [&_svg]:ease-[cubic-bezier(0.22,1,0.36,1)] [&_svg:not([class*='size-'])]:size-4",
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

        // Aura Living luxury variants — premium hover, no magnetic
        primary:
          "rounded-[0.25rem] bg-[var(--ink)] px-8 py-3.5 text-[0.75rem] font-semibold tracking-[0.1em] text-white uppercase hover:-translate-y-0.5 hover:bg-[#1f1f1f] hover:shadow-[0_14px_36px_rgba(18,18,18,0.18)] active:translate-y-0 [&_svg.arrow]:group-hover/btn:translate-x-1",
        gold: "rounded-[0.25rem] bg-[var(--gold)] px-8 py-3.5 text-[0.75rem] font-semibold tracking-[0.1em] text-[var(--ink)] uppercase hover:-translate-y-0.5 hover:bg-[var(--gold-soft)] hover:shadow-[0_12px_32px_rgba(212,175,55,0.32)] active:translate-y-0 active:bg-[var(--gold-deep)] [&_svg.arrow]:group-hover/btn:translate-x-1",
        "outline-luxury":
          "rounded-[0.25rem] border border-[var(--ink)] bg-transparent px-8 py-3.5 text-[0.75rem] font-semibold tracking-[0.1em] text-[var(--ink)] uppercase hover:border-[var(--ink)] hover:text-white active:translate-y-0 [&>span]:absolute [&>span]:inset-0 [&>span]:-z-10 [&>span]:origin-bottom [&>span]:scale-y-0 [&>span]:bg-[var(--ink)] [&>span]:transition-transform [&>span]:duration-500 [&>span]:ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:[&>span]:scale-y-100",
        underline:
          "relative px-0 pb-1 text-[0.875rem] font-medium text-[var(--ink)] transition-colors duration-300 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-right after:scale-x-0 after:bg-[var(--gold)] after:transition-transform after:duration-500 after:ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-[var(--gold-deep)] hover:after:origin-left hover:after:scale-x-100",
        "link-arrow":
          "relative px-0 text-[0.875rem] font-medium text-[var(--ink)] transition-colors duration-300 hover:text-[var(--gold-deep)] [&_svg.arrow]:group-hover/btn:translate-x-1.5",
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
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  // outline-luxury uses a span overlay for the ink sweep-up effect.
  // The overlay is only rendered when NOT using asChild (Slot requires
  // a single child, and the overlay span would be a second child).
  if (variant === "outline-luxury" && !asChild) {
    return (
      <Comp
        data-slot="button"
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        <span aria-hidden className="pointer-events-none" />
        {children}
      </Comp>
    );
  }

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </Comp>
  );
}

export { Button, buttonVariants };
