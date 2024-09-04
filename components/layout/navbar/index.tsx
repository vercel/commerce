import Link from 'next/link';
import { Suspense } from 'react';

import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import Logo from 'components/icons/logo';
import { SearchSkeleton } from './search';

export async function Navbar() {
  return (
    <nav className="absolute left-0 top-0 z-10 flex w-full items-center px-[4.38rem] py-[3.12rem]">
      <div className="flex w-full items-center justify-between">
        {/* burger menu */}
        <div className="block flex-none">
          <Bars3Icon width={24} height={24} color="white" />
        </div>
        {/* logo */}
        <div className="justify-center md:flex md:w-1/3">
          <Suspense fallback={<SearchSkeleton />}>
            <Link href="/" prefetch={true}>
              <Logo />
            </Link>
          </Suspense>
        </div>
        {/* 3 icons */}
        <div className="flex justify-between gap-[1.88rem]">
          <MagnifyingGlassIcon width={16} height={16} color="white" />
          <UserIcon width={16} height={16} fill="white" color="white" />
          <ShoppingBagIcon width={16} height={16} fill="white" color="white" />
        </div>
      </div>
    </nav>
  );
}
