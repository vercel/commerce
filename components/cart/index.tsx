import { SupportedLocale } from 'components/layout/navbar/language-control';
import { getCart } from 'lib/shopify';
import { cookies } from 'next/headers';
import CartModal from './modal';

export default async function Cart({ locale }: { locale?: SupportedLocale }) {
  const cartId = cookies().get('cartId')?.value;
  let cart;

  if (cartId) {
    cart = await getCart({ cartId, language: locale?.toUpperCase() });
  }

  return <CartModal cart={cart} />;
}
