import { CarouselPrints } from 'components/carouselPrints';
import { HomepageShirts } from 'components/grid/homepageShirts';
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
      <HomepageShirts />
      <Suspense>
        <CarouselPrints />
        <Suspense>
          <Footer />
        </Suspense>
      </Suspense>
    </>
  );
}
