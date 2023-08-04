import { fetchCart } from 'components/cart/actions';
import { cookies } from 'next/headers';
import CartModal from './modal';
import { transformCart } from 'lib/shopware/transform';

export default async function Cart() {
  let resCart;
  const cartId = cookies().get('sw-context-token')?.value;

  if (cartId) {
    resCart = await fetchCart(cartId);
  }

  let cart;
  if (resCart) {
    cart = transformCart(resCart);
  }

  if (!cart) {
    return null;
  }

  return <CartModal cart={cart} />;
}
