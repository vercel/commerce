import { mockProducts } from 'app/data';
import Error from 'app/error';
import Grid from 'components/grid';
import { Search } from 'components/layout/search';
import { PriceBox } from 'components/price-box';
import ProductGridItems from 'components/product/product-grid-items';
import { getCollectionProducts } from 'lib/shopify';
import Image from 'next/image';

//Todo: change to proper metadata
export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website'
  }
};

export default async function HomePage() {
  const products = await getCollectionProducts({ collection: 'landing' });

  //Todo: change to proper error handling
  if (!products[0]) return <Error />;

  return (
    <>
      <section className="relative">
        <div className="relative h-screen w-screen">
          <Image
            src={
              products[0].featuredImage.url || '' //Todo: default image
            }
            alt={products[0].featuredImage.altText || 'Main product'}
            fill
            quality={100}
            priority
            className="object-cover"
          />
        </div>
        <div className="absolute bottom-20 flex w-full flex-col items-center text-lightText">
          <h1 className="text-xl">{products[0].title}</h1>
          <span className="mb-6 mt-1 text-sm text-lightText/80">Read more</span>
          <div className="flex w-[384px] justify-center gap-[10px] text-mainBg">
            <PriceBox title="Box of 20" price={2460} />
            <PriceBox title="Single Cigar" price={120} />
          </div>
        </div>
      </section>
      <Search />
      <Grid className="grid-cols-2 sm:grid-cols-4">
        {mockProducts.slice(0, 4).map(({ featuredImage, id, title, handle }) => (
          <ProductGridItems
            key={id}
            src={featuredImage.url}
            title={title}
            handle={handle}
            ratio="2/3"
          />
        ))}
      </Grid>
      <Grid className="grid-cols-1 sm:grid-cols-3">
        {mockProducts.slice(0, 3).map(({ featuredImage, id, title, handle }) => (
          <ProductGridItems
            key={id}
            src={featuredImage.url}
            title={title}
            handle={handle}
            ratio="2/3"
          />
        ))}
      </Grid>
      <Grid className="grid-cols-1 sm:grid-cols-2">
        {mockProducts.slice(0, 2).map(({ featuredImage, id, title, handle }) => (
          <ProductGridItems key={id} src={featuredImage.url} title={title} handle={handle} />
        ))}
      </Grid>
    </>
  );
}
