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

  let newToken;
  if (!cartId && !resCart) {
    resCart = await fetchCart();
    if (resCart?.token) {
      newToken = resCart?.token;
    }
  }

  let cart;
  if (resCart) {
    cart = transformCart(resCart);
  }

  if (!cart) {
    return null;
  }

  let cartIdUpdated = false;
  if (cartId !== newToken) {
    cartIdUpdated = true;
  }

  return <CartModal cart={cart} cartIdUpdated={cartIdUpdated} />;
}
