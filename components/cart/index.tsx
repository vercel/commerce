import { getCart } from 'components/cart/actions';
import CartModal from './modal';
import { transformCart } from 'lib/shopware/transform';

export default async function Cart() {
  let cart;
  const resCart = await getCart();

  if (resCart) {
    cart = transformCart(resCart);
  }

  if (!cart) {
    return null;
  }

  return <CartModal cart={cart} />;
}
