'use client';

import clsx from 'clsx';
import { Menu } from 'lib/shopify/types';
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
    <li>
      <Link
        href={item.path}
        className={clsx(
          'block py-2 text-lg underline-offset-4 hover:underline md:inline-block md:text-sm',
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

function FooterMenu({ menu }: { menu: Menu[] }) {
  if (!menu.length) return null;

  return (
    <ul>
      {menu.map((item: Menu) => {
        return <FooterMenuItem key={item.title} item={item} />;
      })}
    </ul>
  );
}

export default function FooterMenuGrid({ menu }: { menu: Menu[] }) {
  if (!menu.length) return null;

  return (
    <nav className="ml-2 flex lg:ml-auto">
      <div className="grid w-full grid-cols-2 gap-0 md:grid-cols-3 lg:gap-4">
        {menu.map((item) => (
          <div key={item.title}>
            <span className="text-primary">{item.title}</span>
            <FooterMenu menu={item.items} />
          </div>
        ))}
      </div>
    </nav>
  );
}
