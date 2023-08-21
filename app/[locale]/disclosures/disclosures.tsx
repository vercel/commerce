'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function Disclosures() {
  const t = useTranslations('Index');
  return (
    <>
      <div className="mx-auto font-serif">
        <h4 className="mx-auto max-w-4xl text-2xl font-extrabold tracking-tight sm:text-3xl">
          {t('disclosurePage.title')}
        </h4>
        <div className="mx-auto max-w-4xl">
          <div className="font-multilingual my-12 text-lg">
            <section className="font-multilingual mb-36 mt-12 flex flex-col space-y-6 text-lg md:space-y-3">
              <div className="flex flex-col space-y-2 md:flex-row md:space-x-3 md:space-y-0">
                <div className="md:w-1/3">{t('disclosurePage.distributor.label')}</div>
                <div className="md:w-2/3">
                  <div>{t('disclosurePage.distributor.value')}</div>
                </div>
              </div>
              <div className="flex flex-col space-y-2 md:flex-row md:space-x-3 md:space-y-0">
                <div className="md:w-1/3">{t('disclosurePage.representative.label')}</div>
                <div className="md:w-2/3">
                  <div>{t('disclosurePage.representative.value')}</div>
                </div>
              </div>
              <div className="flex flex-col space-y-2 md:flex-row md:space-x-3 md:space-y-0">
                <div className="md:w-1/3">{t('disclosurePage.address.label')}</div>
                <div className="md:w-2/3">
                  <div>{t('disclosurePage.address.one')}</div>
                  <div>{t('disclosurePage.address.two')}</div>
                </div>
              </div>
              <div className="flex flex-col space-y-2 md:flex-row md:space-x-3 md:space-y-0">
                <div className="md:w-1/3">{t('disclosurePage.phone.label')}</div>
                <div className="md:w-2/3">
                  <div>{t('disclosurePage.phone.value')}</div>
                </div>
              </div>
              <div className="flex flex-col space-y-2 md:flex-row md:space-x-3 md:space-y-0">
                <div className="md:w-1/3">{t('disclosurePage.email.label')}</div>
                <div className="md:w-2/3">
                  <Link
                    href={`mailto:${t('disclosurePage.homepage.value')}`}
                    className="transition-opacity duration-150 hover:opacity-90"
                  >
                    <div>{t('disclosurePage.email.value')}</div>
                  </Link>
                </div>
              </div>
              <div className="flex flex-col space-y-2 md:flex-row md:space-x-3 md:space-y-0">
                <div className="md:w-1/3">
                  <div>{t('disclosurePage.homepage.label')}</div>
                </div>
                <div className="md:w-2/3">
                  <div></div>
                  <Link
                    href={t('disclosurePage.homepage.value')}
                    className="transition-opacity duration-150 hover:opacity-90"
                  >
                    {t('disclosurePage.homepage.value')}
                  </Link>
                </div>
              </div>
              <div className="flex flex-col space-y-2 md:flex-row md:space-x-3 md:space-y-0">
                <div className="md:w-1/3">{t('disclosurePage.price.label')}</div>
                <div className="md:w-2/3">
                  <div>{t('disclosurePage.price.value')}</div>
                </div>
              </div>
              <div className="flex flex-col space-y-2 md:flex-row md:space-x-3 md:space-y-0">
                <div className="md:w-1/3">{t('disclosurePage.otherCharges.label')}</div>
                <div className="md:w-2/3">
                  <div>{t('disclosurePage.otherCharges.value')}</div>
                </div>
              </div>
              <div className="flex flex-col space-y-2 md:flex-row md:space-x-3 md:space-y-0">
                <div className="md:w-1/3">{t('disclosurePage.paymentMethod.label')}</div>
                <div className="md:w-2/3">
                  <div>{t('disclosurePage.paymentMethod.value')}</div>
                </div>
              </div>
              <div className="flex flex-col space-y-2 md:flex-row md:space-x-3 md:space-y-0">
                <div className="md:w-1/3">{t('disclosurePage.paymentPeriod.label')}</div>
                <div className="md:w-2/3">
                  <div>{t('disclosurePage.paymentPeriod.value')}</div>
                </div>
              </div>
              <div className="flex flex-col space-y-2 md:flex-row md:space-x-3 md:space-y-0">
                <div className="md:w-1/3">{t('disclosurePage.delivery.label')}</div>
                <div className="md:w-2/3">
                  <div>{t('disclosurePage.delivery.value')}</div>
                </div>
              </div>
              <div className="flex flex-col space-y-2 md:flex-row md:space-x-3 md:space-y-0">
                <div className="md:w-1/3">{t('disclosurePage.returnsAndExchanges.label')}</div>
                <div className="md:w-2/3">
                  <div>{t('disclosurePage.returnsAndExchanges.one')}</div>
                  <div className="pt-4">{t('disclosurePage.returnsAndExchanges.two')}</div>
                </div>
              </div>
              <div className="pt-8">
                <Link href="/" className="transition-opacity duration-150 hover:opacity-90">
                  ⇠ {t('disclosurePage.return')}
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
