'use client';

import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { updateItemQuantity } from 'components/cart/actions';
import LoadingDots from 'components/loading-dots';
import type { CartItem } from 'lib/shopify/types';
import { useOptimistic, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';

function SubmitButton({ type }: { type: 'plus' | 'minus' }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      onClick={(e: React.FormEvent<HTMLButtonElement>) => {
        if (pending) e.preventDefault();
      }}
      aria-label={type === 'plus' ? 'Increase item quantity' : 'Reduce item quantity'}
      aria-disabled={pending}
      className={clsx(
        'ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full px-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80',
        {
          'cursor-not-allowed': pending,
          'ml-auto': type === 'minus'
        }
      )}
    >
      {pending ? (
        <LoadingDots className="bg-black dark:bg-white" />
      ) : type === 'plus' ? (
        <PlusIcon className="w-4 h-4 dark:text-neutral-500" />
      ) : (
        <MinusIcon className="w-4 h-4 dark:text-neutral-500" />
      )}
    </button>
  );
}
export function EditItemQuantityButton({ item, type, onQuantityChange }: { item: CartItem; type: 'plus' | 'minus'; onQuantityChange: (quantity: number) => void }) {
  const [message, formAction] = useFormState(updateItemQuantity, null);
  
  const [optimisticQuantity, setOptimisticQuantity] = useOptimistic(item.quantity, (state: number, change: number) => state + change);

  // const handleSubmit = async (event: React.FormEvent) => {
  //   event.preventDefault();
  //   const change = type === 'plus' ? 1 : -1;
  //   setOptimisticQuantity(change);
  //   onQuantityChange(optimisticQuantity + change);
    
    // const updatedPayload = {
    //   lineId: item.id,
    //   variantId: item.merchandise.id,
    //   quantity: optimisticQuantity + change
    // };
  //   await formAction(updatedPayload);
  // };


  return (
    <form action={async () => {
      const change = type === 'plus' ? 1 : -1;
      setOptimisticQuantity(change);
      onQuantityChange(optimisticQuantity + change);
      const updatedPayload = {
        lineId: item.id,
        variantId: item.merchandise.id,
        quantity: optimisticQuantity + change
      };
      const actionWithVariant = formAction.bind(null, updatedPayload);
      await actionWithVariant();
    
    }}>
      <SubmitButton type={type} pending={!!message} />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}

export function EditItemQuantity({ item }: { item: CartItem }) {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleQuantityChange = (newQuantity: number) => setQuantity(newQuantity);

  return (
    <div className="flex flex-row items-center ml-auto border rounded-full h-9 border-neutral-200 dark:border-neutral-700">
      <EditItemQuantityButton item={{ ...item, quantity }} type="minus" onQuantityChange={handleQuantityChange} />
      <p className="w-6 text-center">
        <span className="w-full text-sm">{quantity}</span>
      </p>
      <EditItemQuantityButton item={{ ...item, quantity }} type="plus" onQuantityChange={handleQuantityChange} />
    </div>
  );
}
