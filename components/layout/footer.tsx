import clsx from 'clsx';
import FooterMenu from './footer-menu';
import NewsletterFooter from './newsletter-footer';

const { COMPANY_NAME, SITE_NAME } = process.env;

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : '');
  const copyrightName = COMPANY_NAME || SITE_NAME || '';

  return (
    <footer className="px-6 text-sm">
      <div
        className={clsx(
          'mx-auto flex w-full max-w-screen-2xl justify-between',
          'flex-col gap-6 py-12',
          'border-t border-subtle',
          'text-sm md:flex-row md:gap-12'
        )}
      >
        <div className="w-full md:w-1/2">
          <NewsletterFooter />
        </div>
        <div className="hidden md:block md:w-1/3">
          <FooterMenu />
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
