import { Carousel } from 'components/carousel';
import { ThreeItemGrid } from 'components/grid/three-items';
import Footer from 'components/layout/footer';

export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website'
  }
};

export default function HomePage({ searchParams }: { searchParams: { currency?: string } }) {
  const currency = searchParams.currency || 'USD';

  return (
    <>
      <ThreeItemGrid currency={currency} />
      <Carousel currency={currency}/>
      <Footer />
    </>
  );
}
