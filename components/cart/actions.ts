'use server';

import { TAGS } from 'lib/constants';
import { ApiClientError } from '@shopware/api-client';
import { getApiClient } from 'lib/shopware/api';
import { ExtendedCart, ExtendedLineItem, messageKeys } from 'lib/shopware/api-extended';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

async function fetchCart(cartId?: string): Promise<ExtendedCart | undefined> {
  try {
    const apiClient = getApiClient(cartId);
    const cart = await apiClient.invoke('readCart get /checkout/cart?name', {});

    return cart;
  } catch (error) {
    if (error instanceof ApiClientError) {
      console.error(error);
      console.error('Details:', error.details);
    } else {
      console.error('==>', error);
    }
  }
}

export async function addItem(prevState: any, selectedVariantId: string | undefined) {
  const cart = await getCart();
  if (!cart) {
    return 'Could not get cart';
  }
  const cartId = updateCartCookie(cart);

  if (!selectedVariantId) {
    return 'Missing product variant ID';
  }

  try {
    let quantity = 1;
    const apiClient = getApiClient(cartId);

    // this part allows us to click multiple times on addToCart and increase the qty with that
    const itemInCart = cart?.lineItems?.filter((item) => item.id === selectedVariantId) as
      | ExtendedLineItem
      | undefined;
    if (itemInCart && itemInCart.quantity) {
      quantity = itemInCart.quantity + 1;
    }

    const response = await apiClient.invoke('addLineItem post /checkout/cart/line-item', {
      items: [
        {
          id: selectedVariantId,
          quantity: quantity,
          referencedId: selectedVariantId,
          type: 'product'
        }
      ]
    });

    const errorMessage = alertErrorMessages(response);
    if (errorMessage !== '') {
      return errorMessage;
    }
    revalidateTag(TAGS.cart);
  } catch (error) {
    if (error instanceof ApiClientError) {
      console.error(error);
      console.error('Details:', error.details);
    } else {
      console.error('==>', error);
    }
  }
}

export async function getCart() {
  const cartId = cookies().get('sw-context-token')?.value;

  if (cartId) {
    return await fetchCart(cartId);
  }

  return await fetchCart();
}

function updateCartCookie(cart: ExtendedCart): string | undefined {
  const cartId = cookies().get('sw-context-token')?.value;

  if (!cartId && cart && cart.token) {
    cookies().set('sw-context-token', cart.token);
    return cart.token;
  }

  if (cartId && cart && cart.token && cart.token !== cartId) {
    cookies().set('sw-context-token', cart.token);
    return cart.token;
  }

  return cartId;
}

function alertErrorMessages(response: ExtendedCart): string {
  let errorMessages: string = '';
  if (response.errors) {
    Object.values(response.errors).forEach(function (value) {
      const messageKey: messageKeys = value.messageKey as messageKeys;
      if (value.message && messageKey) {
        errorMessages += value.message;
      }
    });
  }

  return errorMessages;
}

export async function updateItemQuantity(
  prevState: any,
  payload: {
    lineId: string;
    variantId: string;
    quantity: number;
  }
) {
  const cartId = cookies().get('sw-context-token')?.value;

  if (!cartId) {
    return 'Missing cart ID';
  }

  const { lineId, variantId, quantity } = payload;

  try {
    if (quantity === 0) {
      await removeItem(null, lineId);
      revalidateTag(TAGS.cart);
      return;
    }

    await updateLineItem(lineId, variantId, quantity);
    revalidateTag(TAGS.cart);
  } catch (error) {
    if (error instanceof ApiClientError) {
      console.error(error);
      console.error('Details:', error.details);
    } else {
      return 'Error updating item quantity';
    }
  }
}

export async function removeItem(prevState: any, lineId: string) {
  const cartId = cookies().get('sw-context-token')?.value;

  if (!cartId) {
    return 'Missing cart ID';
  }

  try {
    const apiClient = getApiClient(cartId);
    await apiClient.invoke('deleteLineItem delete /checkout/cart/line-item?id[]={ids}', {
      ids: [lineId]
    });
    revalidateTag(TAGS.cart);
  } catch (error) {
    if (error instanceof ApiClientError) {
      console.error(error);
      console.error('Details:', error.details);
    } else {
      console.error('==>', error);
    }
  }
}

async function updateLineItem(lineId: string, variantId: string, quantity: number) {
  const cartId = cookies().get('sw-context-token')?.value;

  if (!cartId) {
    return { message: 'Missing cart ID' } as Error;
  }

  try {
    const apiClient = getApiClient(cartId);
    await apiClient.invoke('updateLineItem patch /checkout/cart/line-item', {
      items: [
        {
          id: lineId,
          referencedId: variantId,
          quantity: quantity
        }
      ]
    });
  } catch (error) {
    if (error instanceof ApiClientError) {
      console.error(error);
      console.error('Details:', error.details);
    } else {
      console.error('==>', error);
    }
  }
}
