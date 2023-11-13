'use client';

import { addItem } from 'components/cart/actions';
import LoadingDots from 'components/loading-dots';
import Price from 'components/price';
import { Product, ProductVariant } from 'lib/shopify/types';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

export function PromotedCartItem({
  product,
  availableForSale
}: {
  product: Product;
  availableForSale: boolean;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isPending, startTransition] = useTransition();
  const defaultVariantId = product?.variants?.length === 1 ? product?.variants?.[0]?.id : undefined;
  const variant = product?.variants?.find((variant: ProductVariant) =>
    variant.selectedOptions.every(
      (option) => option.value === searchParams.get(option.name.toLowerCase())
    )
  );
  const selectedVariantId = variant?.id || defaultVariantId;
  const title = !availableForSale
    ? 'Out of stock'
    : !selectedVariantId
    ? 'Please select options'
    : undefined;

  return product ? (
    <button
      aria-label="Add to cart"
      disabled={isPending || !availableForSale || !selectedVariantId}
      title={title}
      onClick={() => {
        // Safeguard in case someone messes with `disabled` in devtools.
        if (!availableForSale || !selectedVariantId) return;

        startTransition(async () => {
          const error = await addItem(selectedVariantId);

          if (error) {
            // Trigger the error boundary in the root error.js
            throw new Error(error.toString());
          }

          router.refresh();
        });
      }}
    >
      <>
        <div key={product.handle}>
          <div className="flex flex-col space-y-2 border border-dark/10 border-y-white/20 p-2 transition-colors duration-150 hover:border-y-white/40 hover:bg-white/20">
            <div className="flex flex-row space-x-4">
              <div className="relative z-0 h-16 w-16 cursor-pointer overflow-hidden bg-white">
                <Link href={`/product/${product.handle}`} passHref>
                  <Image
                    width={150}
                    height={150}
                    src={product?.featuredImage?.url}
                    alt={product?.featuredImage?.altText || product?.title}
                    unoptimized
                  />
                </Link>
              </div>
              <div className="flex flex-1 flex-col text-sm text-white">
                <div className="flex flex-col items-start justify-between space-y-2 text-sm">
                  <span>{product.title}</span>
                  <span>
                    {!isPending ? (
                      <Price
                        className="flex-none"
                        amount={product.priceRange.maxVariantPrice.amount}
                        currencyCode={product.priceRange.maxVariantPrice.currencyCode}
                        currencyCodeClassName="hidden @[275px]/label:inline"
                      />
                    ) : (
                      <LoadingDots className="bg-white" />
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </button>
  ) : null;
}
