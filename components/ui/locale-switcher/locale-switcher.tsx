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
  current: string;
  pageData: object;
}

export default function LocaleSwitcher({ current, pageData }: LocaleSwitcherProps) {
  const pathName = usePathname();

  console.log(pageData);

  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/';
    const segments = pathName.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <DropdownMenu open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
        <DropdownMenuTrigger asChild>
          <button
            className={
              'flex shrink-0 items-center justify-center space-x-1 rounded bg-app p-2 text-sm font-bold uppercase outline-none ring-2 ring-transparent transition duration-200 hover:ring-ui-border focus:ring-ui-border'
            }
            aria-label="Language selector"
          >
            <LanguageIcon className="h-6 w-6" />
            <span>{current}</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="drop-shadow-xl">
          <ul className="">
            {i18n.locales.map((locale) => {
              if (current === locale.id) {
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
