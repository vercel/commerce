import Link from 'next/link';
import Image from 'next/image';

import FooterMenu from 'components/layout/footer-menu';
import LogoSquare from 'components/logo-square';
import GitHubIcon from 'components/icons/github';
import { getMenu } from 'lib/shopware';
import { Suspense } from 'react';

const { COMPANY_NAME, SITE_NAME } = process.env;

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : '');
  const skeleton = 'w-full h-6 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700';
  const menu = await getMenu({ type: 'footer-navigation', depth: 2 });
  const copyrightName = COMPANY_NAME || SITE_NAME || '';

  return (
    <footer className="text-sm text-neutral-500 dark:text-neutral-400">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 border-t border-neutral-200 px-6 py-12 text-sm dark:border-neutral-700 md:flex-row md:gap-12 md:px-4 min-[1320px]:px-0">
        <div className="grid grid-cols-1 gap-8 transition-colors duration-150 lg:grid-cols-12">
          <div className="col-span-1 lg:col-span-3">
            <Link className="flex items-center gap-2 text-black dark:text-white md:pt-1" href="/">
              <LogoSquare size="sm" />
              <span className="uppercase">{SITE_NAME}</span>
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
              aria-label="Github Repository"
              href="https://github.com/shopware/frontends"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon className="h-6" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-neutral-200 py-6 text-sm dark:border-neutral-700">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-1 px-4 md:flex-row md:gap-0 md:px-4 min-[1320px]:px-0">
          <p>
            &copy; {copyrightDate} {copyrightName}
            {copyrightName.length && !copyrightName.endsWith('.') ? '.' : ''} All rights reserved.
          </p>
          <hr className="mx-4 hidden h-4 w-[1px] border-l border-neutral-400 md:inline-block" />
          <p>Created by Shopware Composable Frontends</p>
          <div className="md:ml-auto">
            <a
              rel="noopener noreferrer"
              href="https://frontends.shopware.com/"
              aria-label="Shopware Composable Frontends Link"
              target="_blank"
              className="text-black dark:text-white"
            >
              <div className="ml-4 h-auto w-10">
                <Image
                  src="https://www.shopware.com/media/pages/solutions/shopware-frontends/shopware-frontends-intro-graphic-base.svg"
                  alt="Shopware Composable Frontends Logo"
                  width={40}
                  height={40}
                ></Image>
              </div>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
