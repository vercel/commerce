'use client';

import { useTranslations } from 'next-intl';

export default function TermsOfUse() {
  const t = useTranslations('Index');
  return (
    <>
      <div className="mx-auto max-w-3xl text-white">
        <div className="text-center font-serif text-2xl font-bold leading-tight text-white md:mb-16 md:text-4xl">
          {t('terms.title')}
        </div>
        <div className="mb-24 text-lg leading-normal">
          <div className="mt-4 text-center">{t('terms.pleaseRead')}</div>
          <div className="my-8 text-center font-serif text-xl font-bold text-white md:my-16 md:text-2xl">
            {t('terms.definitions.title')}
          </div>
          <div>
            <p>{t('terms.definitions.capitalizedTerms')}</p>
            <p className="mt-4">{t('terms.definitions.affiliate')}</p>
            <p className="mt-4">{t('terms.definitions.account')}</p>
            <p className="mt-4">{t('terms.definitions.company')}</p>
            <p className="mt-4">{t('terms.definitions.country')}</p>
            <p className="mt-4">{t('terms.definitions.feedback')}</p>
            <p className="mt-4">{t('terms.definitions.goods')}</p>
            <p className="mt-4">{t('terms.definitions.orders')}</p>
            <p className="mt-4">{t('terms.definitions.service')}</p>
            <p className="mt-4">{t('terms.definitions.site')}</p>
            <p className="mt-4">{t('terms.definitions.socialMedia')}</p>
            <p className="mt-4">{t('terms.definitions.you')}</p>
          </div>
          <div className="my-8 text-center font-serif text-xl font-bold text-white md:my-16 md:text-2xl">
            {t('terms.acknowledgment.title')}
          </div>
          <div>
            <p>{t('terms.acknowledgment.intro')}</p>
            <p className="mt-4">{t('terms.acknowledgment.acceptance')}</p>
            <p className="mt-4">{t('terms.acknowledgment.access')}</p>
            <p className="mt-4">{t('terms.acknowledgment.age')}</p>
            <p className="mt-4">{t('terms.acknowledgment.privacy')}</p>
          </div>
          <div className="my-8 text-center font-serif text-xl font-bold text-white md:my-16 md:text-2xl">
            {t('terms.orders.title')}
          </div>
          <div>
            <p>{t('terms.orders.contract')}</p>
            <p className="mt-4">{t('terms.orders.requiredInfo')}</p>
            <p className="mt-4">{t('terms.orders.reps')}</p>
            <p className="mt-4">{t('terms.orders.onwardTransfers')}</p>
            <p className="mt-4">{t('terms.orders.cancellation')}</p>
            <p className="mt-4">{t('terms.orders.returns.policy')}</p>
            <p className="mt-4">{t('terms.orders.returns.damagedGoods')}</p>
            <p className="mt-4">{t('terms.orders.returns.exceptions.title')}</p>
            <ul className="list-disc pl-6">
              <li className="mt-4">{t('terms.orders.returns.exceptions.personalized')}</li>
              <li className="mt-4">{t('terms.orders.returns.exceptions.expired')}</li>
              <li className="mt-4">{t('terms.orders.returns.exceptions.hygiene')}</li>
              <li className="mt-4">{t('terms.orders.returns.exceptions.mixed')}</li>
              <li className="mt-4">{t('terms.orders.returns.exceptions.digital')}</li>
            </ul>
          </div>
          <div className="my-8 text-center font-serif text-xl font-bold text-white md:my-16 md:text-2xl">
            {t('terms.inaccuracies.title')}
          </div>
          <div>
            <p>{t('terms.inaccuracies.errorsPossible')}</p>
            <p className="mt-4">{t('terms.inaccuracies.noGuarantees')}</p>
          </div>
          <div className="my-8 text-center font-serif text-xl font-bold text-white md:my-16 md:text-2xl">
            {t('terms.prices.title')}
          </div>
          <div>
            <p>{t('terms.prices.changes')}</p>
            <p className="mt-4">{t('terms.prices.payments')}</p>
          </div>
          <div className="my-8 text-center font-serif text-xl font-bold text-white md:my-16 md:text-2xl">
            {t('terms.promotions.title')}
          </div>
          <div>
            <p>{t('terms.promotions.conflicts')}</p>
          </div>
          <div className="my-8 text-center font-serif text-xl font-bold text-white md:my-16 md:text-2xl">
            {t('terms.ip.title')}
          </div>
          <div>
            <p>{t('terms.ip.ownership')}</p>
            <p className="mt-4">{t('terms.ip.protections')}</p>
            <p className="mt-4">{t('terms.ip.trademarks')}</p>
            <p className="mt-4">{t('terms.ip.assignment')}</p>
          </div>
          <div className="my-8 text-center font-serif text-xl font-bold text-white md:my-16 md:text-2xl">
            {t('terms.thirdPartyLinks.title')}
          </div>
          <div>
            <p>{t('terms.thirdPartyLinks.noControl')}</p>
          </div>
          <div className="my-8 text-center font-serif text-xl font-bold text-white md:my-16 md:text-2xl">
            {t('terms.liability.title')}
          </div>
          <div>
            <p>{t('terms.liability.directDamages')}</p>
            <p className="mt-4">{t('terms.liability.noSpecialDamages')}</p>
            <p className="mt-4">{t('terms.liability.noSpecialDamages')}</p>
          </div>
          <div className="my-8 text-center font-serif text-xl font-bold text-white md:my-16 md:text-2xl">
            {t('terms.disclaimer.title')}
          </div>
          <div>
            <p>{t('terms.disclaimer.asIs')}</p>
            <p className="mt-4">{t('terms.disclaimer.conflicts')}</p>
          </div>
          <div className="my-8 text-center font-serif text-xl font-bold text-white md:my-16 md:text-2xl">
            {t('terms.misc.title')}
          </div>
          <div>
            <p>{t('terms.misc.governingLaw')}</p>
            <p className="mt-4">{t('terms.misc.severability')}</p>
            <p className="mt-4">{t('terms.misc.waiver')}</p>
            <p className="mt-4">{t('terms.misc.translation')}</p>
            <p className="mt-4">{t('terms.misc.changes')}</p>
          </div>
          <div className="my-8 text-center font-serif text-xl font-bold text-white md:my-16 md:text-2xl">
            {t('terms.contactUs.title')}
          </div>
          <div className="mb-12">
            <p>
              {t('terms.contactUs.instructions')}
              <a
                href={`mailto:${t('email-address.support')}`}
                className="branded-link"
                aria-label={t('privacy.contactUs.ariaLabel')}
              >
                {t('email-address.support')}
              </a>
              .
            </p>
          </div>
          <div>
            <div className="text-center font-normal text-white">{t('terms.lastModifiedDate')}</div>
          </div>
        </div>
      </div>
    </>
  );
}
