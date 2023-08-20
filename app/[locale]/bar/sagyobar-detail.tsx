'use client';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import BarImage001 from './images/bar-image-001.jpg';
import BarImage002 from './images/bar-image-002.jpg';
import BarImage003 from './images/bar-image-003.jpg';
import BarImage004 from './images/bar-image-004.jpg';
import BarImage005 from './images/bar-image-005.jpg';
import BarImage006 from './images/bar-image-006.jpg';

export default function SagyobarDetail() {
  const t = useTranslations('Index');

  return (
    <div className="w-full px-6">
      <div className="max-w-screen-2x relative mx-auto">
        <Image
          src={BarImage001}
          priority={true}
          alt="A picture of the exterior of the bar building."
          className={clsx('h-full w-full object-cover')}
        />
      </div>

      <div
        className={clsx(
          'font-multilingual mx-auto flex w-full flex-col space-y-12 py-12 text-left font-extralight md:flex-row md:space-x-6 md:space-y-0 md:py-24 md:pb-24'
        )}
      >
        <div className="md:w-1/2">
          <h2 className="max-w-sm text-4xl md:text-5xl">{t('bar.001.title')}</h2>
          <h2 className="max-w-sm text-4xl md:text-5xl">{t('bar.001.subtitle')}</h2>
        </div>
        <div className="flex flex-col space-y-12 md:w-1/2">
          <p className="text-base leading-loose">{t('bar.001.para001')}</p>
          <p className="text-base leading-loose">{t('bar.001.para002')}</p>
        </div>
      </div>

      <div className="max-w-screen-2x relative mx-auto flex flex-col space-y-24">
        <Image
          src={BarImage002}
          priority={true}
          alt="A picture of the bar building."
          className={clsx('h-full w-full object-cover')}
        />
        <Image
          src={BarImage003}
          priority={true}
          alt="A picture of the exterior of the bar building."
          className={clsx('h-full w-full object-cover')}
        />
        <Image
          src={BarImage004}
          priority={true}
          alt="A picture of the interior of the bar."
          className={clsx('h-full w-full object-cover')}
        />

        <div className="flex-row justify-end md:flex">
          <div className="md:md:w-1/2">
            <p className="text-base leading-loose">{t('bar.002')}</p>
          </div>
        </div>

        <div className="flex flex-col space-y-12 md:space-y-24">
          <Image
            src={BarImage005}
            priority={true}
            alt="A picture of the interior of the bar."
            className={clsx('h-full w-full object-cover')}
          />

          <div
            className={clsx(
              'font-multilingual mx-auto flex w-full flex-col space-y-6 py-12 text-left font-extralight md:flex-row md:space-x-6 md:space-y-0 md:py-24'
            )}
          >
            <div className="md:w-1/2">
              <h2 className="text-5xl">{t('bar.003.title')}</h2>
            </div>
            <div className="flex flex-col space-y-12 md:w-1/2">
              <p className="text-base leading-loose">{t('bar.003.body')}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-screen-2xl flex-col space-y-6">
        <div className="border-t border-white/20">
          <div className="font-multilingual py-12 font-extralight">
            <div className="flex flex-row items-baseline space-x-2 pb-12">
              <div className="h-4 w-4 rounded-full bg-white"></div>
              <p className="text-xl">{t('bar.access.title')}</p>
            </div>
            <p className="text-base leading-relaxed">{t('bar.access.para001')}</p>
            <p className="text-base leading-relaxed">{t('bar.access.para002')}</p>
            <p className="text-base leading-relaxed">{t('bar.access.para003')}</p>
            <p className="text-base leading-relaxed">{t('bar.access.para004')}</p>
            <p className="text-base leading-relaxed">{t('bar.access.para005')}</p>
            <p className="text-base leading-relaxed">{t('bar.access.para006')}</p>
            <p className="text-base leading-relaxed">{t('bar.access.para007')}</p>
          </div>
        </div>

        <div className="border-t border-white/20">
          <div className="font-multilingual py-12 font-extralight">
            <div className="flex flex-row items-baseline space-x-2 pb-12">
              <div className="h-4 w-4 rounded-full bg-white"></div>
              <p className="text-xl">{t('bar.hours.title')}</p>
            </div>
            <p className="pb-6 text-base leading-relaxed">{t('bar.hours.para001')}</p>
            <p className="text-base leading-relaxed">{t('bar.hours.para002')}</p>
            <p className="text-base leading-relaxed">{t('bar.hours.para003')}</p>
          </div>
        </div>

        <div className="border-t border-white/20">
          <div className="font-multilingual py-12 font-extralight">
            <div className="flex flex-row items-baseline space-x-2 pb-12">
              <div className="h-4 w-4 rounded-full bg-white"></div>
              <p className="text-xl">{t('bar.menu.title')}</p>
            </div>
            <p className="pb-6 text-base leading-relaxed">
              <Link href="/menu" className="transition-opacity duration-150 hover:opacity-90">
                {t('bar.menu.para001')}
              </Link>
            </p>
          </div>
        </div>

        <div className="mx-auto flex max-w-screen-2xl flex-col space-y-24">
          <div className="md:pb-12">
            <div className="border-t border-white/20"></div>
          </div>
          <div className="font-multilingual max-w-xl font-extralight">
            <p className="text-xl">{t('bar.clerk.title')}</p>
            <p className="text-xl leading-relaxed">{t('bar.clerk.body')}</p>
          </div>

          <Image
            src={BarImage006}
            priority={true}
            alt="A picture of the interior of the bar."
            className={clsx('h-full w-full object-cover')}
          />
        </div>
      </div>
    </div>
  );
}
