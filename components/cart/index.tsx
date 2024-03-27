import { getCart } from 'lib/shopify';
import { cookies } from 'next/headers';
import { calculateDiscounts } from './actions';
import CartModal from './modal';

export default async function Cart() {
  const cartId = cookies().get('cartId')?.value;
  let cart;
  let tieredDiscounts;
  if (cartId) {
    cart = await getCart(cartId);
    tieredDiscounts = await calculateDiscounts(cart);
  }

  return <CartModal cart={cart} tieredDiscount={tieredDiscounts} />;
}
