import CartModal from 'components/cart/modal';
import UserIcon from 'components/icons/UserIcon';
import LogoSquare from 'components/logo-square';
import { Category } from 'lib/woocomerce/models/base';
import { woocommerce } from 'lib/woocomerce/woocommerce';
import Link from 'next/link';
import path from 'path';
import { Suspense } from 'react';
import MobileMenu from './mobile-menu';
import Search, { SearchSkeleton } from './search';

const { SITE_NAME } = process.env;

type Menu = {
  title: string;
  path: string;
};

export async function Navbar() {
  const categories: Category[] = await woocommerce.get('products/categories');
  const menu = [
    {
      title: 'Home',
      path: '/'
    },
    ...categories.map((category) => ({
      title: category.name,
      path: path.join('/collection', category.id.toString())
    }))
  ] as Menu[];

  return (
    <nav className="relative flex items-center justify-between p-4 lg:px-6">
      <div className="block flex-none md:hidden">
        <Suspense fallback={null}>
          <MobileMenu menu={menu} />
        </Suspense>
      </div>
      <div className="flex w-full items-center">
        <div className="flex w-full md:w-1/3">
          <Link
            href="/"
            prefetch={true}
            className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
          >
            <LogoSquare />
            <div className="ml-2 flex-none text-sm font-medium uppercase md:hidden lg:block">
              {SITE_NAME}
            </div>
          </Link>
          {menu.length ? (
            <ul className="hidden gap-6 text-sm md:flex md:items-center">
              {menu.map((item: Menu) => (
                <li key={item.title}>
                  <Link
                    href={item.path}
                    prefetch={true}
                    className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="hidden justify-center md:flex md:w-1/3">
          <Suspense fallback={<SearchSkeleton />}>
            <Search />
          </Suspense>
        </div>
        <div className="flex justify-end md:w-1/3">
          <CartModal />
          <UserIcon />
        </div>
      </div>
    </nav>
  );
}
