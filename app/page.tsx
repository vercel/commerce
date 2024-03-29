import { Carousel } from 'components/carousel';
import Footer from 'components/layout/footer';
import Image from 'next/image';
import { Suspense } from 'react';
import circle2 from '../media/boy_homePage_circle.png';
import circle3 from '../media/girl_homePage_circle.png';
import HomePageBlob from '../media/homePage_blob.svg';
import littlePerson from '../media/little_person_homePage.png';
import circle1 from '../media/parent_homePage_circle.png';
import step1 from '../media/step1.svg';
import step2 from '../media/step2.svg';
import step3 from '../media/step3.svg';
import step4 from '../media/step4.svg';
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
        {/*TopSection*/}{' '}
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
        {/*How It Works */}{' '}
        <div className="mx-auto max-w-screen-xl">
          <h2 className="mb-8 text-center text-4xl font-semibold">How it works</h2>
          <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:space-x-4 md:space-y-0">
            <div className="flex-1 text-center">
              <Image src={step1} alt="Step 1" />
              <h3 className="font-semibold">Step 1</h3>
              <p>
                We collect grade-specific supply lists from schools and create custom pre-packaged
                school kits.
              </p>
            </div>
            <div className="flex-1 text-center">
              <Image src={step2} alt="Step 2" />
              <h3 className="font-semibold">Step 2</h3>
              <p>Parents conveniently buy their child a School Kit with a click of a button.</p>
            </div>
            <div className="flex-1 text-center">
              <Image src={step3} alt="Step 3" />
              <h3 className="font-semibold">Step 3</h3>
              <p>Our team delivers directly to your classroom. No need for pickup.</p>
            </div>
            <div className="flex-1 text-center">
              <Image src={step4} alt="Step 4" />
              <h3 className="font-semibold">Step 4</h3>
              <p>
                Send your child to school confidently knowing they have everything needed for
                learning.
              </p>
            </div>
          </div>
        </div>
        {/* Why Choose SchoolKits section */}
        <div className="bg-[#F8FCFD] px-4 py-12">
          <div className="mx-auto flex max-w-screen-xl flex-col lg:flex-row">
            <div className="mb-8 flex flex-1 items-center justify-center lg:mb-0">
              {/* Image container - adjust the positioning as needed */}
              <div className="relative">
                {/* These images should be positioned absolutely within this relative container as per your design */}
                <Image
                  src={circle1}
                  alt="Photo 1"
                  className="rounded-full"
                  layout="fixed"
                  width={200}
                  height={200}
                />
                <Image
                  src={circle2}
                  alt="Photo 2"
                  className="rounded-full"
                  layout="fixed"
                  width={200}
                  height={200}
                  style={{ position: 'absolute', top: '50px', left: '50px' }}
                />
                <Image
                  src={circle3}
                  alt="Photo 3"
                  className="rounded-full"
                  layout="fixed"
                  width={200}
                  height={200}
                  style={{ position: 'absolute', top: '100px', right: '50px' }}
                />
                {/* Add more images as needed */}
              </div>
            </div>
            <div className="flex-1">
              <h2 className="mb-4 text-4xl font-semibold">Why Choose SchoolKits?</h2>
              <p className="mb-8">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum dolore.
              </p>
              <ul className="list-inside list-disc space-y-2">
                {/* Repeat this structure for each bullet point */}
                <li>Lorem ipsum dolor sit amet</li>
                <li>Lorem ipsum dolor sit amet</li>
                <li>Lorem ipsum dolor sit amet</li>
                <li>Lorem ipsum dolor sit amet</li>
                <li>Lorem ipsum dolor sit amet</li>
                {/* ... */}
              </ul>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-screen-xl">
          <h2 className="mb-8 text-center text-4xl font-semibold">Parents love us</h2>

          <Carousel />
        </div>
        <Suspense>
          <Footer />
        </Suspense>
      </Suspense>
    </>
  );
}
