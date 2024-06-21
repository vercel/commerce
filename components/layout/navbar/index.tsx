import MegaMenu from 'components/MegaMenu/mega-meu';
import Cart from 'components/cart';
import OpenCart from 'components/cart/open-cart';
import LogoSquare from 'components/logo-square';
import { getMegaMenu } from 'lib/shopify';
import Link from 'next/link';
import { Suspense } from 'react';
import classes from './index.module.scss';
import MobileMenu from './mobile-menu';
import Search, { SearchSkeleton } from './search';

const { SITE_NAME } = process.env;

export default async function Navbar() {
  const menu = await getMegaMenu('next-js-frontend-header-menu');

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarContainer}>
        <div className={classes.mobileMenu}>
          <Suspense fallback={null}>
            <MobileMenu menu={menu} />
          </Suspense>
        </div>
        <div className={classes.navbarContent}>
          <div className={classes.logoContainer}>
            <Link href="/" className={classes.logoLink}>
              <LogoSquare />
              <div className={classes.siteName}>{SITE_NAME}</div>
            </Link>
          </div>
          <div className={classes.searchContainer}>
            <Suspense fallback={<SearchSkeleton />}>
              <Search />
            </Suspense>
          </div>
          <div className={classes.cartContainer}>
            <Suspense fallback={<OpenCart />}>
              <Cart />
            </Suspense>
          </div>
        </div>
      </div>
      {menu.length ? <MegaMenu menu={menu} /> : null}
    </nav>
  );
}
