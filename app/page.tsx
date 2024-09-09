import Error from 'app/error';
import Footer from 'components/layout/footer';
import { Navbar } from 'components/layout/navbar';
import Search from 'components/layout/navbar/search';
import { PriceBox } from 'components/price-box';
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
        <Navbar />
        <div className={'relative h-screen w-screen'}>
          <Image
            src={
              products[0].featuredImage.url || '' //Todo: default image
            }
            alt={products[0].featuredImage.altText || 'Main product'}
            fill
            objectFit="cover"
            quality={100}
            priority
          />
        </div>
        <div className="absolute bottom-20 flex w-full flex-col items-center text-lightText">
          <h1 className="text-xl">{products[0].title}</h1>
          <span className="mb-6 mt-1 text-sm text-lightText/80">Read more</span>
          <div className={`text-mainBG flex w-[384px] justify-center gap-[10px]`}>
            <PriceBox title="Box of 20" price={2460} />
            <PriceBox title="Single Cigar" price={120} />
          </div>
        </div>
      </section>
      <section className="flex">
        <Search />
        <div className="flex">
          Filter by
          <button>Size</button>
          <button>Strength</button>
        </div>
      </section>
      <Footer />
    </>
  );
}
