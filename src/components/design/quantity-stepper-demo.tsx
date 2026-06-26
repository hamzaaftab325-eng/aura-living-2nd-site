"use client";

/**
 * QuantityStepperDemo — client component for the design system showcase.
 *
 * Wraps QuantityStepper with local state so users can interact with it
 * on the /design page.
 */

import { useState } from "react";
import { QuantityStepper } from "@/components/ui";

interface QuantityStepperDemoProps {
  label: string;
  size: "sm" | "md" | "lg";
  initial: number;
}

export function QuantityStepperDemo({
  label,
  size,
  initial,
}: QuantityStepperDemoProps) {
  const [value, setValue] = useState(initial);
  return (
    <div className="flex items-center gap-4">
      <span className="label-caps w-20 text-[var(--muted)]">{label}</span>
      <QuantityStepper
        value={value}
        onChange={setValue}
        size={size}
        min={1}
        max={10}
      />
      <span className="text-body-sm text-[var(--muted)]">Value: {value}</span>
    </div>
  );
}
