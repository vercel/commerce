"use client";

import Price from "components/price";
import type { Product } from "lib/shopify/types";
import { getSelectedVariant } from "lib/utils";
import { useSearchParams } from "next/navigation";

/**
 * Spec-sheet readout for the currently selected variant: live price
 * (with compare-at strikethrough), SKU, and inventory status. Mirrors the
 * variant resolution used by AddToCart so the two never disagree.
 */
export function VariantSpec({ product }: { product: Product }) {
  const searchParams = useSearchParams();
  const variant = getSelectedVariant(product, searchParams);

  const price = variant?.price ?? product.priceRange.minVariantPrice;
  const compareAt =
    variant?.compareAtPrice &&
    parseFloat(variant.compareAtPrice.amount) > parseFloat(price.amount)
      ? variant.compareAtPrice
      : undefined;

  const availability = !variant
    ? "Select a grind"
    : !variant.availableForSale
      ? "Out of stock"
      : variant.quantityAvailable !== null && variant.quantityAvailable <= 15
        ? `Low stock — ${variant.quantityAvailable} left`
        : "In stock";

  const rows: { label: string; value: React.ReactNode }[] = [
    {
      label: "Price",
      value: (
        <span className="flex items-baseline justify-end gap-2">
          {compareAt ? (
            <Price
              className="inline text-bone/35 line-through"
              amount={compareAt.amount}
              currencyCode={compareAt.currencyCode}
            />
          ) : null}
          <Price
            className="inline text-base font-semibold text-bone"
            amount={price.amount}
            currencyCode={price.currencyCode}
          />
        </span>
      ),
    },
    ...(variant?.sku
      ? [{ label: "SKU", value: <span>{variant.sku}</span> }]
      : []),
    {
      label: "Status",
      value: (
        <span
          className={
            !variant || !variant.availableForSale
              ? "text-bone/45"
              : availability.startsWith("Low")
                ? "text-clay"
                : "text-field"
          }
        >
          {availability}
        </span>
      ),
    },
  ];

  return (
    <dl className="mb-8 border border-seam bg-night font-mono text-xs tracking-[0.14em] uppercase">
      {rows.map((row, i) => (
        <div
          key={row.label}
          className={`flex items-center justify-between gap-4 px-4 py-3 ${
            i > 0 ? "border-t border-seam" : ""
          }`}
        >
          <dt className="text-bone/40">{row.label}</dt>
          <dd className="text-right">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}
