'use client';
import { useTranslations } from 'next-intl';

export default function AboutNaraiPreview() {
  const t = useTranslations('Index');

  return (
    <div className="flex flex-row space-x-2 p-24">
      <div className="font-multilingual flex flex-col space-y-2 font-extralight md:w-1/2">
        <div className="text-5xl">{t('home.previews.about-narai.title')}</div>
        <div className="text-5xl">{t('home.previews.about-narai.subtitle')}</div>
      </div>
      <div className="font-multilingual flex flex-col space-y-2 font-extralight md:w-1/2">
        <div>{t('home.previews.about-narai.body')}</div>
      </div>
    </div>
  );
}
