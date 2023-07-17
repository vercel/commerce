import { getCart } from 'lib/shopify';
import { cookies } from 'next/headers';
import { Suspense } from 'react';
import CartModal from './modal';
import OpenCart from './open-cart';

export default async function Cart() {
  const cartId = cookies().get('cartId')?.value;
  let cart;

  if (cartId) {
    cart = await getCart(cartId);
  }

  return (
    <Suspense fallback={<OpenCart className="h-6" />}>
      <CartModal cart={cart} />
    </Suspense>
  );
}
