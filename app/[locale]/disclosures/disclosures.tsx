'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function Disclosures() {
  const t = useTranslations('Index');
  return (
    <>
      <div className="mx-auto font-serif">
        <h4 className="mx-auto max-w-4xl text-2xl font-extrabold tracking-tight sm:text-3xl">
          {t('disclosure-page.title')}
        </h4>
        <div className="mx-auto max-w-4xl">
          <div className="font-multilingual my-12">
            <section className="font-multilingual mb-36 mt-12 flex flex-col space-y-6 text-base md:space-y-3">
              <div className="flex flex-col space-y-2 md:flex-row md:space-x-3 md:space-y-0">
                <div className="md:w-1/3">{t('disclosure-page.distributor.label')}</div>
                <div className="md:w-2/3">
                  <div>{t('disclosure-page.distributor.value')}</div>
                </div>
              </div>
              <div className="flex flex-col space-y-2 md:flex-row md:space-x-3 md:space-y-0">
                <div className="md:w-1/3">{t('disclosure-page.representative.label')}</div>
                <div className="md:w-2/3">
                  <div>{t('disclosure-page.representative.value')}</div>
                </div>
              </div>
              <div className="flex flex-col space-y-2 md:flex-row md:space-x-3 md:space-y-0">
                <div className="md:w-1/3">{t('disclosure-page.address.label')}</div>
                <div className="md:w-2/3">
                  <div>{t('disclosure-page.address.one')}</div>
                  <div>{t('disclosure-page.address.two')}</div>
                </div>
              </div>
              <div className="flex flex-col space-y-2 md:flex-row md:space-x-3 md:space-y-0">
                <div className="md:w-1/3">{t('disclosure-page.phone.label')}</div>
                <div className="md:w-2/3">
                  <div>{t('disclosure-page.phone.value')}</div>
                </div>
              </div>
              <div className="flex flex-col space-y-2 md:flex-row md:space-x-3 md:space-y-0">
                <div className="md:w-1/3">{t('disclosure-page.email.label')}</div>
                <div className="md:w-2/3">
                  <Link
                    href={`mailto:${t('disclosure-page.homepage.value')}`}
                    className="transition-opacity duration-150 hover:opacity-90"
                  >
                    <div>{t('disclosure-page.email.value')}</div>
                  </Link>
                </div>
              </div>
              <div className="flex flex-col space-y-2 md:flex-row md:space-x-3 md:space-y-0">
                <div className="md:w-1/3">
                  <div>{t('disclosure-page.homepage.label')}</div>
                </div>
                <div className="md:w-2/3">
                  <div></div>
                  <Link
                    href={t('disclosure-page.homepage.value')}
                    className="transition-opacity duration-150 hover:opacity-90"
                  >
                    {t('disclosure-page.homepage.value')}
                  </Link>
                </div>
              </div>
              <div className="flex flex-col space-y-2 md:flex-row md:space-x-3 md:space-y-0">
                <div className="md:w-1/3">{t('disclosure-page.price.label')}</div>
                <div className="md:w-2/3">
                  <div>{t('disclosure-page.price.value')}</div>
                </div>
              </div>
              <div className="flex flex-col space-y-2 md:flex-row md:space-x-3 md:space-y-0">
                <div className="md:w-1/3">{t('disclosure-page.paymentMethod.label')}</div>
                <div className="md:w-2/3">
                  <div>{t('disclosure-page.paymentMethod.value')}</div>
                </div>
              </div>
              <div className="flex flex-col space-y-2 md:flex-row md:space-x-3 md:space-y-0">
                <div className="md:w-1/3">{t('disclosure-page.paymentPeriod.label')}</div>
                <div className="md:w-2/3">
                  <div>{t('disclosure-page.paymentPeriod.value')}</div>
                </div>
              </div>
              <div className="flex flex-col space-y-2 md:flex-row md:space-x-3 md:space-y-0">
                <div className="md:w-1/3">{t('disclosure-page.delivery.label')}</div>
                <div className="md:w-2/3">
                  <div>{t('disclosure-page.delivery.value')}</div>
                </div>
              </div>
              <div className="flex flex-col space-y-2 md:flex-row md:space-x-3 md:space-y-0">
                <div className="md:w-1/3">{t('disclosure-page.returnsAndExchanges.label')}</div>
                <div className="md:w-2/3">
                  <div>{t('disclosure-page.returnsAndExchanges.one')}</div>
                  <div className="pt-4">{t('disclosure-page.returnsAndExchanges.two')}</div>
                </div>
              </div>
              <div className="flex flex-col space-y-4 pt-12">
                <h2 className="font-multilingual text-[30px] font-extralight">
                  {t('disclosure-page.legal.title')}
                </h2>
              </div>
              <div className="flex flex-col space-y-2 pt-6 md:flex-row md:space-x-3 md:space-y-0">
                <div className="md:w-1/3">{t('disclosure-page.legal.001.label')}</div>
                <div className="md:w-2/3">
                  <div>{t('disclosure-page.legal.001.value')}</div>
                </div>
              </div>
              <div className="flex flex-col space-y-2 md:flex-row md:space-x-3 md:space-y-0">
                <div className="md:w-1/3">{t('disclosure-page.legal.002.label')}</div>
                <div className="md:w-2/3">
                  <div>{t('disclosure-page.legal.002.value')}</div>
                </div>
              </div>
              <div className="flex flex-col space-y-2 md:flex-row md:space-x-3 md:space-y-0">
                <div className="md:w-1/3">{t('disclosure-page.legal.003.label')}</div>
                <div className="md:w-2/3">
                  <div>{t('disclosure-page.legal.003.value')}</div>
                </div>
              </div>
              <div className="flex flex-col space-y-2 md:flex-row md:space-x-3 md:space-y-0">
                <div className="md:w-1/3">{t('disclosure-page.legal.004.label')}</div>
                <div className="md:w-2/3">
                  <div>{t('disclosure-page.legal.004.value')}</div>
                </div>
              </div>
              <div className="flex flex-col space-y-2 md:flex-row md:space-x-3 md:space-y-0">
                <div className="md:w-1/3">{t('disclosure-page.legal.005.label')}</div>
                <div className="md:w-2/3">
                  <div>{t('disclosure-page.legal.005.value')}</div>
                </div>
              </div>

              <div className="pt-8">
                <Link href="/" className="transition-opacity duration-150 hover:opacity-90">
                  ⇠ {t('disclosure-page.return')}
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
