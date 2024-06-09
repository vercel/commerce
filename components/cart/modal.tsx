'use client';

import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import LoadingDots from 'components/loading-dots';
import Price from 'components/price';
import type { Cart } from 'lib/shopify/types';
import { Fragment, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { setMetafields } from './actions';
import CloseCart from './close-cart';
import LineItem from './line-item';
import OpenCart from './open-cart';
import VehicleDetails, { VehicleFormSchema, vehicleFormSchema } from './vehicle-details';

export default function CartModal({ cart }: { cart: Cart | undefined }) {
  const [isOpen, setIsOpen] = useState(false);
  const quantityRef = useRef(cart?.totalQuantity);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const { control, handleSubmit } = useForm<VehicleFormSchema>({
    resolver: zodResolver(vehicleFormSchema)
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | undefined>();
  const linkRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    // Open cart modal when quantity changes.
    if (cart?.totalQuantity !== quantityRef.current) {
      // But only if it's not already open (quantity also changes when editing items in cart).
      if (!isOpen) {
        setIsOpen(true);
      }

      // Always update the quantity reference
      quantityRef.current = cart?.totalQuantity;
    }
  }, [isOpen, cart?.totalQuantity, quantityRef]);

  const onSubmit = async (data: VehicleFormSchema) => {
    if (!cart) return;

    setLoading(true);

    try {
      const message = await setMetafields(cart.id, data);
      if (message) {
        setMessage(message);
      } else {
        linkRef.current?.click();
      }
    } catch (error) {
      setMessage('Error updating vehicle details');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button aria-label="Open cart" onClick={openCart}>
        <OpenCart quantity={cart?.totalQuantity} />
      </button>
      <Transition show={isOpen} as={Fragment}>
        <Dialog onClose={closeCart} className="relative z-50">
          <TransitionChild
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-[.5px]"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100 backdrop-blur-[.5px]"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </TransitionChild>
          <TransitionChild
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <DialogPanel className="fixed bottom-0 right-0 top-0 flex h-full w-full flex-col border-l border-neutral-200 bg-white/80 p-6 text-black backdrop-blur-xl dark:border-neutral-700 dark:bg-black/80 dark:text-white md:w-[390px]">
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">My Cart</p>

                <button aria-label="Close cart" onClick={closeCart}>
                  <CloseCart />
                </button>
              </div>

              {!cart || cart.lines.length === 0 ? (
                <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
                  <ShoppingCartIcon className="h-16" />
                  <p className="mt-6 text-center text-2xl font-bold">Your cart is empty.</p>
                </div>
              ) : (
                <div className="flex h-full flex-col justify-between overflow-hidden p-1">
                  <ul className="flex-grow overflow-auto py-4">
                    {cart.lines.map((item) => {
                      return <LineItem item={item} closeCart={closeCart} key={item.id} />;
                    })}
                  </ul>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="py-4 text-sm text-neutral-500 dark:text-neutral-400">
                      <VehicleDetails control={control} />
                      <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 dark:border-neutral-700">
                        <p>Taxes</p>
                        <Price
                          className="text-right text-base text-black dark:text-white"
                          amount={cart.cost.totalTaxAmount.amount}
                          currencyCode={cart.cost.totalTaxAmount.currencyCode}
                        />
                      </div>
                      <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
                        <p>Shipping</p>
                        <p className="text-right">Calculated at checkout</p>
                      </div>
                      <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
                        <p>Total</p>
                        <Price
                          className="text-right text-base text-black dark:text-white"
                          amount={cart.cost.totalAmount.amount}
                          currencyCode={cart.cost.totalAmount.currencyCode}
                        />
                      </div>
                    </div>
                    <a href={cart.checkoutUrl} ref={linkRef} className="hidden">
                      Proceed to Checkout
                    </a>
                    <button
                      type="submit"
                      className={clsx(
                        'flex w-full flex-row items-center justify-center gap-2 rounded-full  bg-secondary p-3 text-sm font-medium text-white',
                        { 'cursor-not-allowed opacity-60 hover:opacity-60': loading },
                        { 'cursor-pointer opacity-90 hover:opacity-100': !loading }
                      )}
                      aria-disabled={loading}
                    >
                      {loading && <LoadingDots className="bg-white" />}
                      Proceed to Checkout
                    </button>

                    <p aria-live="polite" className="sr-only" role="status">
                      {message}
                    </p>
                  </form>
                </div>
              )}
            </DialogPanel>
          </TransitionChild>
        </Dialog>
      </Transition>
    </>
  );
}
