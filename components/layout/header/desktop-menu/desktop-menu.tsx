'use client';

import Link from 'next-intl/link';

export default function DesktopMenu({ items }: { items: [] }) {
  return (
    <ul className="flex gap-6">
      {items.map((item: { title: string; slug: string }, i: number) => {
        return (
          <li key={i}>
            <Link className="font-medium underline-offset-2 hover:underline" href={`${item.slug}`}>
              {item.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
