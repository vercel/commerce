'use client'

import Logo from 'components/ui/logo/logo';
import { useTranslations } from 'next-intl';

interface FooterProps {}

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : '');
  const t = useTranslations('ui');

  return (
    <footer className="border-t border-ui-border bg-app">
      <div className="mx-auto w-full py-2 px-4 lg:py-3 lg:px-8 2xl:px-16">
        <div className="flex w-full justify-between items-baseline my-12 transition-colors duration-150">
          <div className="">
            <a className="flex flex-initial items-center font-bold md:mr-24" href="/">
              <Logo />
            </a>
          </div>
          <p>
            &copy; {copyrightDate} - {t('copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;