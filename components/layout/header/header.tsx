import Cart from 'components/cart';
import OpenCart from 'components/cart/open-cart';
import Logo from 'components/ui/logo/logo';

import Link from 'next/link';
import { Suspense } from 'react';
import HeaderRoot from './header-root';
import OpenMobileMenu from './mobile-menu/open-mobile-menu';
import SearchModal from './search/modal';
import OpenSearch from './search/open-search';
import UserModal from './user-menu/modal';
import OpenUserMenu from './user-menu/open-user-menu';
interface HeaderProps {
  locale: string;
}
export default async function Header({ locale }: HeaderProps) {
  // const params = {
  //   locale: locale
  // };
  // const mainMenu = await getCachedClient()(categoriesQuery, params);

  return (
    <HeaderRoot>
      <div className="relative flex flex-col border-b border-ui-border bg-app">
        <div className="relative flex w-full items-center justify-between px-4 py-2 lg:px-8 2xl:px-16">
          <div className="-translate-x-2 transform md:hidden">
            <Suspense fallback={<OpenMobileMenu />}>
              {/* <MobileMenuModal items={mainMenu} /> */}
            </Suspense>
          </div>

          <div className="flex items-center">
            <Link
              href={`/${locale}`}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform cursor-pointer duration-100 ease-in-out md:relative md:left-0 md:top-0 md:translate-x-0 md:translate-y-0"
              aria-label="Logo"
            >
              <Logo />
            </Link>
          </div>

          <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 transform md:flex">
            <Suspense>{/* <DesktopMenu items={mainMenu} /> */}</Suspense>
          </div>
          <div className="flex translate-x-2 transform justify-end space-x-1">
            <Suspense fallback={<OpenSearch />}>
              <SearchModal />
            </Suspense>
            <Suspense fallback={<OpenUserMenu />}>
              <UserModal />
            </Suspense>
            <Suspense fallback={<OpenCart />}>
              <Cart />
            </Suspense>
          </div>
        </div>
      </div>
    </HeaderRoot>
  );
}
