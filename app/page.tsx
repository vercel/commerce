import { Carousel } from 'components/carousel';
import { ThreeItemGrid } from 'components/grid/three-items';
import Footer from 'components/layout/footer';
import { Suspense } from 'react';

export const runtime = 'edge';

export const revalidate = parseInt(process.env.REVALIDATE_WINDOW ?? `${60 * 60 * 12}`); // 12 hours

export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and Medusa.',
  openGraph: {
    images: [
      {
        url: `/api/og?title=${encodeURIComponent(process.env.SITE_NAME || '')}`,
        width: 1200,
        height: 630
      }
    ],
    type: 'website'
  }
};

export default async function HomePage() {
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <ThreeItemGrid />
      <Suspense>
        {/* @ts-expect-error Server Component */}
        <Carousel />
        <Suspense>
          {/* @ts-expect-error Server Component */}
          <Footer />
        </Suspense>
      </Suspense>
    </>
  );
}
