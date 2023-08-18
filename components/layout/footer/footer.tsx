// import { footerMenusQuery } from '@/lib/sanity/queries';
// import { getCachedClient } from '@/lib/sanity/sanity.client';
import LocaleSwitcher from 'components/ui/locale-switcher/locale-switcher';
import Logo from 'components/ui/logo/logo';
import Link from 'next/link';
import CopyRight from './copyright';

interface FooterProps {
  locale: string;
}

export default async function Footer({ locale }: FooterProps) {
  const params = {
    locale: locale
  };

  // const footerMenus = await getCachedClient()(footerMenusQuery, params);

  return (
    <footer className="border-t border-ui-border bg-app">
      <div className="mx-auto flex w-full flex-col">
        <div className="flex w-full items-center justify-between p-4 transition-colors duration-150 md:space-y-0 lg:px-8 lg:py-6 2xl:px-16 2xl:py-8">
          <Link href={`/${locale}`} className="flex flex-initial items-center font-bold md:mr-24">
            <Logo />
          </Link>
          <LocaleSwitcher />
        </div>

        {/* {footerMenus.length > 0 && (
          <div className="grid w-full grid-cols-2 gap-4 p-4 lg:grid-cols-4 lg:gap-8 lg:px-8 lg:py-6 2xl:px-16 2xl:py-8">
            {footerMenus.map((menu: object | any, index: number) => {
              return (
                <div key={index}>
                  <Text variant="label">{menu.title}</Text>
                  <ul className="mt-4 flex flex-col space-y-2" aria-label={menu.title}>
                    {menu.menu.links.map((link: object | any, index: number) => {
                      return (
                        <li className="text-sm" key={index}>
                          {link._type == 'linkInternal' ? (
                            <Link
                              className="hover:underline"
                              href={`${link.reference.slug.current}`}
                            >
                              {link.title}
                            </Link>
                          ) : (
                            <a
                              className="hover:underline"
                              href={link.url}
                              target={link.newWindow ? '_blank' : '_self'}
                            >
                              {link.title}
                            </a>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        )} */}

        <div className="flex items-center justify-center border-t border-ui-border bg-black px-4 py-3 lg:px-8 2xl:px-16">
          <CopyRight />
        </div>
      </div>
    </footer>
  );
}
