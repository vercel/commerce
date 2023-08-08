'use client';

import { useTranslations } from 'next-intl';

export default function CopyRight() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : '');
  const t = useTranslations('ui');

  return (
    <p className="text-xs text-white">
      &copy; {copyrightDate} Kodamera - {t('copyright')}
    </p>
  );
}
