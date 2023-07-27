import Link from 'next/link';
import Image from 'next/image';

import GitHubIcon from 'components/icons/github';
import FooterMenu from 'components/layout/footer-menu';
import LogoSquare from 'components/logo-square';
import { getMenu } from 'lib/shopware';
import { Menu } from 'lib/shopware/types';
import { Suspense } from 'react';

const { COMPANY_NAME, SITE_NAME } = process.env;

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : '');
  const skeleton = 'w-full h-6 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700';
  const menu = await getMenu({ type: 'footer-navigation', depth: 2 });
  const copyrightName = COMPANY_NAME || SITE_NAME || '';

  return (
    <footer className="border-t border-gray-700 bg-white text-black dark:bg-black dark:text-white">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-8 border-b border-gray-700 py-12 transition-colors duration-150 lg:grid-cols-12">
          <div className="col-span-1 lg:col-span-4">
            <Link className="flex items-center gap-2 text-black dark:text-white" href="/">
              <LogoSquare size="sm" />
              <span className="uppercase">{SITE_NAME}</span>
            </Link>
          </div>
          {menu.map((item: Menu) => (
            <nav className="col-span-1 lg:col-span-3" key={item.title + item.type}>
              {item.type === 'headline' ? <span className="font-bold">{item.title}</span> : null}
              {item.children.length > 0 ? (
                <ul className="py-3 md:py-0 md:pt-4" key={item.title}>
                  {item.children.map((item: Menu) => (
                    <li key={item.title} className="py-3 md:py-0 md:pb-4">
                      <Link
                        href={item.path}
                        className="text-gray-800 transition duration-150 ease-in-out hover:text-gray-300 dark:text-gray-100"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                // if there are no children, at least display a link
                <Link
                  key={item.title}
                  href={item.path}
                  className="text-gray-800 transition duration-150 ease-in-out hover:text-gray-300 dark:text-gray-100"
                >
                  {item.title}
                </Link>
              )}
            </nav>
          ))}
          <div className="col-span-1 inline-grid justify-items-end text-black dark:text-white lg:col-span-2">
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
            className="flex items-center gap-2 hover:text-black dark:hover:text-neutral-300"
            aria-label="Github Repository"
            href="https://github.com/vercel/commerce"
          >
            <GitHubIcon className="h-6" />
            <p>Source</p>
          </a>
        </div>
      </div>
      <div className="border-t border-neutral-200 py-6 text-sm dark:border-neutral-700">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-1 md:flex-row md:gap-0">
          <p>
            &copy; {copyrightDate} {copyrightName}
            {copyrightName.length && !copyrightName.endsWith('.') ? '.' : ''} All rights reserved.
          </p>
          <div className="flex items-center text-sm text-white dark:text-black">
            <span className="text-black dark:text-white">
              Created by Shopware Composable Frontends
            </span>
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
