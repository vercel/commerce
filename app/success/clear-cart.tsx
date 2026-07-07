"use client";

import { clearCartCookie } from "components/cart/actions";
import { useEffect } from "react";

/**
 * Shopify nulls the cart once its checkout completes, so on arrival from
 * checkout we drop the stale cart cookie. The next add-to-cart mints a
 * fresh cart.
 */
export function ClearCart() {
  useEffect(() => {
    clearCartCookie();
  }, []);

  return null;
}
