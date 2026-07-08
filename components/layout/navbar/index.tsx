import CartModal from "components/cart/modal";
import LogoSquare from "components/logo-square";
import { getMenu } from "lib/shopify";
import { Menu } from "lib/shopify/types";
import Link from "next/link";
import { Suspense } from "react";
import MobileMenu from "./mobile-menu";
import Search, { SearchSkeleton } from "./search";
import ThemeToggle from "./theme-toggle";

const SITE_NAME = process.env.SITE_NAME || "Lone Elk Coffee Company";

// Shown when no Shopify navigation menu is configured (fresh store, demo mode).
const FALLBACK_MENU: Menu[] = [{ title: "Shop", path: "/search" }];

export async function Navbar() {
  const shopifyMenu = await getMenu("next-js-frontend-header-menu");
  const menu = shopifyMenu.length ? shopifyMenu : FALLBACK_MENU;

  return (
    <nav className="sticky top-0 z-40 border-b border-seam bg-night/90 backdrop-blur-md">
      <div className="relative flex items-center justify-between p-4 lg:px-6">
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
              className="mr-2 flex w-full items-center justify-center gap-3 md:w-auto lg:mr-8"
            >
              <LogoSquare />
              <div className="flex-none leading-none md:hidden lg:block">
                <span className="font-display block text-base font-bold tracking-[0.22em] uppercase">
                  Lone Elk
                </span>
                <span className="mt-1 block font-mono text-[10px] tracking-[0.34em] text-bone/50 uppercase">
                  Coffee Co.
                </span>
              </div>
            </Link>
            <ul className="hidden gap-7 md:flex md:items-center">
              {menu.map((item: Menu) => (
                <li key={item.title}>
                  <Link
                    href={item.path}
                    prefetch={true}
                    className="font-display text-sm font-medium tracking-[0.22em] text-bone/60 uppercase transition-colors hover:text-bone"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="hidden justify-center md:flex md:w-1/3">
            <Suspense fallback={<SearchSkeleton />}>
              <Search />
            </Suspense>
          </div>
          <div className="flex justify-end gap-2 md:w-1/3">
            <ThemeToggle />
            <CartModal />
          </div>
        </div>
      </div>
    </nav>
  );
}
