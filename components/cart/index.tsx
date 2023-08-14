import { getCart } from 'lib/shopify';
import { cookies } from 'next/headers';
import CartModal from './modal';

export default async function Cart() {
  // const cartId = cookies().get('cartId')?.value;
  const cartId = '1';
  let cart;

  if (cartId) {
    cart = await getCart(cartId);
  }

  return <CartModal cart={cart} />;
}
