import { getCart } from 'lib/shopify';
import { Store } from 'lib/shopify/types';
import { cookies } from 'next/headers';
import CartModal from './modal';

export default async function Cart(store: Store) {
  const cartId = cookies().get('cartId')?.value;
  let cart;

  if (cartId) {
    cart = await getCart(store, cartId);
  }

  return <CartModal cart={cart} store={store} />;
}
