import Cart from 'components/cart';
import OpenCart from 'components/cart/open-cart';
import LogoSquare from 'components/logo-square';
import { getMenu } from 'lib/shopify';
import { Menu } from 'lib/shopify/types';
import Link from 'next/link';
import { Suspense } from 'react';
import MobileMenu from './mobile-menu';
const { SITE_NAME } = process.env;

export default async function Navbar() {
  const menu = await getMenu('next-js-frontend-header-menu');

  return (
    <header className="border-b border-[#E5E5E5] bg-white py-4">
      <nav className="flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="block flex-none md:hidden">
          <MobileMenu menu={menu} />
        </div>
        <div className="flex w-full items-center">
          <div className="flex w-full ">
            <Link
              href="/"
              className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
            >
              <LogoSquare />
              <div className="ml-2 flex-none font-futura text-2rem font-extrabold tracking-custom text-futura-color">
                {SITE_NAME}
              </div>
            </Link>
            {menu.length ? (
              <ul className="hidden space-x-4 md:flex md:flex-1 md:items-center">
                {menu.map((item: Menu) => (
                  <li key={item.title}>
                    <Link
                      href={item.path}
                      className=" font-semibold text-custom-blue  underline-offset-4 hover:text-custom-blue hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          {/* <div className="hidden justify-center md:flex md:w-1/3">
          <Search />
        </div> */}
          <div className="flex justify-end md:w-2/3">
            <Suspense fallback={<OpenCart />}>
              <Cart />
            </Suspense>
          </div>
        </div>
      </nav>
    </header>
  );
}
