import { getMetaobjects } from 'lib/shopify';
import Image from 'next/image';
import { Suspense } from 'react';
import HomePageFilters, { HomePageFiltersPlaceholder } from './filters/hompage-filters';
import DynamicHeroIcon from './hero-icon';
import ImageDisplay from './page/image-display';

const Hero = async () => {
  const [offers, heroImage] = await Promise.all([
    getMetaobjects('usp_item'),
    getMetaobjects('hero')
  ]);

  return (
    <div className="flex flex-col border-b border-gray-200 lg:border-0">
      <nav aria-label="Offers" className="order-last bg-white lg:order-first">
        <div className="max-w-8xl mx-auto lg:px-8">
          <ul
            role="list"
            className="grid grid-cols-1 divide-y divide-gray-200 lg:grid-cols-4 lg:divide-x lg:divide-y-0"
          >
            {offers.map((offer) => (
              <li
                key={offer.title}
                className="flex w-full items-center justify-start px-4 lg:justify-center"
              >
                <DynamicHeroIcon
                  icon={offer.icon_name as string}
                  className="size-7 flex-shrink-0 text-secondary"
                />
                <p className="px-3 py-5 text-sm font-medium text-gray-800">{offer.title}</p>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="bg-white">
        <div className="relative bg-gray-900">
          {/* Decorative image and overlay */}
          <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
            {heroImage.length && heroImage[0]?.file ? (
              <Suspense fallback={<div className="h-[626px] w-full" />}>
                <ImageDisplay
                  fileId={heroImage[0].file as string}
                  title="Hero Image"
                  priority
                  className="h-full w-full object-cover object-center"
                  sizes="100vw"
                  width={1103}
                  height={626}
                />
              </Suspense>
            ) : (
              <Image
                src="/hero-image.jpeg"
                alt="Hero Image"
                width={1103}
                height={626}
                priority
                className="h-full w-full object-cover object-center"
                sizes="100vw"
              />
            )}
          </div>
          <div aria-hidden="true" className="absolute inset-0 bg-dark opacity-80" />
          <div className="flex flex-col gap-10 px-6 py-32 text-center sm:py-56 lg:px-0">
            <div className="relative mx-auto hidden flex-col items-center justify-center text-white md:flex">
              <Image src="/best-price.svg" alt="Best Price" width={100} height={90} />
              <p className="tracking-wide">Best Price Guarantee</p>
              <p className="text-sm tracking-wide">
                We will match or beat any competitor&apos;s pricing.
              </p>
            </div>
            <div className="relative mx-auto flex max-w-4xl flex-col items-center ">
              <Suspense fallback={<HomePageFiltersPlaceholder />}>
                <HomePageFilters />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
