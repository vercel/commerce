'use client';
import { useTranslations } from 'next-intl';

export default function AboutNaraiPreview() {
  const t = useTranslations('Index');

  return (
    <div className="flex flex-col space-y-4 px-6 py-24 md:flex-row md:space-x-12 md:space-y-0 md:p-24">
      <div className="font-multilingual flex flex-col space-y-2 font-extralight md:w-1/2">
        <div className="max-w-title text-[40px]">{t('home.previews.about-narai.title')}</div>
        <div className="max-w-sm text-[40px]">{t('home.previews.about-narai.subtitle')}</div>
      </div>
      <div className="font-multilingual flex flex-col space-y-6 text-base font-extralight md:w-1/2">
        <div>{t('home.previews.about-narai.body')}</div>
      </div>
    </div>
  );
}
