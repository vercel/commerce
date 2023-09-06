'use client';
import AboutImage001 from '@images/about-images/about-image-001.webp';
import AboutImage002 from '@images/about-images/about-image-002.webp';
import AboutImage003 from '@images/about-images/about-image-003.webp';
import AboutImage004 from '@images/about-images/about-image-004.webp';
import AboutImage005 from '@images/about-images/about-image-005.webp';
import AboutImage006 from '@images/about-images/about-image-006.webp';
import IrieSignature from '@images/about-images/irie-signature.webp';
import clsx from 'clsx';
import Prose from 'components/prose';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function AboutNaraiDetail({ awards }: { awards: string }) {
  const t = useTranslations('Index');

  return (
    <div className="w-full px-6">
      <div className="font-multilingual flex w-full flex-col items-center space-y-px pb-24 text-center font-extralight md:pb-48">
        <h1 className="text-5xl leading-tight md:text-6xl">{t('about.001.title')}</h1>
        <h1 className="text-5xl leading-tight md:text-6xl">{t('about.001.subtitle')}</h1>
      </div>

      <div className="relative mx-auto max-w-screen-2xl">
        <Image
          src={AboutImage001}
          priority={true}
          alt="A picture of the exterior of the brewery building."
          className={clsx('aspect-square h-full w-full object-cover md:aspect-auto')}
        />
      </div>
      <div
        className={clsx(
          'font-multilingual mx-auto flex w-full max-w-3xl flex-col space-y-12 py-24 text-left font-extralight md:py-48'
        )}
      >
        <h2 className="text-3xl leading-tight md:text-5xl">{t('about.002.title')}</h2>
        <p className="text-base leading-loose">{t('about.002.para001')}</p>
        <p className="text-base leading-loose">{t('about.002.para002')}</p>
      </div>

      <div className="relative mx-auto max-w-screen-2xl">
        <Image
          src={AboutImage002}
          priority={true}
          alt="A picture of the interior of the brewery building."
          className={clsx('aspect-square h-full w-full object-cover md:aspect-auto')}
        />
      </div>

      <div
        className={clsx(
          'font-multilingual mx-auto flex w-full max-w-3xl flex-col space-y-12 py-24 text-left font-extralight md:py-48'
        )}
      >
        <h2 className="text-3xl leading-tight md:text-5xl">{t('about.003.title')}</h2>
        <p className="text-base leading-loose">{t('about.003.para001')}</p>
        <div>
          <div className="relative flex flex-row justify-end pb-6">
            <Image
              src={IrieSignature}
              alt="Irie Signature"
              width={600}
              height={81}
              className={clsx('w-[280px] object-contain')}
            />
          </div>
          <div className="text-right text-base">{t('about.003.master001')}</div>
          <div className="text-right text-base">{t('about.003.master002')}</div>
        </div>
      </div>

      {!!awards && (
        <div
          className={clsx(
            'font-multilingual mx-auto flex w-full max-w-screen-xl flex-col space-y-12 py-24 text-left font-extralight md:py-48'
          )}
        >
          <div className="font-multilingual flex flex-col items-baseline space-y-0 md:flex-row md:space-x-4">
            <h2 className="text-5xl">{t('about.awards.title')}</h2>
            <h3 className="text-xl font-extralight">{t('about.awards.subtitle')}</h3>
          </div>

          <div className="border-y border-white/20 py-12">
            <Prose html={awards} />
          </div>
        </div>
      )}

      <div
        className={clsx(
          'font-multilingual mx-auto flex w-full max-w-screen-xl flex-col space-y-24 pb-24 text-left font-extralight md:pb-48'
        )}
      >
        <div className="flex flex-col space-y-24">
          <div className="font-multilingual font-extralight">
            <div className="flex flex-row items-baseline space-x-3">
              <h2 className="text-5xl">{t('about.materials.title')}</h2>
              <h2 className="text-4xl">{t('about.materials.subtitle')}</h2>
            </div>
          </div>

          <Image
            src={AboutImage003}
            priority={true}
            alt="A picture of the exterior of the brewery building."
            className={clsx('aspect-square h-full w-full object-cover md:aspect-auto')}
          />

          <div className="font-multilingual flex flex-col space-y-12 font-extralight md:flex-row md:space-x-6 md:space-y-0">
            <div className="md:w-1/2">
              <h2 className="max-w-title text-3xl leading-normal">
                {t('about.materials.water.title')}
              </h2>
              <h2 className="max-w-title text-3xl leading-normal">
                {t('about.materials.water.subtitle')}
              </h2>
            </div>
            <div className="md:w-1/2">
              <p className="text-base leading-relaxed">{t('about.materials.water.body')}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-24">
          <Image
            src={AboutImage004}
            priority={true}
            alt="A picture of the rice fields and mountains of Nagano."
            className={clsx('aspect-square h-full w-full object-cover md:aspect-auto')}
          />

          <div className="font-multilingual flex flex-col space-y-12 font-extralight md:flex-row md:space-x-6 md:space-y-0">
            <div className="md:w-1/2">
              <h2 className="max-w-title text-3xl leading-normal">
                {t('about.materials.rice.title')}
              </h2>
              <h2 className="max-w-title text-3xl leading-normal">
                {t('about.materials.rice.subtitle')}
              </h2>
            </div>
            <div className="md:w-1/2">
              <p className="text-base leading-relaxed">{t('about.materials.rice.body')}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-24">
          <Image
            src={AboutImage005}
            priority={true}
            alt="A picture of the interior of the brewery."
            className={clsx('aspect-square h-full w-full object-cover md:aspect-auto')}
          />

          <div className="font-multilingual flex flex-col space-y-12 font-extralight md:flex-row md:space-x-6 md:space-y-0">
            <div className="md:w-1/2">
              <h2 className="max-w-title text-3xl leading-normal">
                {t('about.materials.koji.title')}
              </h2>
              <h2 className="max-w-title text-3xl leading-normal">
                {t('about.materials.koji.subtitle')}
              </h2>
            </div>
            <div className="md:w-1/2">
              <p className="text-base leading-relaxed">{t('about.materials.koji.body')}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-screen-2xl flex-col space-y-24">
        <div className="md:pb-24">
          <div className="border-t border-white/20"></div>
        </div>
        <div className="font-multilingual max-w-xl font-extralight">
          <p className="pb-4 text-xl">{t('about.irie.title')}</p>
          <p className="text-lg leading-relaxed">{t('about.irie.body')}</p>
        </div>

        <Image
          src={AboutImage006}
          priority={true}
          alt="A picture of Irie-san."
          className={clsx('aspect-square h-full w-full object-cover md:aspect-auto')}
        />
      </div>
    </div>
  );
}
