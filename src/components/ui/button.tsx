import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Aura Living Button — luxury variants with premium hover effects.
 *
 * Premium hover behaviors (NO magnetic effect — pure CSS-driven):
 *   - primary       — Deep Black bg. Hover: lighter overlay sweeps LEFT → RIGHT,
 *                     arrow slides right, subtle lift + shadow bloom.
 *   - gold          — Gold CTA. Hover: lighter gold sweeps LEFT → RIGHT,
 *                     arrow slides right, glow shadow, lift.
 *   - outline-luxury— Bordered. Hover: ink fill sweeps LEFT → RIGHT (scaleX),
 *                     text stays BLACK on the dark fill (no color invert).
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

        // Aura Living luxury variants — pure CSS hover, no magnetic
        // Primary: deep black with lighter overlay sweeping left→right on hover.
        primary:
          "rounded-[0.25rem] bg-[var(--ink)] px-8 py-3.5 text-[0.75rem] font-semibold tracking-[0.1em] text-white uppercase hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(18,18,18,0.18)] active:translate-y-0 [&_svg.arrow]:group-hover/btn:translate-x-1",
        // Gold: gold bg with lighter gold sweeping left→right on hover.
        gold: "rounded-[0.25rem] bg-[var(--gold)] px-8 py-3.5 text-[0.75rem] font-semibold tracking-[0.1em] text-[var(--ink)] uppercase hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(212,175,55,0.32)] active:translate-y-0 active:bg-[var(--gold-deep)] [&_svg.arrow]:group-hover/btn:translate-x-1",
        // Outline-luxury: bordered with CREAM fill sweeping left→right on hover.
        // Text stays BLACK (visible on cream fill) per user spec.
        "outline-luxury":
          "rounded-[0.25rem] border border-[var(--ink)] bg-transparent px-8 py-3.5 text-[0.75rem] font-semibold tracking-[0.1em] text-[var(--ink)] uppercase hover:-translate-y-0.5 active:translate-y-0 [&_svg.arrow]:group-hover/btn:translate-x-1",
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

// CSS classes for the fill overlay (left→right sweep on hover).
// These are applied to a <span class="btn-fill"> that lives inside the button.
// The fill is positioned absolute, scaled 0 horizontally (origin-left), and
// scales to 1 on parent hover. Children of the button get position:relative
// and z-10 to sit above the fill.
//
// Fill color choices:
//   - primary        → white/15 (subtle lightening on deep black bg)
//   - gold           → gold-soft (lighter gold on gold bg)
//   - outline-luxury → cream (light fill so BLACK text stays visible per spec)
const FILL_CLASSES = {
  primary: "bg-white/15",
  gold: "bg-[var(--gold-soft)]",
  "outline-luxury": "bg-[var(--cream)]",
} as const;

const CHILDREN_WRAPPER_CLASSES =
  "relative z-10 inline-flex items-center justify-center gap-2";

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

  // primary, gold, outline-luxury use an overlay span for the left→right fill.
  const fillVariant =
    variant === "primary" || variant === "gold" || variant === "outline-luxury"
      ? (variant as "primary" | "gold" | "outline-luxury")
      : null;

  if (fillVariant) {
    // When asChild, Slot clones the single child element and merges className.
    // We pass a wrapper that contains BOTH the fill span AND the children.
    // Slot will merge its className into the wrapper, but the wrapper is a
    // <span> which doesn't get button styles — so we DON'T use Slot here.
    // Instead, when asChild is true we render the Comp (e.g. <a>) directly,
    // with the fill span + children inside it. Slot's role is purely to allow
    // the user's element type — but if the user is passing an <a>, we can
    // just render the <a> ourselves via Slot by passing it as the child.
    //
    // Simplification: we always render the button root + fill span + children.
    // For asChild mode, the children must be a single element that Slot can
    // clone — so we wrap the fill span + actual children in a fragment.
    // But Slot still sees 2 children (span + a).
    //
    // Final approach: when asChild is true, the user passes <a>...</a>.
    // We don't render the fill span (no left→right sweep). Instead, we use
    // CSS ::before pseudo-element for the fill via a custom class.
    if (asChild) {
      return (
        <Comp
          data-slot="button"
          className={cn(
            buttonVariants({ variant, size, className }),
            "before:absolute before:inset-0 before:origin-left before:scale-x-0 before:transition-transform before:duration-500 before:ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:before:scale-x-100",
            fillVariant === "primary" && "before:bg-white/15",
            fillVariant === "gold" && "before:bg-[var(--gold-soft)]",
            fillVariant === "outline-luxury" && "before:bg-[var(--cream)]",
          )}
          {...props}
        >
          {children}
        </Comp>
      );
    }

    // Non-asChild: render <button> with fill span + children wrapper.
    return (
      <Comp
        data-slot="button"
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 origin-left scale-x-0 bg-transparent transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:scale-x-100",
            FILL_CLASSES[fillVariant],
          )}
        />
        <span className={CHILDREN_WRAPPER_CLASSES}>{children}</span>
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
