import { Carousel } from 'components/carousel';
import { CollectionsGrid } from 'components/grid/collections-grid';
import { ThreeItemGrid } from 'components/grid/three-items';
import Footer from 'components/layout/footer';

export const metadata = {
  description:
    'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website'
  }
};

// Configure which collections to display on the homepage
// Replace these handles with your actual Shopify collection handles
const HOMEPAGE_COLLECTIONS = [
  { handle: 'custom-rosettes-1', label: 'Custom Rosettes' },
  { handle: 'custom-award-ribbons', label: 'Custom Award Ribbons' },
  { handle: 'custom-silver-awards', label: 'Custom Silver Awards' },
  { handle: 'custom-trophies-1', label: 'Custom Trophies' },
  { handle: 'custom-trophies', label: 'Custom Award Medals' },
  { handle: 'custom-ribbon-rolls', label: 'Custom Ribbon Rolls' },
  { handle: 'custom-plaque-awards', label: 'Custom Plaque Awards' },
  { handle: 'custom-acrylic-awards-1', label: 'Custom Acrylic Awards' },
  { handle: 'stock-quick-ship', label: 'Stock & Quick Ship Awards' },
  { handle: 'custom-sash-awards', label: 'Custom Sash Awards' },
  { handle: 'custom-crystal-awards', label: 'Custom Crystal Awards' },
  { handle: 'new-products', label: 'New Products!' }
];

export default function HomePage() {
  return (
    <>
      <ThreeItemGrid />
      <CollectionsGrid collections={HOMEPAGE_COLLECTIONS} />
      <Carousel />
      <Footer />
    </>
  );
}
