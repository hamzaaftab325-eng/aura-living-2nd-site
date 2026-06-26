"use client";

/**
 * FAQAccordion — luxury FAQ accordion using Radix primitives.
 *
 * Spec: Refined, single-open, plus/minus indicator, gold accent on open.
 * Smooth height + opacity animation via Motion.
 *
 * Usage:
 *   <FAQAccordion
 *     items={[
 *       { q: "What's your return policy?", a: "We accept returns within 30 days..." },
 *       { q: "Do you ship internationally?", a: "Currently we ship across Pakistan..." },
 *     ]}
 *   />
 */

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export interface FAQItem {
  q: string;
  a: string;
}

export interface FAQAccordionProps {
  items: FAQItem[];
  className?: string;
}

export function FAQAccordion({ items, className }: FAQAccordionProps) {
  return (
    <Accordion
      type="single"
      collapsible
      className={cn("flex flex-col gap-0", className)}
    >
      {items.map((item, i) => (
        <AccordionItem
          key={i}
          value={`item-${i}`}
          className="border-b border-[var(--line)] first:border-t"
        >
          <AccordionTrigger className="group flex items-center justify-between gap-6 py-8 text-left transition-colors duration-300 hover:text-[var(--gold-deep)] [&[data-state=open]]:text-[var(--ink)]">
            <span className="text-headline-sm font-medium text-[var(--ink)]">
              {item.q}
            </span>
            <span
              className="relative flex h-6 w-6 shrink-0 items-center justify-center"
              aria-hidden
            >
              {/* Plus/Minus indicator */}
              <span className="absolute h-px w-3 bg-[var(--ink)] transition-opacity duration-300 group-data-[state=open]:opacity-0" />
              <span className="absolute h-3 w-px bg-[var(--ink)] transition-all duration-300 group-data-[state=open]:rotate-90 group-data-[state=open]:bg-[var(--gold)]" />
            </span>
          </AccordionTrigger>
          <AccordionContent className="text-body-md data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-[var(--stone)]">
            <p className="max-w-[60ch] pr-12 pb-8 leading-relaxed">{item.a}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
