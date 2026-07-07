"use client";

import { ShoppingCartIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Price from "components/price";
import { DEFAULT_OPTION } from "lib/constants";
import { createUrl } from "lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createCartAndSetCookie } from "./actions";
import { useCart } from "./cart-context";
import { CheckoutButton } from "./checkout-button";
import { DeleteItemButton } from "./delete-item-button";
import { EditItemQuantityButton } from "./edit-item-quantity-button";
import OpenCart from "./open-cart";

type MerchandiseSearchParams = {
  [key: string]: string;
};

/**
 * Sidebar drawer cart built on native primitives: fixed-position panel with
 * CSS transforms, `inert` while closed, Escape-to-close, backdrop click,
 * and body scroll locking. Opens automatically when an item is added.
 */
export default function CartModal() {
  const { cart, updateCartItem } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const quantityRef = useRef(cart?.totalQuantity);
  const panelRef = useRef<HTMLDivElement>(null);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  useEffect(() => {
    if (!cart) {
      createCartAndSetCookie();
    }
  }, [cart]);

  useEffect(() => {
    if (
      cart?.totalQuantity &&
      cart?.totalQuantity !== quantityRef.current &&
      cart?.totalQuantity > 0
    ) {
      if (!isOpen) {
        setIsOpen(true);
      }
      quantityRef.current = cart?.totalQuantity;
    }
  }, [isOpen, cart?.totalQuantity, quantityRef]);

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <button aria-label="Open cart" aria-expanded={isOpen} onClick={openCart}>
        <OpenCart quantity={cart?.totalQuantity} />
      </button>
      <div
        aria-hidden="true"
        onClick={closeCart}
        className={`fixed inset-0 z-40 bg-night/70 backdrop-blur-[2px] transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        tabIndex={-1}
        inert={!isOpen}
        className={`fixed top-0 right-0 bottom-0 z-50 flex h-full w-full flex-col border-l border-seam bg-night p-6 transition-transform duration-300 ease-in-out md:w-[420px] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-seam pb-4">
          <div>
            <p className="font-display text-lg font-bold tracking-[0.2em] uppercase">
              Your Pack
            </p>
            <p className="mt-1 font-mono text-[10px] tracking-[0.3em] text-bone/40 uppercase">
              {cart?.totalQuantity || 0}{" "}
              {cart?.totalQuantity === 1 ? "item" : "items"} loaded
            </p>
          </div>
          <button aria-label="Close cart" onClick={closeCart}>
            <CloseCart />
          </button>
        </div>

        {!cart || cart.lines.length === 0 ? (
          <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
            <span className="flex h-16 w-16 items-center justify-center border border-seam bg-coal">
              <ShoppingCartIcon className="h-7 text-bone/60" />
            </span>
            <p className="font-display mt-6 text-center text-2xl font-bold tracking-[0.14em] uppercase">
              Pack is empty
            </p>
            <Link
              href="/search"
              onClick={closeCart}
              className="mt-4 font-mono text-xs tracking-[0.25em] text-field uppercase hover:text-bone"
            >
              Load up →
            </Link>
          </div>
        ) : (
          <div className="flex h-full flex-col justify-between overflow-hidden">
            <ul className="grow overflow-auto py-4">
              {cart.lines
                .sort((a, b) =>
                  a.merchandise.product.title.localeCompare(
                    b.merchandise.product.title,
                  ),
                )
                .map((item, i) => {
                  const merchandiseSearchParams =
                    {} as MerchandiseSearchParams;

                  item.merchandise.selectedOptions.forEach(
                    ({ name, value }) => {
                      if (value !== DEFAULT_OPTION) {
                        merchandiseSearchParams[name.toLowerCase()] = value;
                      }
                    },
                  );

                  const merchandiseUrl = createUrl(
                    `/product/${item.merchandise.product.handle}`,
                    new URLSearchParams(merchandiseSearchParams),
                  );

                  return (
                    <li key={i} className="flex w-full flex-col border-b border-seam">
                      <div className="relative flex w-full flex-row justify-between px-1 py-4">
                        <div className="absolute z-40 -mt-2 -ml-1">
                          <DeleteItemButton
                            item={item}
                            optimisticUpdate={updateCartItem}
                          />
                        </div>
                        <div className="flex flex-row">
                          <div className="relative h-16 w-16 overflow-hidden border border-seam bg-coal">
                            <Image
                              className="h-full w-full object-cover"
                              width={64}
                              height={64}
                              alt={
                                item.merchandise.product.featuredImage
                                  ?.altText || item.merchandise.product.title
                              }
                              src={item.merchandise.product.featuredImage?.url}
                            />
                          </div>
                          <Link
                            href={merchandiseUrl}
                            onClick={closeCart}
                            className="z-30 ml-3 flex flex-row space-x-4"
                          >
                            <div className="flex flex-1 flex-col">
                              <span className="font-display text-sm font-semibold tracking-[0.12em] uppercase">
                                {item.merchandise.product.title}
                              </span>
                              {item.merchandise.title !== DEFAULT_OPTION ? (
                                <p className="mt-1 font-mono text-[10px] tracking-[0.2em] text-field uppercase">
                                  {item.merchandise.title}
                                </p>
                              ) : null}
                              {item.merchandise.sku ? (
                                <p className="mt-1 font-mono text-[10px] tracking-[0.2em] text-bone/35 uppercase">
                                  SKU {item.merchandise.sku}
                                </p>
                              ) : null}
                            </div>
                          </Link>
                        </div>
                        <div className="flex h-16 flex-col justify-between">
                          <Price
                            className="flex justify-end space-y-2 text-right font-mono text-sm"
                            amount={item.cost.totalAmount.amount}
                            currencyCode={item.cost.totalAmount.currencyCode}
                          />
                          <div className="ml-auto flex h-9 flex-row items-center border border-seam">
                            <EditItemQuantityButton
                              item={item}
                              type="minus"
                              optimisticUpdate={updateCartItem}
                            />
                            <p className="w-6 text-center">
                              <span className="w-full font-mono text-sm">
                                {item.quantity}
                              </span>
                            </p>
                            <EditItemQuantityButton
                              item={item}
                              type="plus"
                              optimisticUpdate={updateCartItem}
                            />
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
            </ul>
            <div className="py-4 font-mono text-xs tracking-[0.12em] text-bone/50 uppercase">
              <div className="mb-3 flex items-center justify-between border-b border-seam pb-2">
                <p>Taxes</p>
                <Price
                  className="text-right text-sm text-bone"
                  amount={cart.cost.totalTaxAmount.amount}
                  currencyCode={cart.cost.totalTaxAmount.currencyCode}
                />
              </div>
              <div className="mb-3 flex items-center justify-between border-b border-seam pt-1 pb-2">
                <p>Shipping</p>
                <p className="text-right">At checkout</p>
              </div>
              <div className="mb-3 flex items-center justify-between border-b border-seam pt-1 pb-2">
                <p className="text-bone">Total</p>
                <Price
                  className="text-right text-base font-semibold text-bone"
                  amount={cart.cost.totalAmount.amount}
                  currencyCode={cart.cost.totalAmount.currencyCode}
                />
              </div>
            </div>
            <CheckoutButton />
            <p className="mt-3 text-center font-mono text-[10px] tracking-[0.25em] text-bone/35 uppercase">
              Secure checkout — powered by Shopify
            </p>
          </div>
        )}
      </div>
    </>
  );
}

function CloseCart({ className }: { className?: string }) {
  return (
    <div className="relative flex h-11 w-11 items-center justify-center border border-seam text-bone transition-colors">
      <XMarkIcon
        className={`h-6 transition-all ease-in-out hover:scale-110 ${className || ""}`}
      />
    </div>
  );
}
