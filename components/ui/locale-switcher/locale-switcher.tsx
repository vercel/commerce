import LanguageIcon from 'components/icons/language';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from 'components/ui/dropdown/dropdown';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { i18n } from '../../../i18n-config';

interface LocaleSwitcherProps {
  currentLocale: string;
  localeData: {
    type: string;
    locale: string;
    translations: [];
  };
}

export default function LocaleSwitcher({ currentLocale, localeData }: LocaleSwitcherProps) {
  const pathName = usePathname();
  const translations = localeData.translations;

  const redirectedPathName = (locale: string) => {
    if (!pathName || translations.length === 0) return '/';

    if (translations.length > 0) {
      const translation = translations.find((obj) => {
        return obj['locale'] === locale;
      });

      if (translation) {
        const url = `/${translation['locale']}${translation['slug']}`;

        return url;
      }
    }

    return '/';
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <DropdownMenu open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
        <DropdownMenuTrigger asChild>
          <button
            className={
              'flex shrink-0 items-center justify-center space-x-1 rounded bg-app p-2 text-xs font-bold uppercase outline-none ring-2 ring-transparent transition duration-200 hover:ring-ui-border focus:ring-ui-border'
            }
            aria-label="Language selector"
          >
            <LanguageIcon className="h-6 w-6" />
            <span>{currentLocale}</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="drop-shadow-xl">
          <ul className="">
            {i18n.locales.map((locale) => {
              if (currentLocale === locale.id) {
                return;
              } else {
                return (
                  <li className="" key={locale.id}>
                    <Link
                      className="flex w-full cursor-pointer px-4 py-2 text-sm"
                      href={redirectedPathName(locale.id)}
                    >
                      {locale.title}
                    </Link>
                  </li>
                );
              }
            })}
          </ul>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
