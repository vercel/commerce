'use client';

import { Dialog, Transition } from '@headlessui/react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import LoadingDots from 'components/loading-dots';
import Price from 'components/price';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { useCart } from './cart-context';
import CloseCart from './close-cart';
import { DeleteItemButton } from './delete-item-button';
import { EditItemQuantityButton } from './edit-item-quantity-button';
import OpenCart from './open-cart';

export default function CartModal() {
  const { cart, setNewCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const { data } = useSession();

  useEffect(() => {
    if (data?.user.token) {
      const fetchCart = async () => {
        const cart = await (await fetch('/api/cart')).json();
        setNewCart(cart);
      };
      fetchCart();
    }
  }, [data]);

  return (
    <>
      <button aria-label="Open cart" onClick={openCart}>
        <OpenCart
          quantity={
            cart?.items
              ?.map((item) => item.quantity)
              .reduce((a, b) => a + b, 0)
              .toString() ?? '0'
          }
        />
      </button>
      <Transition show={isOpen}>
        <Dialog onClose={closeCart} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-[.5px]"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100 backdrop-blur-[.5px]"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="fixed bottom-0 right-0 top-0 flex h-full w-full flex-col border-l border-neutral-200 bg-white/80 p-6 text-black backdrop-blur-xl md:w-[390px] dark:border-neutral-700 dark:bg-black/80 dark:text-white">
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">My Cart</p>
                <button aria-label="Close cart" onClick={closeCart}>
                  <CloseCart />
                </button>
              </div>

              {!cart || cart.items?.length === 0 ? (
                <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
                  <ShoppingCartIcon className="h-16" />
                  <p className="mt-6 text-center text-2xl font-bold">Your cart is empty.</p>
                </div>
              ) : (
                <div className="flex h-full flex-col justify-between overflow-hidden p-1">
                  <ul className="flex-grow overflow-auto py-4">
                    {cart.items?.length &&
                      cart.items
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((item, i) => {
                          return (
                            <li
                              key={i}
                              className="flex w-full flex-col border-b border-neutral-300 dark:border-neutral-700"
                            >
                              <div className="relative flex w-full flex-row justify-between px-1 py-4">
                                <div className="absolute z-40 -ml-1 -mt-2">
                                  <DeleteItemButton item={item} />
                                </div>
                                <div className="flex flex-row">
                                  <div className="relative h-16 w-16 overflow-hidden rounded-md border border-neutral-300 bg-neutral-300 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800">
                                    <Image
                                      className="h-full w-full object-cover"
                                      width={64}
                                      height={64}
                                      alt={item.name}
                                      src={item.images?.[0]?.src || ''}
                                    />
                                  </div>
                                  <Link
                                    href={''}
                                    onClick={closeCart}
                                    className="z-30 ml-2 flex flex-row space-x-4"
                                  >
                                    <div className="flex flex-1 flex-col text-base">
                                      <span className="leading-tight">{item.name}</span>
                                      {item.variation.map((variation, i) => (
                                        <span key={i} className="text-sm text-neutral-500 dark:text-neutral-400">
                                          {variation.attribute}: {variation.value}
                                        </span>
                                      ))}
                                    </div>
                                  </Link>
                                </div>
                                <div className="flex h-16 flex-col justify-between">
                                  <Price
                                    className="flex justify-end space-y-2 text-right text-sm"
                                    amount={item.prices?.price}
                                    needSplit
                                    currencyCode={item.prices.currency_code}
                                  />
                                  <div className="ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-200 dark:border-neutral-700">
                                    <EditItemQuantityButton item={item} type="minus" />
                                    <p className="w-6 text-center">
                                      <span className="w-full text-sm">{item.quantity}</span>
                                    </p>
                                    <EditItemQuantityButton item={item} type="plus" />
                                  </div>
                                </div>
                              </div>
                            </li>
                          );
                        })}
                  </ul>
                  <div className="py-4 text-sm text-neutral-500 dark:text-neutral-400">
                    <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 dark:border-neutral-700">
                      <p>Taxes</p>
                      <Price
                        className="text-right text-base text-black dark:text-white"
                        amount={cart.totals?.total_price}
                        needSplit
                        currencyCode={'EUR'}
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
                        amount={cart.totals?.total_price}
                        needSplit
                        currencyCode={'EUR'}
                      />
                    </div>
                  </div>
                  <form action={'/checkout'}>
                    <CheckoutButton />
                  </form>
                </div>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}

function CheckoutButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="block w-full rounded-full bg-blue-600 p-3 text-center text-sm font-medium text-white opacity-90 hover:opacity-100"
      type="submit"
      disabled={pending}
    >
      {pending ? <LoadingDots className="bg-white" /> : 'Proceed to Checkout'}
    </button>
  );
}
