import clsx from 'clsx';
import CartModal from 'components/cart/modal';
import FacebookIcon from 'components/icons/facebook';
import InstagramIcon from 'components/icons/instagram';
import KanjiLogo from 'components/icons/kanji';
import { Cart, Product } from 'lib/shopify/types';
import Link from 'next/link';
import { Suspense } from 'react';
import FooterMenu from './footer-menu';
import NewsletterFooter from './newsletter-footer';

const { COMPANY_NAME, SITE_NAME } = process.env;

export default async function Footer({
  cart,
  promotedItem
}: {
  cart?: Cart;
  promotedItem?: Product;
}) {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : '');
  const copyrightName = COMPANY_NAME || SITE_NAME || '';

  return (
    <footer className="px-6 text-sm">
      <div
        className={clsx(
          'mx-auto flex w-full max-w-screen-xl justify-between',
          'flex-col gap-6 py-6 md:py-12',
          'border-t border-subtle',
          'text-sm md:flex-row md:gap-12'
        )}
      >
        <div className="w-full md:w-[60%]">
          <div className="flex flex-col space-y-24">
            <NewsletterFooter />
            <div className="hidden flex-row items-end space-x-12 pt-24 md:flex">
              <Link
                href="/"
                className="transition-opacity duration-150 hover:opacity-90"
                aria-label="Go to homepage"
              >
                <KanjiLogo className="h-64" />
              </Link>
              <div className="flex flex-row items-end space-x-6">
                <div className="flex flex-col items-start space-y-2">
                  <p className="font-japan text-3xl font-extralight">杉の森酒造</p>
                  <p className="font-serif text-xs font-semibold">suginomori brewery</p>
                </div>
                <div className="flex flex-col items-start space-y-2">
                  <p className="font-japan text-lg font-extralight md:text-xl">
                    長野県塩尻市奈良井551-1
                  </p>
                  <p className="font-serif text-xs font-semibold">551-1 Narai, Shiojiri, Nagano</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-[40%]">
          <div className="flex w-full flex-row items-end space-x-12 pt-24 md:hidden">
            <Link
              href="/"
              className="transition-opacity duration-150 hover:opacity-90"
              aria-label="Go to homepage"
            >
              <KanjiLogo className="h-64" />
            </Link>
            <div className="flex grow flex-col space-y-6 md:items-end">
              <div className="flex flex-col items-start space-y-2">
                <p className="font-japan text-[22px] font-extralight">杉の森酒造</p>
                <p className="font-serif text-lg">suginomori brewery</p>
              </div>
              <div className="flex flex-col items-start space-y-2">
                <p className="font-japan text-sm font-extralight md:text-[17px]">
                  長野県塩尻市奈良井551-1
                </p>
                <p className="font-serif text-sm md:text-lg">551-1 Narai, Shiojiri, Nagano</p>
              </div>
              <div className="flex flex-row justify-between space-x-4">
                <div className="flex flex-row items-center space-x-6">
                  <Link
                    href="https://www.instagram.com/suginomoribrewery/"
                    className="group"
                    aria-label="Visit on Instagram"
                  >
                    <InstagramIcon className="h-6 stroke-transparent transition-all ease-in-out group-hover:scale-110" />
                  </Link>
                  <Link
                    href="https://www.facebook.com/suginomoribrewery"
                    className="group"
                    aria-label="Visit on Facebook"
                  >
                    <FacebookIcon className="h-6 stroke-transparent transition-all ease-in-out group-hover:scale-110" />
                  </Link>
                </div>
              </div>
              <div className="font-serif md:text-right">
                <div>
                  &copy; {copyrightDate} {copyrightName}
                  {copyrightName.length && !copyrightName.endsWith('.') ? '.' : ''}
                </div>
              </div>
            </div>
          </div>

          <div className="hidden h-full flex-col items-end justify-between space-y-2 md:flex">
            <div className="">
              <FooterMenu />
            </div>

            <div className="flex flex-col space-y-2 pt-24">
              <div className="flex flex-row justify-between space-x-4">
                <Suspense>
                  <CartModal cart={cart} promotedItem={promotedItem} />
                </Suspense>
                <div className="flex flex-row items-center space-x-6">
                  <Link
                    href="https://www.instagram.com/narai.sake/"
                    className="group"
                    rel="noopener noreferrer"
                    target="_blank"
                    aria-label="Visit on Instagram"
                  >
                    <InstagramIcon className="h-6 stroke-transparent transition-all ease-in-out group-hover:scale-110" />
                  </Link>
                  <Link
                    href="https://www.facebook.com/narai.sake"
                    className="group"
                    rel="noopener noreferrer"
                    target="_blank"
                    aria-label="Visit on Facebook"
                  >
                    <FacebookIcon className="h-6 stroke-transparent transition-all ease-in-out group-hover:scale-110" />
                  </Link>
                </div>
              </div>
              <div className="text-right font-serif">
                <div>
                  &copy; {copyrightDate} {copyrightName}
                  {copyrightName.length && !copyrightName.endsWith('.') ? '.' : ''}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pb-12 font-serif opacity-50"></div>
    </footer>
  );
}
