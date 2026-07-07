"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { addItem } from "components/cart/actions";
import { useCart } from "components/cart/cart-context";
import Price from "components/price";
import { DEFAULT_OPTION } from "lib/constants";
import type { Product, ProductVariant } from "lib/shopify/types";
import { getQuickAddOption } from "lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useActionState } from "react";

/** Sum of known variant inventory; null when the store hides quantities. */
function totalInventory(product: Product): number | null {
  let known = false;
  const total = product.variants.reduce((sum, variant) => {
    if (variant.quantityAvailable === null) return sum;
    known = true;
    return sum + variant.quantityAvailable;
  }, 0);
  return known ? total : null;
}

function StockBadge({ product }: { product: Product }) {
  const inventory = totalInventory(product);

  if (!product.availableForSale) {
    return (
      <span className="border border-seam bg-night/80 px-2 py-1 font-mono text-[10px] tracking-[0.2em] text-bone/50 uppercase backdrop-blur-sm">
        Sold Out
      </span>
    );
  }

  if (inventory !== null && inventory <= 15) {
    return (
      <span className="border border-clay/40 bg-night/80 px-2 py-1 font-mono text-[10px] tracking-[0.2em] text-clay uppercase backdrop-blur-sm">
        Low Stock
      </span>
    );
  }

  return (
    <span className="border border-field/40 bg-night/80 px-2 py-1 font-mono text-[10px] tracking-[0.2em] text-field uppercase backdrop-blur-sm">
      ● In Stock
    </span>
  );
}

/**
 * Grid card with grind-profile quick-add: each chip adds that exact variant
 * (Shopify variant GID → fulfillment SKU) to the cart. Products with more
 * than one option axis link to the product page instead.
 */
export function ProductCard({ product }: { product: Product }) {
  const { addCartItem } = useCart();
  const [, formAction] = useActionState(addItem, null);
  const quickAdd = getQuickAddOption(product);
  const hasRealChoices =
    quickAdd &&
    !(
      quickAdd.choices.length === 1 &&
      quickAdd.choices[0]?.value === DEFAULT_OPTION
    );

  const quickAddVariant = (variant: ProductVariant) => async () => {
    addCartItem(variant, product);
    await formAction.bind(null, variant.id)();
  };

  return (
    <div className="group flex h-full flex-col border border-seam bg-coal transition-colors duration-300 hover:border-bone/25">
      <Link
        href={`/product/${product.handle}`}
        prefetch={true}
        className="relative block aspect-square w-full overflow-hidden border-b border-seam"
      >
        {product.featuredImage?.url ? (
          <Image
            className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-[1.04]"
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            alt={product.featuredImage?.altText || product.title}
            src={product.featuredImage.url}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-night font-mono text-[10px] tracking-[0.3em] text-bone/30 uppercase">
            No Image
          </div>
        )}
        <div className="absolute top-3 left-3">
          <StockBadge product={product} />
        </div>
      </Link>

      <div className="flex grow flex-col p-4">
        <div className="flex items-start justify-between gap-3">
          <Link href={`/product/${product.handle}`} prefetch={true}>
            <h3 className="font-display text-lg leading-tight font-semibold tracking-[0.1em] uppercase">
              {product.title}
            </h3>
          </Link>
          <Price
            className="mt-0.5 flex-none text-right font-mono text-sm text-bone/80"
            amount={product.priceRange.minVariantPrice.amount}
            currencyCode={product.priceRange.minVariantPrice.currencyCode}
            prefix={
              product.priceRange.minVariantPrice.amount !==
              product.priceRange.maxVariantPrice.amount
                ? "From "
                : undefined
            }
          />
        </div>

        <div className="mt-auto pt-4">
          {!product.availableForSale ? (
            <p className="border-t border-seam pt-3 font-mono text-[10px] tracking-[0.25em] text-bone/35 uppercase">
              Back on the trail soon
            </p>
          ) : hasRealChoices ? (
            <form className="border-t border-seam pt-3">
              <p className="font-mono text-[10px] tracking-[0.25em] text-bone/40 uppercase">
                Quick add — {quickAdd.option.name}
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {quickAdd.choices.map(({ value, variant }) => {
                  const disabled = !variant || !variant.availableForSale;
                  return (
                    <button
                      key={value}
                      formAction={
                        variant && !disabled
                          ? quickAddVariant(variant)
                          : undefined
                      }
                      disabled={disabled}
                      aria-label={`Add ${product.title} — ${value} to cart`}
                      title={
                        disabled ? `${value} (out of stock)` : `Add ${value}`
                      }
                      className={clsx(
                        "flex items-center gap-1 border border-seam px-2.5 py-1.5 font-mono text-[10px] tracking-[0.14em] uppercase transition-colors",
                        disabled
                          ? "cursor-not-allowed text-bone/25 line-through"
                          : "text-bone/70 hover:border-field hover:bg-field hover:text-night",
                      )}
                    >
                      <PlusIcon className="h-3 w-3" />
                      {value}
                    </button>
                  );
                })}
              </div>
            </form>
          ) : quickAdd?.choices[0]?.variant ? (
            <form className="border-t border-seam pt-3">
              <button
                formAction={quickAddVariant(quickAdd.choices[0].variant)}
                aria-label={`Add ${product.title} to cart`}
                className="flex w-full items-center justify-center gap-2 border border-seam px-3 py-2 font-mono text-[11px] tracking-[0.25em] text-bone/70 uppercase transition-colors hover:border-field hover:bg-field hover:text-night"
              >
                <PlusIcon className="h-3.5 w-3.5" />
                Add to Pack
              </button>
            </form>
          ) : (
            <Link
              href={`/product/${product.handle}`}
              prefetch={true}
              className="block border-t border-seam pt-3 font-mono text-[11px] tracking-[0.25em] text-bone/70 uppercase transition-colors hover:text-field"
            >
              Select Options →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
