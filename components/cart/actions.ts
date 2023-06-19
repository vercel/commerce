'use server';

import { addToCart, removeFromCart, updateCart } from 'lib/shopify';
import { cookies } from 'next/headers';

export const addItem = async (variantId: string | undefined): Promise<Error | undefined> => {
  const cartId = cookies().get('cartId')?.value;

  if (!cartId || !variantId) {
    return new Error('Missing cartId or variantId');
  }
  try {
    await addToCart(cartId, [{ merchandiseId: variantId, quantity: 1 }]);
  } catch (e) {
    return new Error('Error adding item', { cause: e });
  }
};

export const removeItem = async (lineId: string): Promise<Error | undefined> => {
  const cartId = cookies().get('cartId')?.value;

  if (!cartId) {
    return new Error('Missing cartId');
  }
  try {
    await removeFromCart(cartId, [lineId]);
  } catch (e) {
    return new Error('Error removing item', { cause: e });
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
}): Promise<Error | undefined> => {
  const cartId = cookies().get('cartId')?.value;

  if (!cartId) {
    return new Error('Missing cartId');
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
    return new Error('Error updating item quantity', { cause: e });
  }
};
