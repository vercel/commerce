'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function ShopsNav() {
  const t = useTranslations('Index');
  return (
    <div>
      <div className="font-multilingual flex flex-row items-baseline space-x-6 pb-12">
        <Link href="/#shops" className="transition-opacity duration-150 hover:opacity-60">
          <span className="flex flex-row items-center space-x-4">
            <span>←</span>
            <span>{t('shops.title')}</span>
          </span>
        </Link>
        <div>|</div>
        <div className="font-multilingual font-medium">{t('company.name.value')}</div>
      </div>
    </div>
  );
}
