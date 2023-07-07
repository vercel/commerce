'use client';

import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';

import CartIcon from 'components/icons/cart';
import ShoppingCartIcon from 'components/icons/shopping-cart';
import Price from 'components/price';
import { DEFAULT_OPTION } from 'lib/constants';
import type { Cart } from 'lib/shopify/types';
import { createUrl } from 'lib/utils';
import { Fragment, useEffect, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import DeleteItemButton from './delete-item-button';
import EditItemQuantityButton from './edit-item-quantity-button';

type MerchandiseSearchParams = {
  [key: string]: string;
};

export default function CartModal({ cart, cartIdUpdated }: { cart: Cart; cartIdUpdated: boolean }) {
  const [, setCookie] = useCookies(['cartId']);
  const [isOpen, setIsOpen] = useState(false);
  const quantityRef = useRef(cart.totalQuantity);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  useEffect(() => {
    if (cartIdUpdated) {
      setCookie('cartId', cart.id, {
        path: '/',
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production'
      });
    }
    return;
  }, [setCookie, cartIdUpdated, cart.id]);

  useEffect(() => {
    // Open cart modal when when quantity changes.
    if (cart.totalQuantity !== quantityRef.current) {
      // But only if it's not already open (quantity also changes when editing items in cart).
      if (!isOpen) {
        setIsOpen(true);
      }

      // Always update the quantity reference
      quantityRef.current = cart.totalQuantity;
    }
  }, [isOpen, cart.totalQuantity, quantityRef]);

  return (
    <>
      <button aria-label="Open cart" onClick={openCart} data-testid="open-cart">
        <CartIcon quantity={cart.totalQuantity} />
      </button>
      <Transition show={isOpen}>
        <Dialog onClose={closeCart} className="relative z-50" data-testid="cart">
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
            <Dialog.Panel className="fixed bottom-0 right-0 top-0 flex h-full w-full flex-col bg-white/90 p-6 text-black backdrop-blur-xl dark:bg-black/90 dark:text-white md:w-[390px]">
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">My Cart</p>

                <button aria-label="Close cart" onClick={closeCart} data-testid="close-cart">
                  <CartIcon quantity={cart.totalQuantity} />
                </button>
              </div>

              {cart.lines.length === 0 ? (
                <div className="flex flex-col items-center justify-center w-full mt-20 overflow-hidden">
                  <ShoppingCartIcon className="h-16" />
                  <p className="mt-6 text-2xl font-bold text-center">Your cart is empty.</p>
                </div>
              ) : (
                <div className="flex flex-col justify-between h-full overflow-hidden">
                  <ul className="flex-grow py-4 overflow-auto">
                    {cart.lines.map((item, i) => {
                      const merchandiseSearchParams = {} as MerchandiseSearchParams;

                      item.merchandise.selectedOptions.forEach(({ name, value }) => {
                        if (value !== DEFAULT_OPTION) {
                          merchandiseSearchParams[name.toLowerCase()] = value;
                        }
                      });

                      const merchandiseUrl = createUrl(
                        `/product/${item.merchandise.product.handle}`,
                        new URLSearchParams(merchandiseSearchParams)
                      );

                      return (
                        <li
                          key={i}
                          data-testid="cart-item"
                          className="flex flex-col w-full border-b"
                        >
                          <div className="flex flex-row justify-between w-full py-4">
                            <Link
                              href={merchandiseUrl}
                              onClick={closeCart}
                              className="flex flex-row space-x-4"
                            >
                              <div className="relative rounded-md border border-dark-gray-4 bg-white/[6.6%] hover:bg-white/[8.7%]">
                                <div className="absolute right-0 -mt-2 -mr-2">
                                  <DeleteItemButton item={item} />
                                </div>
                                <div className="w-16 h-16 overflow-hidden rounded-md cursor-pointer">
                                  <Image
                                    className="object-cover w-full h-full "
                                    width={64}
                                    height={64}
                                    alt={
                                      item.merchandise.product.featuredImage.altText ||
                                      item.merchandise.product.title
                                    }
                                    src={item.merchandise.product.featuredImage.url}
                                  />
                                </div>
                              </div>

                              <div className="flex flex-col flex-1 text-base">
                                <span className="leading-tight">
                                  {item.merchandise.product.title}
                                </span>
                                {item.merchandise.title !== DEFAULT_OPTION ? (
                                  <p className="font-semibold " data-testid="cart-product-variant">
                                    {item.merchandise.title}
                                  </p>
                                ) : null}
                              </div>
                            </Link>
                            <div className="flex flex-col justify-between h-16">
                              <Price
                                className="flex flex-col justify-between space-y-2 text-sm"
                                amount={item.cost.totalAmount.amount}
                                currencyCode={item.cost.totalAmount.currencyCode}
                              />
                              <div className="flex flex-row items-center ml-auto border rounded-full h-9 border-dark-gray-4">
                                <EditItemQuantityButton item={item} type="minus" />
                                <p className="">
                                  <span className="w-full px-2 text-sm">{item.quantity}</span>
                                </p>
                                <EditItemQuantityButton item={item} type="plus" />
                              </div>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="pt-2 text-sm text-black border-t border-gray-200 dark:text-white">
                    <div className="flex items-center justify-between mb-2">
                      <p>Subtotal</p>
                      <Price
                        className="text-right"
                        amount={cart.cost.subtotalAmount.amount}
                        currencyCode={cart.cost.subtotalAmount.currencyCode}
                      />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <p>Taxes</p>
                      <Price
                        className="text-right"
                        amount={cart.cost.totalTaxAmount.amount}
                        currencyCode={cart.cost.totalTaxAmount.currencyCode}
                      />
                    </div>
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-200">
                      <p>Shipping</p>
                      <p className="text-right">Calculated at checkout</p>
                    </div>
                    <div className="flex items-center justify-between mb-2 font-bold">
                      <p>Total</p>
                      <Price
                        className="text-right"
                        amount={cart.cost.totalAmount.amount}
                        currencyCode={cart.cost.totalAmount.currencyCode}
                      />
                    </div>
                  </div>
                  <a
                    href={cart.checkoutUrl}
                    className="flex items-center justify-center w-full p-3 text-sm font-medium text-white uppercase bg-black opacity-90 hover:opacity-100 dark:bg-white dark:text-black"
                  >
                    <span>Proceed to Checkout</span>
                  </a>
                </div>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
