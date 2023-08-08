'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import LanguageIcon from 'components/icons/language';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { supportedLanguages } from '../../../i18n-config';

// interface LocaleSwitcherProps {
// localeData: {
//   type: string;
//   locale: string;
//   translations: [];
// };
// }

export default function LocaleSwitcher() {
  const pathName = usePathname();
  const currentLocale = useLocale();
  const t = useTranslations('ui');

  // const translations = localeData.translations;

  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/';

    // if (translations.length > 0) {
    //   const translation = translations.find((obj) => {
    //     return obj['locale'] === locale;
    //   });

    //   if (translation) {
    //     const url = `/${translation['locale']}${translation['slug']}`;

    //     return url;
    //   }
    // }

    return `/${locale}`;
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <DropdownMenu open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
        <DropdownMenuTrigger
          className="relative flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors"
          aria-label={t('languageSelector')}
        >
          <LanguageIcon className="h-6 w-6" />
          <span className="sr-only">{currentLocale}</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-app">
          <ul className="">
            {supportedLanguages.locales.map((locale) => {
              return (
                <DropdownMenuItem className="p-0" key={locale.id}>
                  <Link
                    className={`flex w-full cursor-pointer items-center px-4 py-2 text-sm ${
                      currentLocale == locale.id && 'font-bold'
                    }`}
                    href={redirectedPathName(locale.id)}
                  >
                    {locale.title}
                  </Link>
                </DropdownMenuItem>
              );
            })}
          </ul>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
