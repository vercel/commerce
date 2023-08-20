'use client';

import { Transition } from '@headlessui/react';
import clsx from 'clsx';
import CartModal from 'components/cart/modal';
import OpenCart from 'components/cart/open-cart';
import LogoNamemark from 'components/icons/namemark';
import { Cart } from 'lib/shopify/types';
import Link from 'next/link';
import { Suspense } from 'react';
import { useInView } from 'react-intersection-observer';
import { MenuModal } from '../menu/modal';
import { LanguageControl, SupportedLocale } from './language-control';

export default function Navbar({
  cart,
  locale,
  compact
}: {
  cart?: Cart;
  locale?: SupportedLocale;
  compact?: boolean;
}) {
  const { ref, inView } = useInView({
    threshold: 0,
    initialInView: true
  });

  return (
    <div ref={ref}>
      <div className="fixed top-0 z-20 w-full bg-dark/70 backdrop-blur-sm">
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
              <Link href="/" className="transition-opacity duration-150 hover:opacity-90">
                <LogoNamemark className={clsx('w-[260px]', 'fill-current')} />
              </Link>
            </div>
            <nav className="flex flex-row items-center space-x-4 px-6">
              <Suspense fallback={<OpenCart />}>
                <div className="flex flex-col-reverse items-center justify-center space-y-2 px-2 md:flex-row md:space-x-6">
                  <CartModal cart={cart} />
                  <MenuModal scrolled={!inView} />
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
          <Link href="/" className="transition-opacity duration-150 hover:opacity-90">
            <LogoNamemark
              className={clsx(
                inView && !compact ? 'w-[260px] md:w-[600px]' : 'w-[260px] md:w-[260px]',
                'fill-current pt-4 transition-all duration-150 md:pt-12'
              )}
            />
          </Link>
        </div>
        <nav className="flex flex-row items-center space-x-4 px-2 md:pt-6">
          <div className="hidden md:block">
            <LanguageControl lang={locale} />
          </div>
          <div className="flex flex-col-reverse items-center justify-center space-y-2 rounded md:flex-row md:space-x-6 md:space-y-0">
            <Suspense fallback={<OpenCart />}>
              <CartModal cart={cart} />
            </Suspense>
            <MenuModal scrolled={!inView} />
          </div>
        </nav>
      </div>
    </div>
  );
}
