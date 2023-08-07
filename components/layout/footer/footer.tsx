import LocaleSwitcher from 'components/ui/locale-switcher/locale-switcher';
import Logo from 'components/ui/logo/logo';
import Link from 'next/link';
import CopyRight from './copyright';

// interface FooterProps {
//   localeData: {
//     type: string;
//     locale: string;
//     translations: [];
//   };
// }

const Footer = () => {
  return (
    <footer className="border-t border-ui-border bg-app">
      <div className="mx-auto flex w-full flex-col">
        <div className="flex w-full flex-col items-center space-y-2 p-4 transition-colors duration-150 md:flex-row md:items-baseline md:justify-between md:space-y-0 lg:px-8 lg:py-6 2xl:px-16 2xl:py-8">
          <Link className="flex flex-initial items-center font-bold md:mr-24" href="/">
            <Logo />
          </Link>
          <LocaleSwitcher />
        </div>
        <div className="flex items-center justify-center border-t border-ui-border bg-black px-4 py-3 lg:px-8 2xl:px-16">
          <CopyRight />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
