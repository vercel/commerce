'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function DesktopMenu({ items, locale }: { items: []; locale: string }) {
  const t = useTranslations('routes');
  return (
    <ul className="flex gap-6">
      {items.map((item: { title: string; slug: string }, i: number) => {
        return (
          <li key={i}>
            <Link
              className="font-medium underline-offset-2 hover:underline"
              href={`/${locale}/${t('category')}/${item.slug}`}
            >
              {item.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
