import { getMenu } from 'lib/shopify';
import NewsletterFooter from './newsletter-footer';

const { COMPANY_NAME, SITE_NAME } = process.env;

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : '');
  const skeleton = 'w-full h-6 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700';
  const menu = await getMenu('next-js-frontend-footer-menu');
  const copyrightName = COMPANY_NAME || SITE_NAME || '';

  return (
    <footer className="text-sm">
      <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-6 border-t border-white/20 px-6 py-12 text-sm md:flex-row md:gap-12">
        <div className="flex flex-row justify-between">
          <NewsletterFooter />
        </div>
      </div>
      <div>
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-1 pb-12 md:flex-row">
          <p>
            &copy; {copyrightDate} {copyrightName}
            {copyrightName.length && !copyrightName.endsWith('.') ? '.' : ''} All rights reserved.
          </p>
          <hr className="mx-4 hidden h-4 w-[1px] border-l border-neutral-400 md:inline-block" />
          <p>Designed in Japan</p>
        </div>
      </div>
    </footer>
  );
}
