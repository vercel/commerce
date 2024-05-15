import { Carousel } from 'components/carousel';
import YMMFilters, { YMMFiltersPlaceholder } from 'components/filters';
import { ThreeItemGrid } from 'components/grid/three-items';
import Footer from 'components/layout/footer';
import { Suspense } from 'react';

export const runtime = 'edge';

export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website'
  }
};

export default async function HomePage() {
  return (
    <>
      <section className="mx-auto max-w-screen-2xl px-4 pb-4">
        <Suspense fallback={<YMMFiltersPlaceholder />}>
          <YMMFilters />
        </Suspense>
      </section>
      <ThreeItemGrid />
      <Suspense>
        <Carousel />
        <Suspense>
          <Footer />
        </Suspense>
      </Suspense>
    </>
  );
}
