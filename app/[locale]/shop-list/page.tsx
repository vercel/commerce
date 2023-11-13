import type { Metadata } from 'next';

import Footer from 'components/layout/footer';
import Navbar from 'components/layout/navbar';
import { SupportedLocale } from 'components/layout/navbar/language-control';
import { getCart, getPage, getProduct } from 'lib/shopify';
import { Product } from 'lib/shopify/types';
import { unstable_noStore } from 'next/cache';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import ShopListDetail from './shop-list-detail';
import ShopsNav from './shops-nav';

export async function generateMetadata({
  params
}: {
  params: { locale?: SupportedLocale };
}): Promise<Metadata> {
  unstable_noStore(); // opt out before we even get to the try/catch
  const page = await getPage({
    handle: 'shop-list',
    language: params?.locale?.toUpperCase() || 'JA'
  });

  if (!page) return notFound();

  return {
    title: page.seo?.title || page.title,
    description: page.seo?.description || page.bodySummary,
    openGraph: {
      publishedTime: page.createdAt,
      modifiedTime: page.updatedAt,
      type: 'article'
    }
  };
}

export default async function Page({ params }: { params: { locale?: SupportedLocale } }) {
  const cartId = cookies().get('cartId')?.value;
  let cart;

  if (cartId) {
    cart = await getCart(cartId);
  }

  const promotedItem: Product | undefined = await getProduct({
    handle: 'gift-bag-and-postcard-set',
    language: params?.locale?.toUpperCase() || 'JA'
  });

  return (
    <div>
      <Navbar cart={cart} locale={params?.locale} compact showTop promotedItem={promotedItem} />
      <div className="mx-auto max-w-xl px-6 pb-24 pt-12 md:pb-48 md:pt-24">
        <div className="pb-12">
          <ShopsNav />
        </div>
        <Suspense fallback={null}>
          <ShopListDetail language={params?.locale?.toUpperCase()} />
        </Suspense>
      </div>

      <Footer cart={cart} />
    </div>
  );
}
