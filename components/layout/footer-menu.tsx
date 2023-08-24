'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function FooterMenu() {
  const t = useTranslations('Index');

  return (
    <div className="hidden md:grid md:w-full md:grid-cols-2">
      <div className="col-span-1">
        <div className="mb-4 font-serif text-base underline">{t('menu.title')}</div>
        <nav className="font-multilingual flex flex-col space-y-2 text-left text-sm font-extralight">
          <div>
            <Link href="/products" className="transition-opacity duration-150 hover:opacity-50">
              {t('menu.products')}
            </Link>
          </div>

          <div>
            <Link href="/shop-list" className="transition-opacity duration-150 hover:opacity-50">
              {t('menu.shops')}
            </Link>
          </div>

          <div>
            <Link href="/about" className="transition-opacity duration-150 hover:opacity-50">
              {t('menu.about')}
            </Link>
          </div>

          <div>
            <Link href="/bar" className="transition-opacity duration-150 hover:opacity-50">
              {t('menu.bar')}
            </Link>
          </div>

          <div>
            <Link href="/concept" className="transition-opacity duration-150 hover:opacity-50">
              {t('menu.concept')}
            </Link>
          </div>

          <div>
            <Link href="/stories" className="transition-opacity duration-150 hover:opacity-50">
              {t('menu.stories')}
            </Link>
          </div>

          <div>
            <Link href="/company" className="transition-opacity duration-150 hover:opacity-50">
              {t('menu.company')}
            </Link>
          </div>
        </nav>
      </div>

      <div className="col-span-1">
        <div className="mb-4 text-right font-serif text-base underline">
          {t('shopping-guide.title')}
        </div>
        <nav className="font-multilingual flex flex-col items-end space-y-2 text-left text-sm font-extralight">
          <div>
            <Link href="/terms" className="transition-opacity duration-150 hover:opacity-50">
              {t('shopping-guide.terms')}
            </Link>
          </div>

          <div>
            <Link href="/disclosures" className="transition-opacity duration-150 hover:opacity-50">
              {t('shopping-guide.legal')}
            </Link>
          </div>

          <div>
            <Link href="/privacy" className="transition-opacity duration-150 hover:opacity-50">
              {t('shopping-guide.privacy')}
            </Link>
          </div>

          <div>
            <Link
              href={`mailto:${t('email-address.support')}`}
              className="transition-opacity duration-150 hover:opacity-50"
            >
              {t('email-address.support')}
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
