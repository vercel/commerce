'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export type SupportedLocales = 'en' | 'ja' | undefined;

export const LanguageControl = ({ lang }: { lang?: SupportedLocales }) => {
  const pathName = usePathname();
  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/';
    const segments = pathName.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  return (
    <div className="flex flex-row space-x-0">
      <span className="px-2 py-4">
        <Link
          href={redirectedPathName('ja')}
          className={clsx(
            lang === 'ja' ? 'opacity-100' : 'opacity-50 hover:opacity-70',
            'transition-opacity duration-150'
          )}
          scroll={false}
        >
          JP
        </Link>
      </span>
      <span className="py-4">/</span>
      <span className="px-2 py-4">
        <Link
          href={redirectedPathName('en')}
          className={clsx(
            lang === 'en' ? 'opacity-100' : 'opacity-50 hover:opacity-70',
            'transition-opacity duration-150'
          )}
          scroll={false}
        >
          EN
        </Link>
      </span>
    </div>
  );
};
