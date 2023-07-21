'use server';

import { requestAddToCart, requestCart } from 'lib/shopware/api';
import { cookies } from 'next/headers';
export const fetchCart = async (cartId?: string) => {
  await requestCart(cartId);
};

export const addItem = async (variantId: string | undefined): Promise<Error | undefined> => {
  const cartId = cookies().get('sw-context-token')?.value || '';

  if (!variantId) {
    return new Error('Missing cartId or variantId');
  }
  try {
    await requestAddToCart(variantId, cartId);
  } catch (e) {
    console.error('eeeee', e);
    return new Error('Error adding item', { cause: e });
  }
};

export const removeItem = async (lineId: string): Promise<Error | undefined> => {
  const cartId = cookies().get('cartId')?.value;

  if (!cartId) {
    return new Error('Missing cartId');
  }
  try {
    console.log('removeItem lineId', lineId);
    //await removeFromCart(cartId, [lineId]);
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
    console.log('lineId', lineId);
    console.log('variantId', variantId);
    console.log('quantity', quantity);
    // await updateCart(cartId, [
    //   {
    //     id: lineId,
    //     merchandiseId: variantId,
    //     quantity
    //   }
    // ]);
  } catch (e) {
    return new Error('Error updating item quantity', { cause: e });
  }
};
