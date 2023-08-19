'use client';

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
      {!!ref && !inView && (
        <div className="fixed left-1/2 top-0 z-20 w-full max-w-screen-xl -translate-x-1/2 animate-fadeIn bg-dark/40 px-6 py-2 backdrop-blur-sm">
          <div className="mx-auto flex max-w-screen-xl flex-row items-center justify-between">
            <div className={clsx('')}>
              <LogoNamemark
                className={clsx('w-[260px]', 'fill-current transition-all duration-150')}
              />
            </div>
            <nav className="flex flex-row items-center space-x-4">
              <Suspense fallback={<OpenCart />}>
                <div className="flex flex-col-reverse items-center justify-center space-y-2 px-2 md:flex-row md:space-x-6">
                  <CartModal cart={cart} />
                  <MenuModal />
                </div>
              </Suspense>
            </nav>
          </div>
        </div>
      )}
      <div
        className={clsx('mx-auto flex max-w-screen-xl flex-row items-start justify-between px-6')}
      >
        <div>
          <LogoNamemark
            className={clsx(
              inView ? 'w-[260px] md:w-[600px]' : 'w-[260px] md:w-[260px]',
              'fill-current pt-12 transition-all duration-150'
            )}
          />
        </div>
        <nav className="flex flex-row space-x-4 pt-6">
          <LanguageControl lang={locale} />
          <Suspense fallback={<OpenCart />}>
            <div className="flex flex-col-reverse items-center justify-center space-y-2 rounded md:flex-row md:space-x-6">
              <CartModal cart={cart} />
              <MenuModal />
            </div>
          </Suspense>
        </nav>
      </div>
    </div>
  );
}
