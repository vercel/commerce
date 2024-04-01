'use server';

import { TAGS } from 'lib/constants';
import { addToCart, createCart, getCart, removeFromCart, updateCart } from 'lib/shopify';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { ShopifyAnalyticsProduct } from '@shopify/hydrogen-react';
import { productToAnalytics } from '../../lib/utils';

type AddItemResponse = {
  cartId?: string;
  success: boolean;
  message?: string;
  products?: ShopifyAnalyticsProduct[];
};

export async function addItem(
  prevState: any,
  selectedVariantId: string | undefined
): Promise<AddItemResponse> {
  let cartId = cookies().get('cartId')?.value;
  let cart;
  const quantity = 1;

  if (cartId) {
    cart = await getCart(cartId);
  }

  if (!cartId || !cart) {
    cart = await createCart();
    cartId = cart.id;
    cookies().set('cartId', cartId);
  }

  if (!selectedVariantId) {
    return { success: false, message: 'Missing product variant ID' };
  }

  try {
    const response = await addToCart(cartId, [{ merchandiseId: selectedVariantId, quantity }]);
    revalidateTag(TAGS.cart);
    return {
      success: true,
      message: 'Item added to cart',
      cartId,
      products: productToAnalytics(response.lines, quantity, selectedVariantId)
    };
  } catch (e) {
    return { success: false, message: 'Error adding item to cart' };
  }
}

export async function removeItem(prevState: any, lineId: string) {
  const cartId = cookies().get('cartId')?.value;

  if (!cartId) {
    return 'Missing cart ID';
  }

  try {
    await removeFromCart(cartId, [lineId]);
    revalidateTag(TAGS.cart);
    return {
      success: true,
      cartId
    };
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
  }
) {
  const cartId = cookies().get('cartId')?.value;

  if (!cartId) {
    return 'Missing cart ID';
  }

  const { lineId, variantId, quantity } = payload;

  try {
    if (quantity === 0) {
      await removeFromCart(cartId, [lineId]);
      revalidateTag(TAGS.cart);
      return;
    }

    await updateCart(cartId, [
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
