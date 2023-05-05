'use client'

import Logo from 'components/ui/logo/logo';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : '');
  const t = useTranslations('ui');

  return (
    <footer className="border-t border-ui-border bg-app">
      <div className="mx-auto w-full py-4 px-4 lg:py-6 lg:px-8 2xl:px-16 2xl:py-8">
        <div className="flex flex-col w-full space-y-2 items-center transition-colors duration-150 md:flex-row md:items-baseline md:justify-between md:space-y-0">
          <Link className="flex flex-initial items-center font-bold md:mr-24" href="/">
            <Logo />
          </Link>
          <p className="text-sm text-low-contrast">
            &copy; {copyrightDate} Kodamera - {t('copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;