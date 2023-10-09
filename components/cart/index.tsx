import { SupportedLocale } from 'components/layout/navbar/language-control';
import { getCart, getProduct } from 'lib/shopify';
import { Product } from 'lib/shopify/types';
import { cookies } from 'next/headers';
import CartModal from './modal';

export default async function Cart({ locale }: { locale?: SupportedLocale }) {
  const cartId = cookies().get('cartId')?.value;
  let cart;

  if (cartId) {
    cart = await getCart(cartId);
  }

  const promotedItem: Product | undefined = await getProduct({
    handle: 'gift-bag-and-postcard-set',
    language: locale?.toUpperCase() || 'JA'
  });

  return <CartModal cart={cart} promotedItem={promotedItem} />;
}
