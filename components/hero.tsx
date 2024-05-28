import {
  ArrowPathRoundedSquareIcon,
  CurrencyDollarIcon,
  StarIcon,
  TruckIcon
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import { Suspense } from 'react';
import HomePageFilters from './filters/hompage-filters';

const offers = [
  {
    name: 'Flat Rate Shipping (Commercial Address)',
    icon: TruckIcon
  },
  {
    name: 'Up to 5 Years Unlimited Miles Warranty',
    icon: ArrowPathRoundedSquareIcon
  },
  {
    name: 'Excellent Customer Support',
    icon: StarIcon
  },
  {
    name: 'No Core Charge for 30 Days',
    icon: CurrencyDollarIcon
  }
];

const Hero = () => {
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
                key={offer.name}
                className="flex w-full items-center justify-start px-4 lg:justify-center"
              >
                <offer.icon className="size-7 flex-shrink-0 text-secondary" />
                <p className="px-3 py-5 text-sm font-medium text-gray-800">{offer.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="bg-white">
        <div className="relative bg-gray-900">
          {/* Decorative image and overlay */}
          <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
            <Image
              src="/hero-image.jpeg"
              alt="Hero Image"
              width={1103}
              height={626}
              priority
              className="h-full w-full object-cover object-center"
              sizes="100vw"
            />
          </div>
          <div aria-hidden="true" className="absolute inset-0 bg-gray-900 opacity-60" />

          <div className="relative mx-auto flex max-w-4xl flex-col items-center px-6 py-32 text-center sm:py-64 lg:px-0">
            <Suspense>
              <HomePageFilters />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
