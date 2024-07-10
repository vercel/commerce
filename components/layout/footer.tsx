import Link from 'next/link';

import FooterMenu from 'components/layout/footer-menu';
import LogoSquare from 'components/logo-square';
import { phoneNumber } from 'lib/constants';
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
            <LogoSquare dark />
          </Link>
          <a href={phoneNumber?.link} className="ml-2 text-white">
            {phoneNumber?.title}
          </a>
          <p className="ml-2">Monday - Friday 9:00am - 8:00pm EST</p>
          <p className="ml-2">Saturday 11:00am - 4:00pm EST</p>
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
            <Image
              alt="visa"
              src="/icons/visa.png"
              width={30}
              height={30}
              className="h-auto w-[30px]"
            />
            <Image
              alt="mastercard"
              src="/icons/mastercard.png"
              width={30}
              height={30}
              className="h-auto w-[30px]"
            />
            <Image
              alt="american-express"
              src="/icons/american-express.png"
              width={30}
              height={30}
              className="h-auto w-[30px]"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
