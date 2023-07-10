import Link from 'next/link';
import { Suspense } from 'react';

import Cart from 'components/cart';
import CartIcon from 'components/icons/cart';
import LogoIcon from 'components/icons/logo';
import { getMenu } from 'lib/shopify';
import { Menu } from 'lib/shopify/types';
import MobileMenu from './mobile-menu';
import Search from './search';

export default async function Navbar() {
  const menu = await getMenu('next-js-frontend-header-menu');

  return (
    <nav className="relative flex items-center justify-between p-4 bg-white dark:bg-black lg:px-6">
      <div className="block w-1/3 md:hidden">
        <MobileMenu menu={menu} />
      </div>
      <div className="flex w-2/5 justify-self-center md:justify-self-start">
        <div className="flex-none mr-6 lg:mr-10">
          <Link href="/" aria-label="Go back home" className="flex items-center">
            <div className="relative flex items-center justify-center mr-2 text-black transition-colors border border-gray-200 rounded-md h-11 w-11 dark:border-gray-700 dark:text-white">
              <LogoIcon className="h-8 transition-transform hover:scale-110" />
            </div>
            <div className="text-sm font-medium uppercase">Acme Store</div>
          </Link>
        </div>
        {menu.length ? (
          <ul className="hidden w-full mr-6 b md:flex md:items-center lg:mr-10">
            {menu.map((item: Menu) => (
              <li key={item.title}>
                <Link
                  href={item.path}
                  className="py-1 mr-3 text-gray-800 rounded-lg underline-offset-4 hover:text-gray-500 hover:underline dark:text-gray-500 dark:hover:text-gray-400 lg:mr-8"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      <div className="flex-grow hidden md:block">
        <Search />
      </div>

      <div className="flex justify-end w-2/5">
        <Suspense fallback={<CartIcon className="h-6" />}>
          <Cart />
        </Suspense>
      </div>
    </nav>
  );
}
