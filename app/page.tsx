import { Carousel } from 'components/carousel';
import { ThreeItemGrid } from 'components/grid/three-items';

export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website'
  }
};

export default async function HomePage() {
  return (
    <>
      <ThreeItemGrid />
      <Carousel />
    </>
  );
}
