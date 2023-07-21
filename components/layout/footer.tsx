import Link from 'next/link';
import Image from 'next/image';

import GitHubIcon from 'components/icons/github';
import LogoIcon from 'components/icons/logo';
import { getMenu } from 'lib/shopware';
import { Menu } from 'lib/shopware/types';

const { SITE_NAME } = process.env;

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : '');
  const menu = await getMenu({ type: 'footer-navigation', depth: 2 });

  return (
    <footer className="border-t border-gray-700 bg-white text-black dark:bg-black dark:text-white">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-8 border-b border-gray-700 py-12 transition-colors duration-150 lg:grid-cols-12">
          <div className="col-span-1 lg:col-span-4">
            <a className="flex flex-initial items-center font-bold" href="/">
              <span className="mr-4">
                <LogoIcon className="h-8" />
              </span>
              <span>{SITE_NAME}</span>
            </a>
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
        <div className="flex flex-col items-center justify-between space-y-4 pb-10 pt-6 text-sm md:flex-row">
          <p>
            &copy; {copyrightDate} {SITE_NAME}. All rights reserved.
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
