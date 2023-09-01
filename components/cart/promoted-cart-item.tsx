'use client';

import { addItem } from 'components/cart/actions';
import LoadingDots from 'components/loading-dots';
import { ProductVariant } from 'lib/shopify/types';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

export function PromotedCartItem({
  variants,
  availableForSale
}: {
  variants: ProductVariant[];
  availableForSale: boolean;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations('Index');

  const firstVariant = variants?.[0];

  const [isPending, startTransition] = useTransition();
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const variant = variants.find((variant: ProductVariant) =>
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

  return firstVariant ? (
    <button
      aria-label="Add item to cart"
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
        {console.debug({ firstVariant })}
        {/* <div key={firstVariant.slug}>
        <div className="flex flex-col space-y-2 border border-dark/10 bg-white/20 p-2">
          <div className="flex flex-row space-x-4">
            <div className="relative z-0 h-16 w-16 cursor-pointer overflow-hidden bg-white">
              <Link href={`/product/${firstVariant.path}`} passHref>
                <Image
                  onClick={() => closeSidebarIfPresent()}
                  width={150}
                  height={150}
                  src={firstVariant?.image?.url}
                  alt={firstVariant?.image?.alt}
                  unoptimized
                />
              </Link>
            </div>
            <div className="flex flex-1 flex-col text-sm text-white">
              <div className="flex flex-col justify-between space-y-2 text-sm">
                <span>{firstVariant.price}</span>
              </div>
            </div>
            <button
              type="button"
              className="border border-white/30 bg-white/20 px-4 py-1 text-xs uppercase tracking-wider text-white transition-colors duration-300 hover:bg-white/40 hover:text-white"
              loading={loading}
              onClick={addToCart}
            >
              <> {t('cart.addFeaturedProduct')} </>
            </button>
          </div>
        </div>
      </div> */}
        {!isPending ? (
          <span>{availableForSale ? t('cart.add') : t('cart.out-of-stock')}</span>
        ) : (
          <LoadingDots className="bg-white" />
        )}
      </>
    </button>
  ) : null;
}
