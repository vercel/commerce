'use client';

import { Dialog, Transition } from '@headlessui/react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import LoadingDots from 'components/loading-dots';
import Price from 'components/price';
import { useSession } from 'next-auth/react';
import { Fragment, useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { useCart } from './cart-context';
import CartItemView from './cart-item';
import CloseCart from './close-cart';
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
            <Dialog.Panel className="fixed bottom-0 right-0 top-0 flex h-full w-full flex-col border-l border-neutral-200 bg-white/80 p-6 text-black backdrop-blur-xl dark:border-neutral-700 dark:bg-black/80 dark:text-white md:w-[390px]">
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
                              <CartItemView
                                item={item}
                                editable={true}
                                deletable={true}
                                closeCart={closeCart}
                              />
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
                        currencyCode={cart.totals.currency_code}
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
                        currencyCode={cart.totals.currency_code}
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
