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
    <nav className="relative flex items-center justify-between p-4 lg:px-6">
      <div className="block w-1/3 md:hidden">
        <MobileMenu menu={menu} />
      </div>
      <div className="b flex w-full flex-auto text-sm md:mr-6 md:flex md:w-auto md:items-center lg:mr-10">
        <div className="flex w-full flex-none justify-center md:mr-6 md:block md:w-auto lg:mr-10">
          <Link href="/" aria-label="Go back home" className="flex items-center">
            <div className="relative mr-2 flex h-11 w-11 items-center justify-center rounded-md border border-gray-200 text-black transition-colors dark:border-gray-700 dark:text-white">
              <LogoIcon className="h-8 transition-transform hover:scale-110" />
            </div>
            <div className="text-sm font-medium uppercase">Acme Store</div>
          </Link>
        </div>
        {menu.length ? (
          <ul className="b mr-6 hidden w-full text-sm md:flex md:items-center lg:mr-10">
            {menu.map((item: Menu) => (
              <li key={item.title}>
                <Link
                  href={item.path}
                  className="mr-3 rounded-lg py-1 text-gray-500 underline-offset-4 hover:text-black hover:underline dark:hover:text-gray-400 lg:mr-8"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      <div className="hidden flex-grow md:block md:w-auto">
        <Search />
      </div>

      <div className="flex w-2/5 justify-end">
        <Suspense fallback={<CartIcon className="h-6" />}>
          <Cart />
        </Suspense>
      </div>
    </nav>
  );
}
