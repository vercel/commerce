'use client';
import ConceptImage001 from '@images/concept-images/concept-image-001.webp';
import ConceptImage002 from '@images/concept-images/concept-image-002.webp';
import clsx from 'clsx';
import Logo from 'components/icons/logo';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function ConceptDetail() {
  const t = useTranslations('Index');

  return (
    <div className="w-full px-6">
      <div className="max-w-screen-2x relative mx-auto">
        <Image
          src={ConceptImage001}
          priority={true}
          alt="A picture of the Narai Black bottle resting on a mossy forest floor."
          className={clsx('h-full w-full object-cover')}
        />
      </div>

      <div
        className={clsx(
          'font-multilingual mx-auto flex w-full flex-col space-y-12 py-12',
          'text-left font-extralight md:flex-row md:space-x-6 md:space-y-0 md:py-24',
          'mx-auto max-w-screen-xl'
        )}
      >
        <div className="md:w-1/2">
          <h2 className="max-w-sm pb-12 text-4xl md:text-5xl">{t('concept.title')}</h2>
          <p className="font-multilingual text-base font-extralight">
            {t('concept.para001')} {t('concept.para002')} {t('concept.para003')}
          </p>
          <div className="font-multilingual pt-24 font-extralight">
            <p className="pb-6 text-xl font-normal">{t('concept.subtitle001')}</p>
            <p className="pb-24 text-base leading-relaxed">{t('concept.para004')}</p>
            <p className="pb-6 text-xl font-normal">{t('concept.subtitle002')}</p>
            <p className="pb-4 text-base leading-relaxed">{t('concept.para005')}</p>
            <p className="pb-4 text-base leading-relaxed">
              {t('concept.para006')} {t('concept.para007')} {t('concept.para008')}
            </p>
            <p className="pb-4 text-base leading-relaxed">{t('concept.para009')}</p>
            <p className="text-base leading-relaxed">{t('concept.para010')}</p>
          </div>
        </div>
        <div className="flex flex-row items-start justify-end md:w-1/2">
          <div className="pb-24">
            <Logo className="h-30 w-48" />
          </div>
        </div>
      </div>

      <div className="mx-auto flex flex-col space-y-24">
        <Image
          src={ConceptImage002}
          priority={true}
          alt="A picture of the forest tree tops."
          className={clsx('h-full w-full object-cover')}
        />
      </div>
    </div>
  );
}
