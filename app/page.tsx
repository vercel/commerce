import { Button } from '@/components/ui/button';
import { Carousel } from 'components/carousel';
import Footer from 'components/layout/footer';
import Link from 'next/link';
import { Suspense } from 'react';

export const runtime = 'edge';

export const metadata = {
  description: 'scape²: art for the wall & wardrobe.',
  openGraph: {
    type: 'website'
  },
};

export default async function HomePage() {
  return (
    <>
      <Suspense>
        <Carousel />
        <div className='container grid justify-around my-4 grid-cols-1 md:grid-cols-2 items-center justify-items-center'>
          <Link className='h-full w-full md:w-10/12 flex items-center justify-center justify-items-center' href="/wall">
            <Button className='py-3 w-full m-3' variant={'dark'}>
              <h2>Art for the Wall</h2>
              {/* <Image src="" alt='' /> */}
            </Button>
          </Link>
          <Link className='h-full w-full md:w-10/12 flex items-center justify-center' href="/wardrobe">
            <Button className='py-3 w-full m-3' variant={'dark'}>Art for the Wardrobe</Button>
          </Link>
        </div>
        <Suspense>
          <Footer />
        </Suspense>
      </Suspense>
    </>
  );
}
