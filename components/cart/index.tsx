import { getCart } from 'lib/shopware';
import { cookies } from 'next/headers';
import CartModal from './modal';

export default async function Cart() {
  const cartId = cookies().get('sw-context-token')?.value;
  let cartIdUpdated = true;
  const cart = await getCart();

  if (cartId !== cart.id) {
    cartIdUpdated = true;
  }
  return <CartModal cart={cart} cartIdUpdated={cartIdUpdated} />;
}
