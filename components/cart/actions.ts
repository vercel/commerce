'use server';

import { addToCart, createCart, getCart, removeFromCart, updateCart } from 'lib/shopify';
import { cookies } from 'next/headers';

export const addItem = async (
  variantId: string | undefined,
  country?: string,
  language?: string
): Promise<String | undefined> => {
  let cartId = cookies().get('cartId')?.value;
  let cart;

  if (cartId) {
    cart = await getCart({ cartId, country, language });
  }

  if (!cartId || !cart) {
    cart = await createCart({ country, language });
    cartId = cart.id;
    cookies().set('cartId', cartId);
  }

  if (!variantId) {
    return 'Missing product variant ID';
  }

  try {
    await addToCart(cartId, [{ merchandiseId: variantId, quantity: 1 }], country, language);
  } catch (e) {
    return 'Error adding item to cart';
  }
};

export const addItems = async ({
  variantId,
  quantity = 1,
  country,
  language
}: {
  variantId: string | undefined;
  quantity: number;
  country?: string;
  language?: string;
}): Promise<String | undefined> => {
  let cartId = cookies().get('cartId')?.value;
  let cart;

  if (cartId) {
    cart = await getCart({ cartId, country, language });
  }

  if (!cartId || !cart) {
    cart = await createCart({ country, language });
    cartId = cart.id;
    cookies().set('cartId', cartId);
  }

  if (!variantId) {
    return 'Missing product variant ID';
  }

  try {
    await addToCart(cartId, [{ merchandiseId: variantId, quantity }], country, language);
  } catch (e) {
    return quantity === 1 ? 'Error adding item to cart' : 'Error adding items to cart';
  }
};

export const removeItem = async (lineId: string): Promise<String | undefined> => {
  const cartId = cookies().get('cartId')?.value;

  if (!cartId) {
    return 'Missing cart ID';
  }
  try {
    await removeFromCart(cartId, [lineId]);
  } catch (e) {
    return 'Error removing item from cart';
  }
};

export const updateItemQuantity = async ({
  lineId,
  variantId,
  quantity
}: {
  lineId: string;
  variantId: string;
  quantity: number;
}): Promise<String | undefined> => {
  const cartId = cookies().get('cartId')?.value;

  if (!cartId) {
    return 'Missing cart ID';
  }
  try {
    await updateCart(cartId, [
      {
        id: lineId,
        merchandiseId: variantId,
        quantity
      }
    ]);
  } catch (e) {
    return 'Error updating item quantity';
  }
};
