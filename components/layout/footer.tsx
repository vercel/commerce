import clsx from 'clsx';
import CartModal from 'components/cart/modal';
import FacebookIcon from 'components/icons/facebook';
import InstagramIcon from 'components/icons/instagram';
import KanjiLogo from 'components/icons/kanji';
import { Cart } from 'lib/shopify/types';
import Link from 'next/link';
import FooterMenu from './footer-menu';
import NewsletterFooter from './newsletter-footer';

const { COMPANY_NAME, SITE_NAME } = process.env;

export default async function Footer({ cart }: { cart?: Cart }) {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : '');
  const copyrightName = COMPANY_NAME || SITE_NAME || '';

  return (
    <footer className="px-6 text-sm">
      <div
        className={clsx(
          'mx-auto flex w-full max-w-screen-xl justify-between',
          'flex-col gap-6 py-12',
          'border-t border-subtle',
          'text-sm md:flex-row md:gap-12'
        )}
      >
        <div className="w-full md:w-1/2">
          <div className="flex flex-col space-y-24">
            <NewsletterFooter />
            <div className="flex flex-row items-end space-x-12">
              <KanjiLogo className="w-20" />
              <div className="flex flex-row items-end space-x-6">
                <div className="flex flex-col items-start space-y-2">
                  <p className="font-japan text-3xl font-extralight">杉の森酒造</p>
                  <p className="font-serif text-lg">suginomori brewery</p>
                </div>
                <div className="flex flex-col items-start space-y-2">
                  <p className="font-japan text-xl font-extralight">長野県塩尻市奈良井551-1</p>
                  <p className="font-serif text-lg">551-1 Narai, Shiojiri, Nagano</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden md:block md:w-1/3">
          <div className="flex h-full flex-col items-end justify-between space-y-2">
            <FooterMenu />
            <div className="flex flex-col space-y-2">
              <div className="flex flex-row justify-between space-x-4">
                <CartModal cart={cart} />
                <div className="flex flex-row items-center space-x-6">
                  <Link href="https://www.instagram.com/suginomoribrewery/" className="group">
                    <InstagramIcon className="h-8 stroke-transparent transition-all ease-in-out group-hover:scale-110" />
                  </Link>
                  <Link href="https://www.facebook.com/suginomoribrewery" className="group">
                    <FacebookIcon className="h-8 stroke-transparent transition-all ease-in-out group-hover:scale-110" />
                  </Link>
                </div>
              </div>
              <div className="text-right font-serif">
                <div>
                  &copy; {copyrightDate} {copyrightName}
                  {copyrightName.length && !copyrightName.endsWith('.') ? '.' : ''}
                </div>
                <div>All rights reserved.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pb-12 font-serif opacity-50"></div>
    </footer>
  );
}
