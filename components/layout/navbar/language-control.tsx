'use client';

import clsx from 'clsx';
import Link from 'next-intl/link';
import { usePathname } from 'next/navigation';

export type SupportedLocale = 'en' | 'ja' | undefined;

function removeItem<T>(arr: Array<T>, value: T): Array<T> {
  const index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

export const LanguageControl = ({ lang }: { lang?: SupportedLocale }) => {
  const pathName = usePathname();

  const basePathName = () => {
    const unjoined = pathName.split('/');
    const unjoinedWithoutLocale = removeItem(unjoined, 'ja');
    return unjoinedWithoutLocale.join('/') || '/';
  };

  return (
    <div className="flex flex-row space-x-0">
      <span className="px-2 py-4">
        <Link
          href={basePathName()}
          className={clsx(
            lang === 'ja' ? 'opacity-100' : 'opacity-50 hover:opacity-70',
            'transition-opacity duration-150'
          )}
          scroll={false}
          locale="ja"
        >
          JP
        </Link>
      </span>
      <span className="py-4">/</span>
      <span className="px-2 py-4">
        <Link
          href={basePathName()}
          className={clsx(
            lang === 'en' ? 'opacity-100' : 'opacity-50 hover:opacity-70',
            'transition-opacity duration-150'
          )}
          scroll={false}
          locale="en"
        >
          EN
        </Link>
      </span>
    </div>
  );
};
