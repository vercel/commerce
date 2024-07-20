'use server';

import { TAGS } from 'lib/constants';
import { addToCart, createCart, getCart, removeFromCart, updateCart } from 'lib/shopify';
import { Store } from 'lib/shopify/types';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

export async function addItem(
  prevState: any,
  payload: { selectedVariantId: string | undefined; store: Store }
) {
  let cartId = cookies().get('cartId')?.value;
  let cart;

  if (cartId) {
    cart = await getCart(payload.store, cartId);
  }

  if (!cartId || !cart) {
    cart = await createCart(payload.store);
    cartId = cart.id;
    cookies().set('cartId', cartId);
  }

  if (!payload.selectedVariantId) {
    return 'Missing product variant ID';
  }

  try {
    await addToCart(payload.store, cartId, [
      { merchandiseId: payload.selectedVariantId, quantity: 1 }
    ]);
    revalidateTag(TAGS.cart);
  } catch (e) {
    return 'Error adding item to cart';
  }
}

export async function removeItem(prevState: any, payload: { lineId: string; store: Store }) {
  const cartId = cookies().get('cartId')?.value;

  if (!cartId) {
    return 'Missing cart ID';
  }

  try {
    await removeFromCart(payload.store, cartId, [payload.lineId]);
    revalidateTag(TAGS.cart);
  } catch (e) {
    return 'Error removing item from cart';
  }
}

export async function updateItemQuantity(
  prevState: any,
  payload: {
    lineId: string;
    variantId: string;
    quantity: number;
    store: Store;
  }
) {
  const cartId = cookies().get('cartId')?.value;

  if (!cartId) {
    return 'Missing cart ID';
  }

  const { lineId, variantId, quantity, store } = payload;

  try {
    if (quantity === 0) {
      await removeFromCart(store, cartId, [lineId]);
      revalidateTag(TAGS.cart);
      return;
    }

    await updateCart(store, cartId, [
      {
        id: lineId,
        merchandiseId: variantId,
        quantity
      }
    ]);
    revalidateTag(TAGS.cart);
  } catch (e) {
    return 'Error updating item quantity';
  }
}
