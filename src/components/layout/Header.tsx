import { Popover, Transition } from '@headlessui/react';
import { Bars3Icon, ShoppingBagIcon } from '@heroicons/react/20/solid';
import { Dispatch, Fragment, SetStateAction } from 'react';
import { twMerge } from 'tailwind-merge';

import { navigation } from '@/constant/env';

interface Props {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const Header = ({ setOpen }: Props) => {
  return (
    <header className='relative'>
      <nav aria-label='Top'>
        <div className='bg-white'>
          <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
            <div className='flex h-16 items-center justify-between'>
              {/* Logo (lg+) */}
              <div className='hidden lg:flex lg:flex-1 lg:items-center'>
                <a href='#'>
                  <span className='sr-only'>Devloper DAO</span>
                  <img className='h-8 w-auto' src='/images/logo.png' alt='' />
                </a>
              </div>

              <div className='hidden h-full lg:flex'>
                {/* Flyout menus */}
                <Popover.Group className='inset-x-0 bottom-0 px-4'>
                  <div className='flex h-full justify-center space-x-8'>
                    {navigation.categories.map((category) => (
                      <Popover key={category.name} className='flex'>
                        {({ open }) => (
                          <>
                            <div className='relative flex'>
                              <Popover.Button
                                className={twMerge(
                                  open
                                    ? 'text-black-600'
                                    : 'text-gray-700 hover:text-gray-800',
                                  'relative flex items-center justify-center text-sm font-medium transition-colors duration-200 ease-out'
                                )}
                              >
                                {category.name}
                                <span
                                  className={twMerge(
                                    open ? 'bg-black-600' : '',
                                    'absolute inset-x-0 -bottom-px z-20 h-0.5 transition duration-200 ease-out'
                                  )}
                                  aria-hidden='true'
                                />
                              </Popover.Button>
                            </div>

                            <Transition
                              as={Fragment}
                              enter='transition ease-out duration-200'
                              enterFrom='opacity-0'
                              enterTo='opacity-100'
                              leave='transition ease-in duration-150'
                              leaveFrom='opacity-100'
                              leaveTo='opacity-0'
                            >
                              <Popover.Panel className='absolute inset-x-0 top-full z-10 bg-white text-sm text-gray-500'>
                                {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                <div
                                  className='absolute inset-0 top-1/2 bg-white shadow'
                                  aria-hidden='true'
                                />
                                {/* Fake border when menu is open */}
                                <div
                                  className='absolute inset-0 top-0 mx-auto h-px max-w-7xl px-8'
                                  aria-hidden='true'
                                >
                                  <div
                                    className={twMerge(
                                      open ? 'bg-gray-200' : 'bg-transparent',
                                      'h-px w-full transition-colors duration-200 ease-out'
                                    )}
                                  />
                                </div>

                                <div className='relative'>
                                  <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                                    <div className='grid grid-cols-4 gap-y-10 gap-x-8 py-16'>
                                      {category.featured.map((item) => (
                                        <div key={item.name} className='group relative'>
                                          <div className='aspect-w-1 aspect-h-1 overflow-hidden rounded-md bg-gray-100 group-hover:opacity-75'>
                                            <img
                                              src={item.imageSrc}
                                              alt={item.imageAlt}
                                              className='object-cover object-center'
                                            />
                                          </div>
                                          <a
                                            href={item.href}
                                            className='mt-4 block font-medium text-gray-900'
                                          >
                                            <span
                                              className='absolute inset-0 z-10'
                                              aria-hidden='true'
                                            />
                                            {item.name}
                                          </a>
                                          <p aria-hidden='true' className='mt-1'>
                                            Shop now
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </Popover.Panel>
                            </Transition>
                          </>
                        )}
                      </Popover>
                    ))}

                    {navigation.pages.map((page) => (
                      <a
                        key={page.name}
                        href={page.href}
                        className='flex items-center text-sm font-medium text-gray-700 hover:text-gray-800'
                      >
                        {page.name}
                      </a>
                    ))}
                  </div>
                </Popover.Group>
              </div>

              {/* Mobile menu  */}
              <div className='flex flex-1 items-center lg:hidden'>
                <button
                  type='button'
                  className='-ml-2 rounded-md bg-white p-2 text-gray-400'
                  onClick={() => setOpen(true)}
                >
                  <span className='sr-only'>Open menu</span>
                  <Bars3Icon className='h-6 w-6' aria-hidden='true' />
                </button>
              </div>

              {/* Logo (lg-) */}
              <a href='#' className='lg:hidden'>
                <span className='sr-only'>Devloper DAO</span>
                <img src='/images/logo.png' alt='' className='h-8 w-auto' />
              </a>

              <div className='flex flex-1 items-center justify-end'>
                <div className='flex items-center lg:ml-8'>
                  {/* Cart */}
                  <div className='ml-4 flow-root lg:ml-8'>
                    <a href='#' className='group -m-2 flex items-center p-2'>
                      <ShoppingBagIcon
                        className='h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500'
                        aria-hidden='true'
                      />
                      <span className='ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800'>
                        0
                      </span>
                      <span className='sr-only'>items in cart, view bag</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
