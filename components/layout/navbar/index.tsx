import Cart from 'components/cart';
import OpenCart from 'components/cart/open-cart';
import type { Locale } from 'i18n-config';
import { Suspense } from 'react';
import { MenuModal } from '../menu/modal';

export default async function Navbar({ lang }: { lang: Locale }) {
  return (
    <nav className="fixed right-0 top-6 z-10 md:top-12">
      <div className="flex justify-end pr-5">
        <Suspense fallback={<OpenCart />}>
          <div className="flex flex-col-reverse items-center justify-center space-y-2 rounded bg-dark/40 px-2 backdrop-blur-sm md:flex-row md:space-x-6">
            <Cart />
            <MenuModal lang={lang} />
          </div>
        </Suspense>
      </div>
    </nav>
  );
}
