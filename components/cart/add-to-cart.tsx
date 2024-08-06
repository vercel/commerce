'use client';

import { PlusIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { addItem } from 'components/cart/actions';
import LoadingDots from 'components/loading-dots';
import { Store } from 'lib/aspire/types';
import { ProductVariant } from 'lib/shopify/types';
import { useFormState, useFormStatus } from 'react-dom';

function SubmitButton({
  isAvailableForSale,
  selectedVariantId
}: {
  isAvailableForSale: boolean;
  selectedVariantId: string | undefined;
}) {
  const { pending } = useFormStatus();
  const buttonClasses =
    'relative flex w-full items-center justify-center rounded-md bg-black p-3 tracking-wide text-white ';
  const disabledClasses = 'cursor-not-allowed opacity-60 hover:opacity-60';

  if (!isAvailableForSale) {
    return (
      <button aria-disabled className={clsx(buttonClasses, disabledClasses)}>
        Out Of Stock
      </button>
    );
  }

  if (!selectedVariantId) {
    return (
      <button
        aria-label="Please select an option"
        aria-disabled
        className={clsx(buttonClasses, disabledClasses)}
      >
        <div className="absolute left-0 ml-4 ">
          <PlusIcon className="h-5" />
        </div>
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
        [disabledClasses]: pending
      })}
    >
      <div className="absolute left-0 ml-4">
        {pending ? <LoadingDots className="mb-3 bg-white" /> : <></>}
      </div>
      Add To Cart
    </button>
  );
}

export function AddToCart({ store, variant }: { store: Store; variant: ProductVariant }) {
  const [message, formAction] = useFormState(addItem, null);
  const selectedVariantId = variant?.id;
  const actionWithVariant = formAction.bind(null, { selectedVariantId, store });

  return (
    <form action={actionWithVariant}>
      <SubmitButton
        isAvailableForSale={variant.availableForSale}
        selectedVariantId={selectedVariantId}
      />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
