'use server';

import { TAGS } from 'lib/constants';
import { addToCart, createCart, getCart, removeFromCart, updateCart } from 'lib/shopify';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

export async function addItem(prevState: any, selectedVariantId: string | undefined) {
  let cartId = cookies().get('cartId')?.value;
  let cart;

  if (cartId) {
    cart = await getCart(cartId);
  }

  if (!cartId || !cart) {
    cart = await createCart();
    cartId = cart.id;
    cookies().set('cartId', cartId);
  }

  if (!selectedVariantId) {
    return 'Missing product variant ID';
  }

  try {
    await addToCart(cartId, [{ merchandiseId: selectedVariantId, quantity: 1 }]);
    revalidateTag(TAGS.cart);
  } catch (e) {
    return 'Error adding item to cart';
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

export async function calculateDiscounts(cart: any) {
  const discountGroups = [
    {
      name: 'Tier 2',
      discount: {
        amount: 0.1,
        minimumSpent: 150
      }
    },
    {
      name: 'Tier 1',
      discount: {
        amount: 0.05,
        minimumSpent: 120
      }
    }
  ];

  const subTotal = cart?.cost.subtotalAmount.amount;
  const currencyCode = cart?.cost.subtotalAmount.currencyCode;

  const discountGroupsSorted = discountGroups.sort(
    (a, b) => a.discount.minimumSpent - b.discount.minimumSpent
  );
  const minSpent = Math.max(...discountGroupsSorted.map((group) => group.discount.minimumSpent));
  const eligibleDiscount = discountGroupsSorted.filter(
    (group) => subTotal >= group.discount.minimumSpent
  );
  const finalDiscount = eligibleDiscount.length
    ? Math.max(...eligibleDiscount.map((group) => group.discount.amount))
    : 0;
  const closestNextTier = discountGroupsSorted
    .filter((group) => group.discount.minimumSpent > subTotal)
    .shift();

  const spentToNextDiscount = closestNextTier
    ? closestNextTier?.discount.minimumSpent - subTotal
    : 0;
  const nextDiscount = closestNextTier?.discount.amount;
  const discountAmount = finalDiscount ? finalDiscount * 100 : 0;

  return {
    discountAmount,
    spentToNextDiscount,
    nextDiscount,
    discountGroups: discountGroupsSorted,
    minSpent,
    subTotal,
    currencyCode
  };
}
