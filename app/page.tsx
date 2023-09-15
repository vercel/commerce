import { Carousel } from 'components/carousel';
import Grid from 'components/grid';
import Footer from 'components/layout/footer';
import ProductGridItems from 'components/layout/product-grid-items';
import { getProducts } from 'lib/shopify';
import { Suspense } from 'react';

export const runtime = 'edge';

export const metadata = {
  description: 'Scape Squared: High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website'
  }
};

export default async function HomePage() {
  const products = await getProducts({});  
  const liveProducts = products.filter((product) => !product.tags.includes('hidden-product'))
  
  return (
    <>
      <Suspense>
        <Carousel />
        {liveProducts.length > 0 ? (
          <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 m-6">
            <ProductGridItems products={products} />
          </Grid>
        ) : null}
        <Suspense>
          <Footer />
        </Suspense>
      </Suspense>
    </>
  );
}
