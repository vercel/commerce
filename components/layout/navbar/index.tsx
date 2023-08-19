'use client';

import { Transition } from '@headlessui/react';
import clsx from 'clsx';
import CartModal from 'components/cart/modal';
import OpenCart from 'components/cart/open-cart';
import LogoNamemark from 'components/icons/namemark';
import { Cart } from 'lib/shopify/types';
import { Suspense } from 'react';
import { useInView } from 'react-intersection-observer';
import { MenuModal } from '../menu/modal';
import { LanguageControl, SupportedLocale } from './language-control';

export default function Navbar({ cart, locale }: { cart?: Cart; locale?: SupportedLocale }) {
  const { ref, inView, entry } = useInView({
    threshold: 0,
    initialInView: true
  });

  return (
    <div ref={ref}>
      <div className="fixed top-0 z-20 w-full bg-dark/20 backdrop-blur-sm">
        <Transition
          show={!!ref && !inView}
          enter="transition ease duration-150 transform"
          enterFrom="opacity-0 -translate-y-12"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease duration-0 transform"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="mx-auto flex max-w-screen-xl flex-row items-start justify-between">
            <div className="px-4 py-2">
              <LogoNamemark className={clsx('w-[260px]', 'fill-current')} />
            </div>
            <nav className="flex flex-row items-center space-x-4 px-6">
              <Suspense fallback={<OpenCart />}>
                <div className="flex flex-col-reverse items-center justify-center space-y-2 px-2 md:flex-row md:space-x-6">
                  <CartModal cart={cart} />
                  <MenuModal scrolled={inView} />
                </div>
              </Suspense>
            </nav>
          </div>
        </Transition>
      </div>
      <div
        className={clsx('mx-auto flex max-w-screen-xl flex-row items-start justify-between px-6')}
      >
        <div>
          <LogoNamemark
            className={clsx(
              inView ? 'w-[260px] md:w-[600px]' : 'w-[260px] md:w-[260px]',
              'fill-current pt-4 transition-all duration-150 md:pt-12'
            )}
          />
        </div>
        <nav className="flex flex-row space-x-4 px-2 md:pt-6">
          <LanguageControl lang={locale} />
          <Suspense fallback={<OpenCart />}>
            <div className="flex flex-col-reverse items-center justify-center space-y-2 rounded md:flex-row md:space-x-6">
              <CartModal cart={cart} />
              <MenuModal scrolled={inView} />
            </div>
          </Suspense>
        </nav>
      </div>
    </div>
  );
}
