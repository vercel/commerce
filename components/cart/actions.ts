"use server";

import { TAGS } from "lib/constants";
import { revalidateTag } from "next/cache";
import { RequestCookies } from "next/dist/server/web/spec-extension/cookies";
import { cookies } from "next/headers";

export interface CartItem {
  id: string;
  quantity: number;
}

const CART_COOKIE = "cart";

const getCartFromCookie = (): CartItem[] => {
  const cookieStore = cookies() as unknown as RequestCookies;
  const cartCookie = cookieStore.get(CART_COOKIE)?.value;
  return cartCookie ? JSON.parse(cartCookie) : [];
};

const setCartCookie = (cart: CartItem[]) => {
  const cookieStore = cookies() as unknown as RequestCookies;
  cookieStore.set(CART_COOKIE, JSON.stringify(cart));
};

export const addToCart = async (productId: string) => {
  const cart = getCartFromCookie();

  const existingItem = cart.find((item) => item.id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ id: productId, quantity: 1 });
  }

  setCartCookie(cart);
  return cart;
};

export const removeFromCart = async (productId: string) => {
  const cart = getCartFromCookie();
  const updatedCart = cart.filter((item) => item.id !== productId);
  setCartCookie(updatedCart);
  return updatedCart;
};

export const updateCartItemQuantity = async (
  productId: string,
  quantity: number
) => {
  const cart = getCartFromCookie();

  const item = cart.find((item) => item.id === productId);
  if (item) {
    item.quantity = quantity;
  }

  const updatedCart = cart.filter((item) => item.quantity > 0);
  setCartCookie(updatedCart);
  return updatedCart;
};

export const getCart = async (): Promise<CartItem[]> => {
  return getCartFromCookie();
};

export async function addItem(selectedVariantId: string | undefined) {
  if (!selectedVariantId) {
    return "Missing product variant ID";
  }

  try {
    await addToCart(selectedVariantId);
    revalidateTag(TAGS.cart);
  } catch (e) {
    return "Error adding item to cart";
  }
}

export async function removeItem(merchandiseId: string | undefined) {
  if (!merchandiseId) {
    return "Missing product ID";
  }

  try {
    const cart = await getCart();

    const lineItem = cart.find((line) => line.id === merchandiseId);

    if (lineItem) {
      await removeFromCart(merchandiseId);
      revalidateTag(TAGS.cart);
    } else {
      return "Item not found in cart";
    }
  } catch (e) {
    return "Error removing item from cart";
  }
}

export async function updateItemQuantity(
  merchandiseId: string | undefined,
  quantity: number
) {
  if (!merchandiseId) {
    return "Missing product ID";
  }

  try {
    const cart = await getCart();

    const lineItem = cart.find((line) => line.id === merchandiseId);

    if (lineItem) {
      if (quantity === 0) {
        await removeFromCart(merchandiseId);
      } else {
        await updateCartItemQuantity(merchandiseId, quantity);
      }
    } else if (quantity > 0) {
      await addToCart(merchandiseId);
    }

    revalidateTag(TAGS.cart);
  } catch (e) {
    return "Error updating item quantity";
  }
}
