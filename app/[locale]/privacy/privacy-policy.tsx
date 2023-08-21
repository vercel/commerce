'use client';

import { useTranslations } from 'next-intl';

export default function PrivacyPolicy() {
  const t = useTranslations('Index');
  return (
    <>
      <div className="mx-auto max-w-3xl text-white">
        <div className="md:text-4x text-center font-serif text-3xl font-bold leading-tight text-white md:mb-16">
          {t('privacy.title')}
        </div>
        <div className="mb-24 text-lg leading-normal">
          <div className="text-sb-highlight text-center">{t('privacy.lastModifiedDate')}</div>
          <div className="mt-4">
            <p>{t('privacy.pleaseRead')}</p>
            <p className="mt-4">{t('privacy.usedFor')}</p>
          </div>
          <div className="my-8 text-center font-serif text-xl font-bold text-white md:my-12 md:text-2xl">
            {t('privacy.definitions.title')}
          </div>
          <div>
            <p>{t('privacy.definitions.capitalizedTerms')}</p>
            <p className="mt-4">{t('privacy.definitions.affiliate')}</p>
            <p className="mt-4">{t('privacy.definitions.account')}</p>
            <p className="mt-4">{t('privacy.definitions.company')}</p>
            <p className="mt-4">{t('privacy.definitions.cookies')}</p>
            <p className="mt-4">{t('privacy.definitions.country')}</p>
            <p className="mt-4">{t('privacy.definitions.dataController')}</p>
            <p className="mt-4">{t('privacy.definitions.device')}</p>
            <p className="mt-4">{t('privacy.definitions.doNotTrack')}</p>
            <p className="mt-4">{t('privacy.definitions.personalData')}</p>
            <p className="mt-4">{t('privacy.definitions.service')}</p>
            <p className="mt-4">{t('privacy.definitions.serviceProvider')}</p>
            <p className="mt-4">{t('privacy.definitions.site')}</p>
            <p className="mt-4">{t('privacy.definitions.socialMedia')}</p>
            <p className="mt-4">{t('privacy.definitions.usageData')}</p>
            <p className="mt-4">{t('privacy.definitions.you')}</p>
          </div>
          <div className="my-8 text-center font-serif text-xl font-bold text-white md:my-12 md:text-2xl">
            {t('privacy.collectingAndUsing.title')}
          </div>
          <div>
            <p>{t('privacy.collectingAndUsing.inScope')}</p>
          </div>
          <div className="my-8 text-center font-serif text-xl font-bold text-white md:my-12 md:text-2xl">
            {t('privacy.usageData.title')}
          </div>
          <div>
            <p>{t('privacy.usageData.deviceInfo')}</p>
            <p className="mt-4">{t('privacy.usageData.mobileInfo')}</p>
            <p className="mt-4">{t('privacy.usageData.deviceInfo')}</p>
          </div>

          <div className="my-8 text-center font-serif text-xl font-bold text-white md:my-12 md:text-2xl">
            {t('privacy.cookies.title')}
          </div>
          <div>
            <p>{t('privacy.cookies.trackers')}</p>
            <p className="mt-4">{t('privacy.cookies.doNotAccept')}</p>
          </div>

          <div className="my-8 text-center font-serif text-xl font-bold text-white md:my-12 md:text-2xl">
            {t('privacy.personal.title')}
          </div>
          <div>
            <p>{t('privacy.personal.usage.intro')}</p>
            <ul className="list-disc pl-6">
              <li className="mt-4">{t('privacy.personal.usage.maintain')}</li>
              <li className="mt-4">{t('privacy.personal.usage.performance')}</li>
              <li className="mt-4">{t('privacy.personal.usage.contact')}</li>
              <li className="mt-4">{t('privacy.personal.usage.requests')}</li>
            </ul>
            <p className="mt-8">{t('privacy.personal.sharing.title')}</p>
            <ul className="list-disc pl-6">
              <li className="mt-4">{t('privacy.personal.sharing.monitor')}</li>
              <li className="mt-4">{t('privacy.personal.sharing.merger')}</li>
              <li className="mt-4">{t('privacy.personal.sharing.affiliates')}</li>
              <li className="mt-4">{t('privacy.personal.sharing.businessPartners')}</li>
              <li className="mt-4">{t('privacy.personal.sharing.socialMedia')}</li>
            </ul>
          </div>
          <div className="my-8 text-center font-serif text-xl font-bold text-white md:my-12 md:text-2xl">
            {t('privacy.personal.retention.title')}
          </div>
          <div>
            <p>{t('privacy.personal.retention.asNecessary')}</p>
            <p className="mt-4">{t('privacy.personal.retention.internalAnalysis')}</p>
          </div>
          <div className="my-8 text-center font-serif text-xl font-bold text-white md:my-12 md:text-2xl">
            {t('privacy.personal.transfer.title')}
          </div>
          <div>
            <p>{t('privacy.personal.transfer.transborder')}</p>
          </div>
          <div className="my-8 text-center font-serif text-xl font-bold text-white md:my-12 md:text-2xl">
            {t('privacy.personal.disclosure.title')}
          </div>
          <div>
            <p>{t('privacy.personal.disclosure.merger')}</p>
            <p className="mt-4">{t('privacy.personal.disclosure.mandatory')}</p>
            <p className="mt-4">{t('privacy.personal.disclosure.goodFaith')}</p>
            <p className="mt-4">{t('privacy.personal.disclosure.noGuarantee')}</p>
          </div>
          <div className="my-8 text-center font-serif text-xl font-bold text-white md:my-12 md:text-2xl">
            {t('privacy.personal.processing.title')}
          </div>
          <div>
            <p>{t('privacy.personal.processing.limitedUse')}</p>
            <p className="mt-4">{t('privacy.personal.processing.thirdParties.intro')}</p>
            <ul className="list-disc pl-6">
              <li className="mt-4">{t('privacy.personal.processing.thirdParties.monitor')}</li>
              <li className="mt-4">{t('privacy.personal.processing.thirdParties.marketing')}</li>
              <li className="mt-4">{t('privacy.personal.processing.thirdParties.services')}</li>
              <li className="mt-4">{t('privacy.personal.processing.thirdParties.protection')}</li>
              <li className="mt-4">{t('privacy.personal.processing.thirdParties.ads')}</li>
              <li className="mt-4">{t('privacy.personal.processing.thirdParties.liability')}</li>
            </ul>
            <p className="mt-4">{t('privacy.personal.processing.creditCards')}</p>
            <p className="mt-4">{t('privacy.personal.processing.cookies')}</p>
          </div>
          <div className="my-8 text-center font-serif text-xl font-bold text-white md:my-12 md:text-2xl">
            {t('privacy.personal.mobile.title')}
          </div>
          <div>
            <p>{t('privacy.personal.mobile.optOut')}</p>
          </div>
          <div className="my-8 text-center font-serif text-xl font-bold text-white md:my-12 md:text-2xl">
            {t('privacy.personal.doNotTrack.title')}
          </div>
          <div>
            <p>{t('privacy.personal.doNotTrack.noResponse')}</p>
            <p className="mt-4">{t('privacy.personal.doNotTrack.browser')}</p>
          </div>
          <div className="my-8 text-center font-serif text-xl font-bold text-white md:my-12 md:text-2xl">
            {t('privacy.personal.links.title')}
          </div>
          <div>
            <p>{t('privacy.personal.links.external')}</p>
            <p className="mt-4">{t('privacy.personal.links.disclaimer')}</p>
          </div>
          <div className="my-8 text-center font-serif text-xl font-bold text-white md:my-12 md:text-2xl">
            {t('privacy.changes.title')}
          </div>
          <div>
            <p>{t('privacy.changes.updates')}</p>
            <p className="mt-4">{t('privacy.changes.review')}</p>
          </div>
          <div className="my-8 text-center font-serif text-xl font-bold text-white md:my-12 md:text-2xl">
            {t('privacy.contactUs.title')}
          </div>
          <div>
            <p>
              {t('privacy.contactUs.questions')}{' '}
              <a
                href={`mailto:${t('email-address.support')}`}
                className="hover:text-green-600"
                aria-label={t('privacy.contactUs.ariaLabel')}
              >
                {t('email-address.support')}
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
