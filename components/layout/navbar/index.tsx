import Cart from 'components/cart';
import OpenCart from 'components/cart/open-cart';
import LogoSquare from 'components/logo-square';
import Profile from 'components/profile';
import OpenProfile from 'components/profile/open-profile';
import { getMenu } from 'lib/shopify';
import Link from 'next/link';
import { Suspense } from 'react';
import MainMenu from './main-menu';
import MobileMenu from './mobile-menu';
import Search, { SearchSkeleton } from './search';

export default async function Navbar() {
  const menu = await getMenu('main-menu');

  return (
    <nav className="relative flex items-center justify-between bg-white pb-3 pt-4 dark:bg-neutral-900 md:pb-0">
      <div className="block flex-none pl-4 md:hidden">
        <Suspense fallback={null}>
          <MobileMenu menu={menu} />
        </Suspense>
      </div>
      <div className="flex w-full flex-col">
        <div className="flex w-full items-center pr-4 md:px-4">
          <div className="flex w-full md:w-1/3">
            <Link
              href="/"
              className="flex w-full items-center justify-center pl-3 sm:pl-0 md:w-auto lg:mr-6"
            >
              <LogoSquare />
            </Link>
          </div>
          <div className="hidden justify-center md:flex md:w-1/3">
            <Suspense fallback={<SearchSkeleton />}>
              <Search />
            </Suspense>
          </div>
          <div className="flex justify-end gap-5 pr-2 md:w-1/3">
            <Suspense fallback={<OpenProfile />}>
              <Profile />
            </Suspense>
            <Suspense fallback={<OpenCart />}>
              <Cart />
            </Suspense>
          </div>
        </div>

        <MainMenu menu={menu} />
      </div>
    </nav>
  );
}
