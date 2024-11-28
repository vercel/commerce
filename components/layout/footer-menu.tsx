'use client';

import clsx from 'clsx';
import { MenuItemType } from 'lib/geins/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function FooterMenuItem({ item }: { item: MenuItemType }) {
  const pathname = usePathname();
  const [active, setActive] = useState(pathname === item.path);

  useEffect(() => {
    setActive(pathname === item.path);
  }, [pathname, item.path]);

  return (
    <li>
      <Link
        href={item.path}
        className={clsx(
          'block p-2 text-lg underline-offset-4 hover:text-black hover:underline md:inline-block md:text-sm dark:hover:text-neutral-300',
          {
            'text-black dark:text-neutral-300': active
          }
        )}
      >
        {item.title}
      </Link>
    </li>
  );
}

export default function FooterMenu({ menu }: { menu: MenuItemType[] }) {
  if (!menu.length) return null;

  return (
    <nav>
      <ul>
        {menu.map((item: MenuItemType) => {
          return <FooterMenuItem key={item.title} item={item} />;
        })}
      </ul>
    </nav>
  );
}
