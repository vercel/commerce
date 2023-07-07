import Link from 'next/link';

import GitHubIcon from 'components/icons/github';
import FooterMenu from 'components/layout/footer-menu';
import LogoSquare from 'components/logo-square';
import { getMenu } from 'lib/shopify';
import { Suspense } from 'react';

const { SITE_NAME } = process.env;

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : '');
  const skeleton = 'w-full h-6 animate-pulse rounded bg-gray-200 dark:bg-gray-700';
  const menu = await getMenu('next-js-frontend-footer-menu');

  return (
    <footer className="text-gray-400 dark:text-gray-500">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 border-t border-gray-200 px-6 py-12 dark:border-gray-700 md:flex-row md:gap-12 md:px-0">
        <div>
          <Link className="flex items-center gap-2 text-black dark:text-white" href="/">
            <LogoSquare size="sm" />
            <span className="font-bold uppercase">{SITE_NAME}</span>
          </Link>
        </div>
        <Suspense
          fallback={
            <div className="flex h-[188px] w-[200px] flex-col gap-2">
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
            </div>
          }
        >
          <FooterMenu menu={menu} />
        </Suspense>
        <div className="md:ml-auto">
          <a
            className="flex items-center gap-2 hover:text-black dark:hover:text-white"
            aria-label="Github Repository"
            href="https://github.com/vercel/commerce"
          >
            <GitHubIcon className="h-6" />
            <p>Source</p>
          </a>
        </div>
      </div>
      <div className="border-t border-gray-200 py-6 text-sm dark:border-gray-700">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-1 md:flex-row md:gap-0">
          <p>
            &copy; {copyrightDate} {SITE_NAME}. All rights reserved.
          </p>
          <hr className="mx-4 hidden h-4 w-[1px] border-l border-gray-400 md:inline-block" />
          <p>Designed in California</p>
          <p className="md:ml-auto">
            Crafted by{' '}
            <a href="https://vercel.com" className="text-black dark:text-white">
              ▲ Vercel
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
