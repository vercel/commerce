"use server";

import { createCheckout } from "@/lib/rapyd/checkout";
import { getProductById } from "@/lib/store/products";
import { TAGS } from "lib/constants";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface Cart {
  id: string;
}

export interface CartItem {
  id: string;
  quantity: number;
  amount: number;
}

const CART_COOKIE = "cart";

const getCartFromCookie = async (): Promise<CartItem[]> => {
  const cookieStore = await cookies();
  const cartCookie = cookieStore.get(CART_COOKIE)?.value;
  return cartCookie ? JSON.parse(cartCookie) : [];
};

const setCartCookie = async (cart: CartItem[]) => {
  const cookieStore = await cookies();
  cookieStore.set(CART_COOKIE, JSON.stringify(cart));
};

export const addToCart = async (productId: string) => {
  const cart = await getCartFromCookie();
  const product = await getProductById({ id: productId });

  const existingItem = cart.find((item) => item.id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: productId,
      quantity: 1,
      amount: parseFloat(product?.variants[0]?.price.amount ?? "0"),
    });
  }

  await setCartCookie(cart);
  return cart;
};

export const removeFromCart = async (productId: string) => {
  const cart = await getCartFromCookie();
  const updatedCart = cart.filter((item) => item.id !== productId);
  await setCartCookie(updatedCart);
  return updatedCart;
};

export const updateCartItemQuantity = async (
  productId: string,
  quantity: number
) => {
  const cart = await getCartFromCookie();

  const item = cart.find((item) => item.id === productId);
  if (item) {
    item.quantity = quantity;
  }

  const updatedCart = cart.filter((item) => item.quantity > 0);
  await setCartCookie(updatedCart);
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

export async function createCart() {
  const cart = {
    id: crypto.randomUUID(),
  };

  return cart;
}

export async function createCartAndSetCookie() {
  let cart = await createCart();
  (await cookies()).set("cartId", cart.id!);
}

export async function redirectToCheckout() {
  let cart = await getCart();
  const totalAmount = cart.reduce(
    (acc, item) => acc + item.quantity * item.amount,
    0
  );

  const checkout = await createCheckout({
    amount: totalAmount,
    description: "Cart",
    merchantReferenceId: crypto.randomUUID(),
    completeCheckoutUrl: process.env.NEXT_PUBLIC_APP_URL + "/order-successful",
    cancelCheckoutUrl: process.env.NEXT_PUBLIC_APP_URL + "/order-error",
  });

  redirect(checkout.redirect_url);
}
