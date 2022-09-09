import Link from 'next/link';

import { collections, perks, trendingProducts } from '@/constant/env';

const HomePageMain = () => {
  return (
    <main>
      {/* Hero section */}
      <div className='relative'>
        {/* Background image and overlap */}
        <div aria-hidden='true' className='absolute inset-0 hidden sm:flex sm:flex-col'>
          <div className='relative w-full flex-1 bg-gray-800'>
            <div className='absolute inset-0 overflow-hidden'>
              <img
                src='https://tailwindui.com/img/ecommerce-images/home-page-04-hero-full-width.jpg'
                alt=''
                className='h-full w-full object-cover object-center'
              />
            </div>
            <div className='absolute inset-0 bg-gray-900 opacity-50' />
          </div>
          <div className='h-32 w-full bg-white md:h-40 lg:h-48' />
        </div>

        <div className='relative mx-auto max-w-3xl px-4 pb-96 text-center sm:px-6 sm:pb-0 lg:px-8'>
          {/* Background image and overlap */}
          <div aria-hidden='true' className='absolute inset-0 flex flex-col sm:hidden'>
            <div className='relative w-full flex-1 bg-gray-800'>
              <div className='absolute inset-0 overflow-hidden'>
                <img
                  src='https://tailwindui.com/img/ecommerce-images/home-page-04-hero-full-width.jpg'
                  alt=''
                  className='h-full w-full object-cover object-center'
                />
              </div>
              <div className='absolute inset-0 bg-gray-900 opacity-50' />
            </div>
            <div className='h-48 w-full bg-white' />
          </div>
          <div className='relative py-32'>
            <h1 className='text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl'>
              D_D Merch
            </h1>
            <div className='mt-4 sm:mt-6'>
              <Link href='/product'>
                <a
                  href='#'
                  className='inline-block rounded-md border border-transparent bg-black py-3 px-8 font-medium text-white hover:bg-slate-800'
                >
                  Shop
                </a>
              </Link>
            </div>
          </div>
        </div>

        <section aria-labelledby='collection-heading' className='relative -mt-96 sm:mt-0'>
          <h2 id='collection-heading' className='sr-only'>
            Collections
          </h2>
          <div className='mx-auto grid max-w-md grid-cols-1 gap-y-6 px-4 sm:max-w-7xl sm:grid-cols-3 sm:gap-y-0 sm:gap-x-6 sm:px-6 lg:gap-x-8 lg:px-8'>
            {collections.map((collection) => (
              <div
                key={collection.name}
                className='group relative h-96 rounded-lg bg-white shadow-xl sm:aspect-w-4 sm:aspect-h-5 sm:h-auto'
              >
                <div>
                  <div
                    aria-hidden='true'
                    className='absolute inset-0 overflow-hidden rounded-lg'
                  >
                    <div className='absolute inset-0 overflow-hidden group-hover:opacity-75'>
                      <img
                        src={collection.imageSrc}
                        alt={collection.imageAlt}
                        className='h-full w-full object-cover object-center'
                      />
                    </div>
                    <div className='absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50' />
                  </div>
                  <div className='absolute inset-0 flex items-end rounded-lg p-6'>
                    <div>
                      <h3 className='mt-1 font-semibold text-white'>
                        <a href={collection.href}>
                          <span className='absolute inset-0' />
                          {collection.name}
                        </a>
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section aria-labelledby='trending-heading'>
        <div className='mx-auto max-w-7xl py-24 px-4 sm:px-6 sm:py-32 lg:px-8 lg:pt-32'>
          <div className='md:flex md:items-center md:justify-between'>
            <h2
              id='favorites-heading'
              className='text-2xl font-bold tracking-tight text-gray-900'
            >
              Trending Products
            </h2>
            <a
              href='#'
              className='text-md hidden font-medium text-black hover:text-slate-500 md:block'
            >
              Shop
              <span aria-hidden='true'> &rarr;</span>
            </a>
          </div>

          <div className='mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8'>
            {trendingProducts.map((product) => (
              <div key={product.id} className='group relative'>
                <div className='h-56 w-full overflow-hidden rounded-md group-hover:opacity-75 lg:h-72 xl:h-80'>
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className='h-full w-full object-cover object-center'
                  />
                </div>
                <h3 className='mt-4 text-sm text-gray-700'>
                  <a href={product.href}>
                    <span className='absolute inset-0' />
                    {product.name}
                  </a>
                </h3>
                <p className='mt-1 text-sm text-gray-500'>{product.color}</p>
                <p className='mt-1 text-sm font-medium text-gray-900'>{product.price}</p>
              </div>
            ))}
          </div>

          <div className='mt-8 text-sm md:hidden'>
            <a href='#' className='font-medium text-slate-600 hover:text-slate-500'>
              <span aria-hidden='true'> &rarr;</span>
            </a>
          </div>
        </div>
      </section>

      <section
        aria-labelledby='perks-heading'
        className='border-t border-gray-200 bg-gray-50'
      >
        <h2 id='perks-heading' className='sr-only'>
          Our perks
        </h2>

        <div className='mx-auto max-w-7xl py-24 px-4 sm:px-6 sm:py-32 lg:px-8'>
          <div className='grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-0'>
            {perks.map((perk) => (
              <div
                key={perk.name}
                className='text-center md:flex md:items-start md:text-left lg:block lg:text-center'
              >
                <div className='md:flex-shrink-0'>
                  <div className='flow-root'>
                    <img
                      className='-my-1 mx-auto h-24 w-auto'
                      src={perk.imageUrl}
                      alt=''
                    />
                  </div>
                </div>
                <div className='mt-6 md:mt-0 md:ml-4 lg:mt-6 lg:ml-0'>
                  <h3 className='text-base font-medium text-gray-900'>{perk.name}</h3>
                  <p className='mt-3 text-sm text-gray-500'>{perk.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePageMain;
