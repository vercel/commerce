import Cart from 'components/cart';
import OpenCart from 'components/cart/open-cart';
import Logo from 'components/ui/logo/logo';
import Link from 'next/link';
import { Suspense } from 'react';
import HeaderRoot from './header-root';
import MainMenu from './main-menu/main-menu';
import MobileMenuModal from './mobile-menu/modal';
import OpenMobileMenu from './mobile-menu/open-mobile-menu';
import SearchModal from './search/modal';
import OpenSearch from './search/open-search';
import UserModal from './user-menu/modal';
import OpenUserMenu from './user-menu/open-user-menu';

interface HeaderProps {
  locale: string;
}

const Header = ({ locale }: HeaderProps) => {
  return (
    <HeaderRoot>
      <div className="relative flex flex-col border-b border-ui-border bg-app">
        <div className="relative flex h-14 w-full items-center justify-between px-4 py-2 lg:h-16 lg:px-8 lg:py-3 2xl:px-16">
          <div className="-translate-x-3 transform md:hidden">
            <Suspense fallback={<OpenMobileMenu />}>
              <MobileMenuModal locale={locale} />
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
            <MainMenu locale={locale} />
          </div>
          <div className="flex translate-x-3 transform justify-end space-x-1">
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
};

export default Header;
