'use client';

import clsx from 'clsx';
import { Menu } from 'lib/shopware/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const FooterMenuItem = ({ item }: { item: Menu }) => {
  const pathname = usePathname();
  const [active, setActive] = useState(pathname === item.path);

  useEffect(() => {
    setActive(pathname === item.path);
  }, [pathname, item.path]);

  return (
    <li key={item.title} className="mt-2 first:mt-1">
      <Link
        href={item.path}
        className={clsx(
          'underline-offset-4 hover:text-black hover:underline dark:hover:text-neutral-300',
          {
            'text-black dark:text-neutral-300': active
          }
        )}
      >
        {item.title}
      </Link>
    </li>
  );
};

export default function FooterMenu({ menu }: { menu: Menu[] }) {
  if (!menu.length) return null;

  return menu.map((item: Menu) => (
    <nav className="col-span-1 lg:col-span-3" key={item.title + item.type}>
      {item.type === 'headline' ? <span className="font-bold">{item.title}</span> : null}
      {item.children.length > 0 ? (
        <ul className="py-3 md:py-0 md:pt-4" key={item.title}>
          {item.children.map((item: Menu) => (
            <FooterMenuItem key={item.title} item={item} />
          ))}
        </ul>
      ) : (
        // if there are no children, at least display a link
        <Link
          key={item.title}
          href={item.path}
          className="text-gray-800 transition duration-150 ease-in-out hover:text-gray-300 dark:text-gray-100"
        >
          {item.title}
        </Link>
      )}
    </nav>
  ));
}
