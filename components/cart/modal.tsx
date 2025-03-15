"use client";

import { Dialog, Transition } from "@headlessui/react";
import { ShoppingCartIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Price from "components/price";
import { DEFAULT_OPTION } from "lib/constants";
import { createUrl } from "lib/utils";
import { getImageUrl } from "lib/utils/image";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useRef } from "react";
import { useCart } from "./cart-context";
import { EditItemQuantityButton } from "./edit-item-quantity-button";

type MerchandiseSearchParams = {
  [key: string]: string;
};

export default function CartModal() {
  const { cart, updateCartItem, removeCartItem } = useCart();
  const quantityRef = useRef(cart.totalQuantity);
  const openCart = () => {};
  const closeCart = () => {};

  useEffect(() => {
    // Open cart modal when quantity changes.
    if (cart.totalQuantity !== quantityRef.current) {
      // But only if it's not already open.
      openCart();
    }
    quantityRef.current = cart.totalQuantity;
  }, [cart.totalQuantity, openCart]);

  return (
    <>
      <button
        aria-label="Open cart"
        onClick={openCart}
        className="relative flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white"
      >
        <ShoppingCartIcon className="h-4 transition-all ease-in-out hover:scale-110" />
        {cart.totalQuantity > 0 && (
          <div className="absolute right-0 top-0 -mr-2 -mt-2 h-4 w-4 rounded bg-blue-600 text-[11px] font-medium text-white">
            {cart.totalQuantity}
          </div>
        )}
      </button>
      <Transition.Root show={true} as={Fragment}>
        <Dialog onClose={closeCart} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-neutral-400/25 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl dark:bg-black">
                      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-black dark:text-white">
                            Cart
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="relative -m-2 p-2 text-neutral-400 hover:text-neutral-500"
                              onClick={closeCart}
                            >
                              <span className="absolute -inset-0.5" />
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>

                        <div className="mt-8">
                          <div className="flow-root">
                            {cart.lines.length === 0 ? (
                              <div className="flex h-full flex-col items-center justify-center space-y-1">
                                <ShoppingCartIcon
                                  className="w-16"
                                  aria-hidden="true"
                                />
                                <p className="text-sm font-medium text-black dark:text-white">
                                  Your cart is empty.
                                </p>
                              </div>
                            ) : (
                              <ul
                                role="list"
                                className="-my-6 divide-y divide-neutral-200"
                              >
                                {cart.lines
                                  .sort((a, b) =>
                                    a.merchandise.product.title.localeCompare(
                                      b.merchandise.product.title
                                    )
                                  )
                                  .map((item) => {
                                    const merchandiseSearchParams =
                                      {} as MerchandiseSearchParams;

                                    item.merchandise.selectedOptions.forEach(
                                      ({ name, value }) => {
                                        if (value !== DEFAULT_OPTION) {
                                          merchandiseSearchParams[
                                            name.toLowerCase()
                                          ] = value;
                                        }
                                      }
                                    );

                                    const merchandiseUrl = createUrl(
                                      `/product/${item.merchandise.product.handle}`,
                                      new URLSearchParams(
                                        merchandiseSearchParams
                                      )
                                    );

                                    return (
                                      <li
                                        key={item.merchandise.id}
                                        className="flex py-6"
                                      >
                                        <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-neutral-200 dark:border-neutral-800">
                                          <Image
                                            src={
                                              item.merchandise.product
                                                .featuredImage
                                                ? getImageUrl(
                                                    item.merchandise.product
                                                      .featuredImage.source
                                                  )
                                                : ""
                                            }
                                            alt={item.merchandise.product.title}
                                            className="h-full w-full object-cover object-center"
                                            fill
                                          />
                                        </div>

                                        <div className="ml-4 flex flex-1 flex-col">
                                          <div>
                                            <div className="flex justify-between text-base font-medium text-black dark:text-white">
                                              <h3>
                                                <Link
                                                  href={merchandiseUrl}
                                                  className="font-medium"
                                                >
                                                  {
                                                    item.merchandise.product
                                                      .title
                                                  }
                                                </Link>
                                              </h3>
                                              <p className="ml-4">
                                                <Price
                                                  amount={
                                                    item.merchandise.price
                                                      .amount
                                                  }
                                                  currencyCode={
                                                    item.merchandise.price
                                                      .currencyCode
                                                  }
                                                />
                                              </p>
                                            </div>
                                            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                                              {item.merchandise.title}
                                            </p>
                                          </div>
                                          <div className="flex flex-1 items-end justify-between text-sm">
                                            <div className="flex items-center border rounded-full">
                                              <EditItemQuantityButton
                                                item={item}
                                                type="minus"
                                                onClick={() => {
                                                  updateCartItem(
                                                    item.merchandise.id,
                                                    item.quantity - 1
                                                  );
                                                }}
                                              />
                                              <p className="mx-2 flex-1 text-center">
                                                <span className="w-8">
                                                  {item.quantity}
                                                </span>
                                              </p>
                                              <EditItemQuantityButton
                                                item={item}
                                                type="plus"
                                                onClick={() => {
                                                  updateCartItem(
                                                    item.merchandise.id,
                                                    item.quantity + 1
                                                  );
                                                }}
                                              />
                                            </div>
                                            <div className="ml-4">
                                              <button
                                                type="button"
                                                className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
                                                onClick={() =>
                                                  removeCartItem(
                                                    item.merchandise.id
                                                  )
                                                }
                                              >
                                                Remove
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </li>
                                    );
                                  })}
                              </ul>
                            )}
                          </div>
                        </div>
                      </div>
                      {cart.lines.length > 0 ? (
                        <div className="border-t border-neutral-200 px-4 py-6 sm:px-6">
                          <div className="flex justify-between text-base font-medium text-black dark:text-white">
                            <p>Subtotal</p>
                            <p>
                              <Price
                                amount={cart.cost.subtotalAmount.amount}
                                currencyCode={
                                  cart.cost.subtotalAmount.currencyCode
                                }
                              />
                            </p>
                          </div>
                          <div className="flex justify-between text-base font-medium text-black dark:text-white">
                            <p>Taxes</p>
                            <p>
                              <Price
                                amount={cart.cost.totalTaxAmount.amount}
                                currencyCode={
                                  cart.cost.totalTaxAmount.currencyCode
                                }
                              />
                            </p>
                          </div>
                          <div className="flex justify-between text-base font-medium text-black dark:text-white">
                            <p>Total</p>
                            <p>
                              <Price
                                amount={cart.cost.totalAmount.amount}
                                currencyCode={
                                  cart.cost.totalAmount.currencyCode
                                }
                              />
                            </p>
                          </div>
                          <div className="mt-6">
                            <button className="w-full rounded-full bg-blue-600 px-6 py-3 text-center font-medium text-white hover:bg-blue-500">
                              Checkout
                            </button>
                          </div>
                          <div className="mt-6 flex justify-center text-center text-sm text-neutral-500">
                            <p>
                              or{" "}
                              <button
                                type="button"
                                className="font-medium text-blue-600 hover:text-blue-500"
                                onClick={closeCart}
                              >
                                Continue Shopping
                                <span aria-hidden="true"> &rarr;</span>
                              </button>
                            </p>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
