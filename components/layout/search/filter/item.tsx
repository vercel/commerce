'use client';

import clsx from 'clsx';
import { SortFilterItem } from 'lib/constants';
import { createUrl } from 'lib/utils';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { ListItem, PathFilterItem } from '.';

function PathFilterItem({ item }: { item: PathFilterItem }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [active, setActive] = useState(pathname === item.path);
  const newParams = new URLSearchParams(searchParams.toString());

  newParams.delete('q');

  useEffect(() => {
    setActive(pathname === item.path);
  }, [pathname, item.path]);

  return (
    <li className="mt-2 flex text-black dark:text-white" key={item.title}>
      <Link
        href={createUrl(item.path, newParams)}
        className={clsx(
          'w-full text-sm underline-offset-4 hover:underline dark:hover:text-gray-100',
          {
            'underline underline-offset-4': active
          }
        )}
      >
        {item.title}
      </Link>
    </li>
  );
}

function SortFilterItem({ item }: { item: SortFilterItem }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [active, setActive] = useState(searchParams.get('sort') === item.slug);
  const q = searchParams.get('q');

  useEffect(() => {
    setActive(searchParams.get('sort') === item.slug);
  }, [searchParams, item.slug]);

  const href =
    item.slug && item.slug.length
      ? createUrl(
          pathname,
          new URLSearchParams({
            ...(q && { q }),
            sort: item.slug
          })
        )
      : pathname;

  return (
    <li className="mt-2 flex text-sm text-black dark:text-white" key={item.title}>
      <Link
        prefetch={false}
        href={href}
        className={clsx('w-full', {
          'underline underline-offset-4': active
        })}
      >
        {item.title}
      </Link>
    </li>
  );
}

export function FilterItem({ item }: { item: ListItem }) {
  return 'path' in item ? <PathFilterItem item={item} /> : <SortFilterItem item={item} />;
}
