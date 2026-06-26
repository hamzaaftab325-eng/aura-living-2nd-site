"use client";

import { useState } from "react";
import { MaterialChip } from "@/components/ui";
import { formatPrice } from "@/lib/format";
import type { ProductVariant } from "@prisma/client";

/**
 * VariantSelector — size/color/material selection with price display.
 * Client component — handles selection state.
 */
export function VariantSelector({
  variants,
  basePrice,
}: {
  variants: ProductVariant[];
  basePrice: number;
}) {
  const [selectedId, setSelectedId] = useState(variants[0]?.id ?? "");

  const selected = variants.find((v) => v.id === selectedId);
  const priceDelta = selected ? Number(selected.priceDelta) : 0;
  const finalPrice = basePrice + priceDelta;

  return (
    <div className="flex flex-col gap-4 border-t border-[var(--line)] pt-6">
      {/* Price display */}
      <div className="flex items-center gap-3">
        <span className="text-headline-md font-medium text-[var(--ink)]">
          {formatPrice(finalPrice)}
        </span>
        {priceDelta !== 0 && (
          <span className="text-body-sm text-[var(--muted)]">
            {priceDelta > 0 ? "+" : ""}
            {formatPrice(priceDelta)}
          </span>
        )}
      </div>

      {/* Variant chips */}
      <div className="flex flex-wrap gap-3">
        {variants.map((variant) => {
          const label = [variant.size, variant.color, variant.material]
            .filter(Boolean)
            .join(" / ");
          return (
            <div key={variant.id} onClick={() => setSelectedId(variant.id)}>
              <MaterialChip
                label={label || "Standard"}
                selected={variant.id === selectedId}
              />
            </div>
          );
        })}
      </div>

      {/* Stock indicator */}
      {selected && (
        <p className="text-body-sm text-[var(--muted)]">
          {selected.stock > 0 ? (
            <span className="text-[var(--gold-deep)]">
              {selected.stock} in stock
            </span>
          ) : (
            <span className="text-[var(--destructive)]">Out of stock</span>
          )}
        </p>
      )}

      {/* Color swatch preview */}
      {selected?.colorHex && (
        <div className="flex items-center gap-2">
          <span className="label-caps text-[var(--muted)]">Color:</span>
          <div
            className="h-5 w-5 rounded-full border border-[var(--line)]"
            style={{ backgroundColor: selected.colorHex }}
            aria-hidden
          />
          <span className="text-body-sm text-[var(--ink)]">
            {selected.color}
          </span>
        </div>
      )}
    </div>
  );
}
