'use client';

import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { addItem } from 'components/cart/actions';
import LoadingDots from 'components/loading-dots';
import { CORE_VARIANT_ID_KEY, CORE_WAIVER } from 'lib/constants';
import { ProductVariant } from 'lib/shopify/types';
import { useSearchParams } from 'next/navigation';
import { useFormState, useFormStatus } from 'react-dom';

function SubmitButton({
  availableForSale,
  disabled
}: {
  availableForSale: boolean;
  disabled: boolean;
}) {
  const { pending } = useFormStatus();
  const buttonClasses =
    'relative flex w-full items-center justify-center rounded bg-secondary p-3 tracking-wide text-white gap-3';
  const disabledClasses = 'cursor-not-allowed opacity-60 hover:opacity-60';

  if (!availableForSale) {
    return (
      <button aria-disabled className={clsx(buttonClasses, disabledClasses)}>
        Out Of Stock
      </button>
    );
  }

  if (disabled) {
    return (
      <button
        aria-label="Please select an option"
        aria-disabled
        className={clsx(buttonClasses, disabledClasses)}
      >
        <ShoppingCartIcon className="h-5" />
        Add To Cart
      </button>
    );
  }

  return (
    <button
      onClick={(e: React.FormEvent<HTMLButtonElement>) => {
        if (pending) e.preventDefault();
      }}
      aria-label="Add to cart"
      aria-disabled={pending}
      className={clsx(buttonClasses, {
        'hover:opacity-90': true,
        disabledClasses: pending
      })}
    >
      {pending ? <LoadingDots className="bg-white" /> : <ShoppingCartIcon className="h-5" />}
      Add To Cart
    </button>
  );
}

export function AddToCart({
  variants,
  availableForSale
}: {
  variants: ProductVariant[];
  availableForSale: boolean;
}) {
  const [message, formAction] = useFormState(addItem, null);
  const searchParams = useSearchParams();
  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every(
      (option) => option.value === searchParams.get(option.name.toLowerCase())
    )
  );
  const selectedVariantId = variant?.id;
  const missingCoreVariantId = variant?.coreVariantId && !searchParams.has(CORE_VARIANT_ID_KEY);

  const coreVariantId = searchParams.get(CORE_VARIANT_ID_KEY);

  // remove special core-waiver value as it is not a valid variant
  const selectedVariantIds = [coreVariantId, selectedVariantId]
    .filter(Boolean)
    .filter((value) => value !== CORE_WAIVER) as string[];

  const actionWithVariant = formAction.bind(null, selectedVariantIds);

  return (
    <form action={actionWithVariant}>
      <SubmitButton
        availableForSale={availableForSale}
        disabled={Boolean(!selectedVariantId || missingCoreVariantId)}
      />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
