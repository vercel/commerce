import Footer from 'components/layout/footer';
import { Carousel } from 'components/ui/carousel';
import { Suspense } from 'react';

export const runtime = 'edge';

export const metadata = {
  description: 'scape²: consciously created, art to wear, altering angles, by independent artist Sammii.',
  openGraph: {
    type: 'website'
  },
};

export default async function HomePage() {
  return (
    <>
      <Suspense>

        <div className='container grid justify-around my-4 grid-cols-1 items-center justify-items-center'>
        <Carousel collection={undefined} />
        <Carousel collection='flower' />
        <Carousel collection='foliage' />
        <Carousel collection='nature' />
          {/* <Link className='h-full w-full md:w-10/12 flex items-center justify-center justify-items-center' href="/wall">
            <Button className='py-3 w-full m-3 bg-transparent' variant={'dark'}>
              <h2 className='absolute z-50 text-3xl text-white'>Art for the Wall</h2>
              <GridTileImage width={500} height={500} src="/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0587%2F3251%2F1370%2Fproducts%2F2f6e3c70-ed36-4034-b670-7eda7d47afe1.jpg%3Fv%3D1700689495&w=1080&q=75" alt='Art for the Wall' />
            </Button>
          </Link>
          <Link className='h-full w-full md:w-10/12 flex items-center justify-center' href="/wardrobe">
            <Button className='py-3 w-full m-3 bg-transparent' variant={'dark'}>
              <h2 className='absolute z-50 text-3xl text-white'>Art for the Wardrobe</h2>
              <GridTileImage width={500} height={500} src="/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0587%2F3251%2F1370%2Ffiles%2F2BCB00FC-35D9-4181-8F11-D6F4569D6446.jpg%3Fv%3D1700746166&w=1080&q=75" alt='Art for the Wardrobe' />
            </Button>
          </Link> */}

        </div>
        <Suspense>
          <Footer />
        </Suspense>
      </Suspense>
    </>
  );
}
