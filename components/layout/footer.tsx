import Link from 'next/link';

import FooterMenu from 'components/layout/footer-menu';
import LogoSquare from 'components/logo-square';
import { getMenu } from 'lib/shopify';
import Image from 'next/image';
import { Suspense } from 'react';

const { COMPANY_NAME, SITE_NAME } = process.env;

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : '');
  const skeleton = 'w-full h-6 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700';
  const menu = await getMenu('footer');
  const copyrightName = COMPANY_NAME || SITE_NAME || '';

  return (
    <footer className="bg-dark text-sm text-white">
      <div className="mx-auto flex w-full max-w-7xl flex-row flex-wrap items-start gap-6 px-6 py-12 text-sm md:gap-12 md:px-4 min-[1320px]:px-0">
        <div className="flex flex-col gap-1">
          <Link className="flex items-center text-white md:pt-1" href="/">
            <LogoSquare sm />
            <span className="font-league-spartan text-xl leading-tight tracking-tight">
              {SITE_NAME}
            </span>
          </Link>
          <a href={`tel:${8882422605}`} className="ml-4 text-white">
            (888) 242-2605
          </a>
          <p className="ml-4">Monday - Friday 9:00am - 8:00pm EST</p>
          <p className="ml-4">Saturday 11:00am - 4:00pm EST</p>
          {/* <div className="ml-4 mt-3 flex flex-row items-center gap-4">
            <a href="https://www.facebook.com/carpartplanet" target="_blank" rel="noreferrer">
              <Image alt="facebook" src="/icons/facebook.png" width={20} height={20} />
            </a>
            <a href="https://www.instagram.com/carpartplanet" target="_blank" rel="noreferrer">
              <Image alt="instagram" src="/icons/instagram.png" width={20} height={20} />
            </a>
            <a
              href="https://www.youtube.com/channel/UC8CxAf0QAozd2g0clMhkmKA/videos"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                alt="youtube"
                src="/icons/youtube.png"
                width={20}
                height={20}
                className="mt-1"
              />
            </a>
            <a href="https://www.pinterest.com/carpartplanet" target="_blank" rel="noreferrer">
              <Image alt="pinterest" src="/icons/pinterest.png" width={20} height={20} />
            </a>
            <a href="https://twitter.com/carpartplanet" target="_blank" rel="noreferrer">
              <Image alt="twitter" src="/icons/twitter.png" width={16} height={16} />
            </a>
          </div> */}
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
      </div>
      <div className="border-t border-neutral-200 py-6 text-sm dark:border-neutral-700">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-1 px-4 md:flex-row md:gap-0 md:px-4 min-[1320px]:px-0">
          <p>
            &copy; {copyrightDate} {copyrightName}
            {copyrightName.length && !copyrightName.endsWith('.') ? '.' : ''} All rights reserved.
          </p>
          <div className="ml-0 flex flex-row items-center gap-2 md:ml-auto">
            <Image alt="visa" src="/icons/visa.png" width={30} height={20} />
            <Image alt="mastercard" src="/icons/mastercard.png" width={30} height={20} />
            <Image
              alt="american-express"
              src="/icons/american-express.png"
              width={30}
              height={20}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
