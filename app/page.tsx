import Footer from 'components/layout/footer';
import Image from 'next/image';
import { Suspense } from 'react';
import HomePageBlob from '../media/homePage_blob.svg';
import littlePerson from '../media/little_person_homePage.png';
export const runtime = 'edge';

export const metadata = {
  description: 'School Supplies Shopping',
  openGraph: {
    type: 'website'
  }
};

export default async function HomePage() {
  return (
    <>
      {/* <ThreeItemGrid /> */}
      <Suspense>
        {/* <Carousel /> */}
        <div className="flex flex-col items-center bg-[#F8FCFD] px-4 py-12 lg:flex-row lg:items-start lg:px-12">
          <div className="space-y-6 p-4 text-left lg:flex-1">
            <h2 className="text-color-body text-4xl font-semibold">
              Simplify Back to School Shopping
            </h2>
            <p className="text-color-body">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
            <button className="rounded-[6.25rem] bg-custom-blue px-6 py-2 font-bold text-white">
              Shop by school
            </button>
          </div>
          <div className="relative self-end lg:flex-1 lg:self-auto">
            {/* Blob SVG */}
            <div className="absolute -bottom-16 -right-16 z-0 max-w-xs lg:-right-10 lg:-top-10 lg:max-w-none">
              <Image src={HomePageBlob} alt="blob" className="h-full w-full" />
            </div>
            <div className="relative z-10 w-60 lg:w-auto">
              <Image
                src={littlePerson}
                alt="Happy kid with a backpack"
                width={500} // Adjust width as necessary
                height={750}
              />
            </div>
          </div>
        </div>

        <Suspense>
          <Footer />
        </Suspense>
      </Suspense>
    </>
  );
}
