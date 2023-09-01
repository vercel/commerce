import Footer from 'components/layout/footer';
import { SupportedLocale } from 'components/layout/navbar/language-control';

import Navbar from 'components/layout/navbar';
import { getCart, getProduct } from 'lib/shopify';
import { Product } from 'lib/shopify/types';
import { cookies } from 'next/headers';
import { Suspense } from 'react';
import ConceptDetail from './concept-detail';

export const runtime = 'edge';
export const revalidate = 43200; // 12 hours in seconds

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

  return (
    <div>
      <Navbar cart={cart} locale={params?.locale} compact promotedItem={promotedItem} />
      <div className="pt-12">
        <ConceptDetail />
      </div>

      <Suspense>
        <Footer cart={cart} />
      </Suspense>
    </div>
  );
}
