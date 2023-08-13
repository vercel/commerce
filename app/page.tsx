import { Carousel } from 'components/carousel';
import { ThreeItemGrid } from 'components/grid/three-items';
import Footer from 'components/layout/footer';
import Image from 'next/image';
import Namemark from 'public/assets/images/namemark.png';
import { Suspense } from 'react';

export const runtime = 'edge';

export const metadata = {
  description: 'narai by suginomori brewery.',
  openGraph: {
    type: 'website'
  }
};

export default async function HomePage() {
  return (
    <>
      <div className="px-12 pb-12">
        <Image src={Namemark} alt="narai by suginomori brewery" />
      </div>
      <ThreeItemGrid />
      <Suspense>
        <Carousel />
        <Suspense>
          <Footer />
        </Suspense>
      </Suspense>
    </>
  );
}
