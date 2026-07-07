"use server";

import { TAGS } from "lib/constants";
import {
  addToCart,
  createCart,
  getCart,
  removeFromCart,
  updateCart,
} from "lib/shopify";
import { updateTag } from "next/cache";
import { cookies } from "next/headers";

export async function addItem(
  prevState: any,
  selectedVariantId: string | undefined,
) {
  if (!selectedVariantId) {
    return "Error adding item to cart";
  }

  try {
    await addToCart([{ merchandiseId: selectedVariantId, quantity: 1 }]);
    updateTag(TAGS.cart);
  } catch (e) {
    return "Error adding item to cart";
  }
}

export async function removeItem(prevState: any, merchandiseId: string) {
  try {
    const cart = await getCart();

    if (!cart) {
      return "Error fetching cart";
    }

    const lineItem = cart.lines.find(
      (line) => line.merchandise.id === merchandiseId,
    );

    if (lineItem && lineItem.id) {
      await removeFromCart([lineItem.id]);
      updateTag(TAGS.cart);
    } else {
      return "Item not found in cart";
    }
  } catch (e) {
    return "Error removing item from cart";
  }
}

export async function updateItemQuantity(
  prevState: any,
  payload: {
    merchandiseId: string;
    quantity: number;
  },
) {
  const { merchandiseId, quantity } = payload;

  try {
    const cart = await getCart();

    if (!cart) {
      return "Error fetching cart";
    }

    const lineItem = cart.lines.find(
      (line) => line.merchandise.id === merchandiseId,
    );

    if (lineItem && lineItem.id) {
      if (quantity === 0) {
        await removeFromCart([lineItem.id]);
      } else {
        await updateCart([
          {
            id: lineItem.id,
            merchandiseId,
            quantity,
          },
        ]);
      }
    } else if (quantity > 0) {
      // If the item doesn't exist in the cart and quantity > 0, add it
      await addToCart([{ merchandiseId, quantity }]);
    }

    updateTag(TAGS.cart);
  } catch (e) {
    console.error(e);
    return "Error updating item quantity";
  }
}

/**
 * Checkout handoff, step 1 of 2. Re-reads the cart from Shopify — server
 * actions from one client run serialized, so any in-flight line mutations
 * have already landed — and returns the secure, single-use `checkoutUrl`
 * minted by the Cart API. The client component then executes the redirect
 * (`window.location.href`) to hand the customer to Shopify's payment vault.
 *
 * Post-payment return to our `/success` page is configured on the Shopify
 * side (Headless channel storefront URL / checkout customization), not per
 * request — the Cart API has no redirect-URL input.
 */
export async function getCheckoutUrl(): Promise<string | undefined> {
  const cart = await getCart();

  if (!cart || cart.lines.length === 0) {
    return undefined;
  }

  return cart.checkoutUrl;
}

export async function createCartAndSetCookie() {
  try {
    const cart = await createCart();

    if (!cart.id) {
      return;
    }

    (await cookies()).set("cartId", cart.id, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
  } catch (e) {
    // Shopify unreachable or not configured; the shopper just browses
    // without a cart until it becomes available.
    console.error("Unable to create cart", e);
  }
}

/**
 * Called from `/success`: Shopify nulls a cart once its checkout completes,
 * so drop the stale cookie and invalidate the cached cart. The next
 * add-to-cart mints a fresh cart.
 */
export async function clearCartCookie() {
  (await cookies()).delete("cartId");
  updateTag(TAGS.cart);
}
