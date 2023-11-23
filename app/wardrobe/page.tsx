import Grid from 'components/grid';
import Footer from 'components/layout/footer';
import ProductGridItems from 'components/layout/product-grid-items';
import { getLiveWardrobeProducts } from 'lib/utils';
import { Suspense } from 'react';

export const runtime = 'edge';

export const metadata = {
  description: 'scape²: art for the wardrobe',
  openGraph: {
    type: 'website'
  }
};

export default async function Wardrobe() {
  const liveProducts  = await getLiveWardrobeProducts({});
  
  return (
    <>
      <Suspense>
        {/* <Carousel /> carousel highlighting quality,  */}
        <h2 className='text-3xl flex justify-center my-10'>art for the wardrobe</h2>
        {liveProducts.length > 0 ? (
          <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 m-6">
            <ProductGridItems products={liveProducts} />
          </Grid>
        ) : <section className='container flex justify-center my-16'>
            <h2 className='text-3xl my-16'>opps!</h2>
            <p>something went wrong 😖</p>
          </section>
          }
        <Suspense>
          <Footer />
        </Suspense>
      </Suspense>
    </>
  );
}
