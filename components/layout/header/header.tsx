import Logo from 'components/ui/logo/logo';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import HeaderRoot from './header-root';

const Header = () => {
  const locale = useLocale();

  return (
    <HeaderRoot>
      <div className="relative flex flex-col">
        <div className="relative flex h-14 w-full items-center justify-between px-4 py-2 lg:h-16 lg:px-8 lg:py-3 2xl:px-16">
          <div className="flex items-center">
            <Link
              href={`/${locale}`}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform cursor-pointer duration-100 ease-in-out lg:relative lg:left-0 lg:top-0 lg:translate-x-0 lg:translate-y-0"
              aria-label="Logo"
            >
              <Logo />
            </Link>
          </div>

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
            Menu
          </div>
        </div>
      </div>
    </HeaderRoot>
  );
};

export default Header;
