import Cart from 'components/cart';
import OpenCart from 'components/cart/open-cart';
import Menu from 'components/menu';
import { Suspense } from 'react';

export default async function Navbar() {
  return (
    <nav className="sticky top-12 z-10">
      <div className="flex w-full justify-end pr-12">
        <Suspense fallback={<OpenCart />}>
          <div className="flex flex-row items-center justify-center space-x-6">
            <Cart />
            <Menu />
          </div>
        </Suspense>
      </div>
    </nav>
  );
}
