'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function ShopsTitle() {
  const t = useTranslations('Index');
  return (
    <div>
      <div className="flex flex-row items-baseline space-x-6 pb-12">
        <Link href="/#shops">
          <span className="flex flex-row items-center space-x-1.5">
            <span>←</span>
            <span>{t('shops.all')}</span>
          </span>
        </Link>
        <div>|</div>
        <div className="font-medium">{t('shops.title')}</div>
      </div>
    </div>
  );
}
