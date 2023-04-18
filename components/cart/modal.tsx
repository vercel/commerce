import { Dialog } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';

import CloseIcon from 'components/icons/close';
import ShoppingBagIcon from 'components/icons/shopping-bag';
import Price from 'components/price';
import { DEFAULT_OPTION } from 'lib/constants';
import type { Cart } from 'lib/shopify/types';
import DeleteItemButton from './delete-item-button';
import EditItemQuantityButton from './edit-item-quantity-button';

export default function CartModal({
  isOpen,
  onClose,
  cart
}: {
  isOpen: boolean;
  onClose: () => void;
  cart: Cart;
}) {
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <Dialog
          as={motion.div}
          initial="closed"
          animate="open"
          exit="closed"
          key="dialog"
          static
          open={isOpen}
          onClose={onClose}
          className="relative z-50"
        >
          <motion.div
            variants={{
              open: { opacity: 1, backdropFilter: 'blur(0.5px)' },
              closed: { opacity: 0, backdropFilter: 'blur(0px)' }
            }}
            className="fixed inset-0 bg-black/30"
            aria-hidden="true"
          />

          <div className="fixed inset-0 flex justify-end" data-testid="cart">
            <Dialog.Panel
              as={motion.div}
              variants={{
                open: { translateX: 0 },
                closed: { translateX: '100%' }
              }}
              transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
              className="flex w-full flex-col bg-white p-8 text-black dark:bg-black dark:text-white md:w-1/3 lg:w-[30%] lg:px-6"
            >
              <div className="flex items-center justify-between">
                <p className="text-lg font-bold">My Cart</p>
                <button
                  aria-label="Close cart"
                  onClick={onClose}
                  className="text-black transition-colors hover:text-gray-500 dark:text-gray-100"
                  data-testid="close-cart"
                >
                  <CloseIcon className="h-7" />
                </button>
              </div>

              {cart.lines.length === 0 ? (
                <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
                  <ShoppingBagIcon className="h-16" />
                  <p className="mt-6 text-center text-2xl font-bold">Your cart is empty.</p>
                </div>
              ) : null}
              {cart.lines.length !== 0 ? (
                <div className="flex h-full flex-col justify-between overflow-hidden">
                  <ul className="flex-grow overflow-auto p-6">
                    {cart.lines.map((item, i) => {
                      return (
                        <li key={i} data-testid="cart-item">
                          <div className="mb-2 flex w-full">
                            <div className="relative h-20 w-20 flex-none">
                              {item.merchandise.product.featuredImage.url && (
                                <Image
                                  alt={
                                    item.merchandise.product.featuredImage.altText ||
                                    item.merchandise.product.title
                                  }
                                  className="bg-white"
                                  fill
                                  src={item.merchandise.product.featuredImage.url}
                                />
                              )}
                            </div>
                            <div className="ml-4 flex w-full flex-col justify-between">
                              <div className="flex w-full justify-between">
                                <div>
                                  <p
                                    className="text-lg font-medium"
                                    data-testid="cart-product-name"
                                  >
                                    {item.merchandise.product.title}
                                  </p>
                                  {item.merchandise.title !== DEFAULT_OPTION ? (
                                    <p className="text-sm" data-testid="cart-product-variant">
                                      {item.merchandise.title}
                                    </p>
                                  ) : null}
                                </div>
                                <Price
                                  className="font-medium"
                                  amount={item.cost.totalAmount.amount}
                                  currencyCode={item.cost.totalAmount.currencyCode}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="mb-4 flex w-full">
                            <DeleteItemButton item={item} />
                            <div className="flex h-8 w-full border border-black/40 dark:border-white/40">
                              <div className="flex h-full items-center px-2 ">{item.quantity}</div>
                              <EditItemQuantityButton item={item} type="minus" />
                              <EditItemQuantityButton item={item} type="plus" />
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="border-t border-white/60 p-6">
                    <div className="text-sm text-white">
                      <div className="mb-2 flex items-center justify-between">
                        <p>Subtotal</p>
                        <Price
                          className="text-right"
                          amount={cart.cost.subtotalAmount.amount}
                          currencyCode={cart.cost.subtotalAmount.currencyCode}
                        />
                      </div>
                      <div className="mb-2 flex items-center justify-between">
                        <p>Taxes</p>
                        <Price
                          className="text-right"
                          amount={cart.cost.totalTaxAmount.amount}
                          currencyCode={cart.cost.totalTaxAmount.currencyCode}
                        />
                      </div>
                      <div className="mb-2 flex items-center justify-between border-b border-white/30 pb-2">
                        <p>Shipping</p>
                        <p className="text-right uppercase">calculated at checkout</p>
                      </div>
                      <div className="mb-2 flex items-center justify-between font-bold">
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
                      className="mt-6 flex w-full items-center justify-center bg-black p-3 text-sm font-medium uppercase text-white opacity-90 hover:opacity-100 dark:bg-white dark:text-black"
                    >
                      <span>Proceed to Checkout</span>
                    </a>
                  </div>
                </div>
              ) : null}
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
