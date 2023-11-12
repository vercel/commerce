'use client';

import { Transition } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import CartModal from 'components/cart/modal';
import LogoNamemark from 'components/icons/namemark';
import { Cart, Product } from 'lib/shopify/types';
import Link from 'next/link';
import { Suspense } from 'react';
import { useInView } from 'react-intersection-observer';
import { MenuModal } from '../menu/modal';
import { LanguageControl, SupportedLocale } from './language-control';

export default function Navbar({
  cart,
  locale,
  compact,
  showTop = false,
  promotedItem
}: {
  cart?: Cart;
  locale?: SupportedLocale;
  compact?: boolean;
  showTop?: boolean;
  promotedItem?: Product;
}) {
  const { ref, inView } = useInView({
    threshold: 0,
    initialInView: true
  });

  return (
    <div ref={ref}>
      {showTop && !inView && (
        <div className="fixed left-6 top-32 z-20 animate-fadeIn">
          <Link href="#" className="transition-opacity duration-150 hover:opacity-60">
            <span className="flex flex-row items-center space-x-2">
              <ChevronUpIcon
                className="h-6 w-6 stroke-subtle transition-colors duration-150 group-hover:stroke-white"
                strokeWidth={2}
              />
              <span className="text-sm font-medium tracking-wider">TOP</span>
            </span>
          </Link>
        </div>
      )}
      <div className="fixed top-0 z-20 w-full bg-dark/90 backdrop-blur-sm">
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
            <div className="px-6 py-2">
              <Link href="/" className="transition-opacity duration-150 hover:opacity-90">
                <LogoNamemark className={clsx('w-[180px]', 'fill-current')} />
              </Link>
            </div>
            <nav className="flex flex-row items-center space-x-4 px-6">
              <div className="flex flex-col-reverse items-center justify-center space-y-2 px-2 md:flex-row md:space-x-6">
                <CartModal cart={cart} promotedItem={promotedItem} />
                <MenuModal scrolled={!inView} />
              </div>
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
                inView && !compact ? 'min-w-[180px] md:w-[600px]' : 'min-w-[180px] md:w-[260px]',
                'fill-current transition-all duration-150',
                compact ? 'pt-4 md:pt-6' : 'pt-4 md:pt-12'
              )}
            />
          </Link>
        </div>
        <nav className="flex flex-row items-center space-x-4 px-2 md:pt-6">
          <Suspense fallback={null}>
            <div className="hidden md:block">
              <LanguageControl lang={locale} />
            </div>
            <div className="flex flex-col-reverse items-center justify-center space-y-2 rounded md:flex-row md:space-x-6 md:space-y-0">
              <CartModal cart={cart} promotedItem={promotedItem} />
              <MenuModal scrolled={!inView} />
            </div>
          </Suspense>
        </nav>
      </div>
    </div>
  );
}
