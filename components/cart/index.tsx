import { fetchCart } from 'components/cart/actions';
import { getCart } from 'lib/shopware';
import { cookies } from 'next/headers';
import CartModal from './modal';

export default async function Cart() {
  const cartId = cookies().get('sw-context-token')?.value;
  await fetchCart(cartId);
  let cartIdUpdated = false;
  const cart = await getCart(cartId);

  if (!cart) {
    return null;
  }

  if (cartId !== cart.id) {
    cartIdUpdated = true;
  }
  return <CartModal cart={cart} cartIdUpdated={cartIdUpdated} />;
}
