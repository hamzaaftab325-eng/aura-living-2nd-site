/**
 * Format utilities — price, dates, etc.
 * Used across the storefront for consistent display.
 */

import { brand } from "@/config/brand";

/**
 * Format a price for display.
 * Uses PKR convention: ₨ prefix, no decimals, locale grouping.
 *
 * Example: 45000 → "₨45,000"
 */
export function formatPrice(
  amount: number,
  currency: string = brand.currency.code,
): string {
  if (currency === "PKR") {
    return `${brand.currency.symbol}${amount.toLocaleString("en-PK")}`;
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}
