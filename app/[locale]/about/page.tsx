import Footer from 'components/layout/footer';
import { SupportedLocale } from 'components/layout/navbar/language-control';

import Navbar from 'components/layout/navbar';
import { getCart, getPage, getProduct } from 'lib/shopify';
import { Product } from 'lib/shopify/types';
import { cookies } from 'next/headers';
import AboutNaraiDetail from './about-narai-detail';

const { SITE_NAME } = process.env;

export const metadata = {
  title: SITE_NAME,
  description: SITE_NAME,
  openGraph: {
    type: 'website'
  }
};

export default async function Page({ params }: { params: { locale?: SupportedLocale } }) {
  const cartId = cookies().get('cartId')?.value;
  let cart;

  if (cartId) {
    cart = await getCart(cartId);
  }

  const promotedItem: Product | undefined = await getProduct({
    handle: 'gift-bag-and-postcard-set',
    language: params?.locale?.toUpperCase()
  });

  const awardsPage = await getPage({ handle: 'awards', language: params?.locale?.toUpperCase() });

  return (
    <div>
      <Navbar cart={cart} locale={params?.locale} compact promotedItem={promotedItem} />
      <div className="pt-24 md:pt-32">
        <AboutNaraiDetail awards={awardsPage.body} />
      </div>

      <Footer cart={cart} />
    </div>
  );
}
