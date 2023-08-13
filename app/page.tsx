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
      <div className="invisible absolute right-40 top-12 md:visible">
        <div className="flex flex-row space-x-0">
          <span className="px-2 py-4">JP</span>
          <span className="py-4">/</span>
          <span className="px-2 py-4">EN</span>
        </div>
      </div>
      <div className="px-6 pb-12 pt-6 md:py-12 md:pl-6">
        <Image
          src={Namemark}
          alt="narai by suginomori brewery"
          className="max-w-[260px] md:max-w-[600px]"
        />
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
