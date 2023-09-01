'use client';

import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import LoadingDots from 'components/loading-dots';
import { ProductVariant } from 'lib/shopify/types';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import { addItems } from './actions';

export function AddManyToCart({
  quantity = 1,
  variants,
  availableForSale
}: {
  quantity: number;
  variants: ProductVariant[];
  availableForSale: boolean;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const locale = useLocale();
  const t = useTranslations('Index');

  const [currentQuantity, setCurrentQuantity] = useState<number>(quantity);

  const [isPending, startTransition] = useTransition();
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every(
      (option) => option.value === searchParams.get(option.name.toLowerCase())
    )
  );
  const selectedVariantId = variant?.id || defaultVariantId;
  const title = !availableForSale
    ? t('cart.out-of-stock')
    : !selectedVariantId
    ? t('cart.options')
    : undefined;

  return (
    <div className="flex flex-col space-y-2">
      <div className="font-multilingual flex flex-row items-center space-x-2 border border-white/50">
        <div className="px-3">{t('cart.quantity-label')}</div>
        <input
          value={currentQuantity}
          onChange={(e) => setCurrentQuantity(Number(e.target.value))}
          className={clsx(
            'w-auto grow bg-transparent px-2 py-3 text-right text-white',
            'outline-none focus:border-0 focus:outline-none focus:ring-0',
            'focus-visible:ring-none focus-visible:border-none focus-visible:outline-none',
            'focus-visible:ring-0 focus-visible:ring-offset-0',
            'active:border-none active:outline-none active:ring-0'
          )}
        />
        <div className="flex h-full flex-col space-y-px">
          <button
            onClick={() => setCurrentQuantity(currentQuantity ? currentQuantity + 1 : 1)}
            className="grow px-2 py-0.5"
          >
            <span>
              <ChevronUpIcon className="h-4 w-4" />
            </span>
          </button>
          <button
            onClick={() => setCurrentQuantity(currentQuantity > 0 ? currentQuantity - 1 : 0)}
            className="grow px-2 py-0.5"
          >
            <span>
              <ChevronDownIcon className="h-4 w-4" />
            </span>
          </button>
        </div>
      </div>
      <button
        aria-label="Add items to cart"
        disabled={isPending || !availableForSale || !selectedVariantId}
        title={title}
        onClick={() => {
          // Safeguard in case someone messes with `disabled` in devtools.
          if (!availableForSale || !selectedVariantId) return;

          startTransition(async () => {
            const error = await addItems({
              variantId: selectedVariantId,
              quantity: currentQuantity,
              country: locale.toUpperCase()
            });

            if (error) {
              // Trigger the error boundary in the root error.js
              throw new Error(error.toString());
            }

            router.refresh();
          });
        }}
        className={clsx(
          'relative flex w-full items-center justify-center bg-white p-4 font-serif text-xl tracking-wide text-black hover:opacity-90',
          {
            'cursor-not-allowed opacity-60 hover:opacity-60':
              !availableForSale || !selectedVariantId,
            'cursor-not-allowed': isPending
          }
        )}
      >
        {!isPending ? (
          <span>{availableForSale ? t('cart.add') : t('cart.out-of-stock')}</span>
        ) : (
          <LoadingDots className="my-3 bg-black" />
        )}
      </button>
    </div>
  );
}
