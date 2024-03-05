import { getCart } from 'lib/shopify';
import { cookies } from 'next/headers';
import CartModal from './modal';
import type { Cart } from 'lib/shopify/types';

export default async function Cart() {
  const cartId = cookies().get('cartId')?.value;
  let cart;

  if (cartId) {
    cart = (await getCart(cartId)) as Cart;
    //pass logged_in true to shopify checout to utilize customer api
    //see: https://shopify.dev/docs/api/customer#step-stay-authenticated-on-checkout
    const newCheckoutUrl = new URL(cart?.checkoutUrl || '');
    newCheckoutUrl.searchParams.append('logged_in', 'true');
    cart = {
      ...cart,
      checkoutUrl: newCheckoutUrl.toString()
    };
    return <CartModal cart={cart} />;
  } else {
    return <CartModal cart={cart} />;
  }
}
