'use client';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function Shoplist() {
  const t = useTranslations('Index');
  return (
    <div className="font-multilingual mx-auto max-w-screen-xl space-y-4 px-6" id="shops">
      <div className="flex w-full flex-row items-baseline space-x-12 pb-6">
        <h2 className="font-serif text-6xl tracking-wider">shop list</h2>
        <h3 className="text-2xl font-extralight tracking-wider">{t('shops.subtitle')}</h3>
      </div>
      <div className="grid w-full grid-cols-2 gap-px">
        <Link
          href="shop-list/#hokkaido"
          className="group col-span-1 flex flex-row items-center justify-between p-6 outline outline-1 outline-subtle"
        >
          <div>{t('shops.hokkaido')}</div>
          <div>
            <ChevronRightIcon
              className="h-6 w-6 stroke-subtle transition-colors duration-150 group-hover:stroke-white"
              strokeWidth={1.5}
            />
          </div>
        </Link>
        <Link
          href="shop-list/#kanto"
          className="group col-span-1 flex flex-row items-center justify-between p-6 outline outline-1 outline-subtle"
        >
          <div>{t('shops.kanto')}</div>
          <div>
            <ChevronRightIcon
              className="h-6 w-6 stroke-subtle transition-colors duration-150 group-hover:stroke-white"
              strokeWidth={1.5}
            />
          </div>
        </Link>
        <Link
          href="shop-list/#chubu"
          className="group col-span-1 flex flex-row items-center justify-between p-6 outline outline-1 outline-subtle"
        >
          <div>{t('shops.chubu')}</div>
          <div>
            <ChevronRightIcon
              className="h-6 w-6 stroke-subtle transition-colors duration-150 group-hover:stroke-white"
              strokeWidth={1.5}
            />
          </div>
        </Link>
        <Link
          href="shop-list/#kinki"
          className="group col-span-1 flex flex-row items-center justify-between p-6 outline outline-1 outline-subtle"
        >
          <div>{t('shops.kinki')}</div>
          <div>
            <ChevronRightIcon
              className="h-6 w-6 stroke-subtle transition-colors duration-150 group-hover:stroke-white"
              strokeWidth={1.5}
            />
          </div>
        </Link>
        <Link
          href="shop-list/#chugoku"
          className="group col-span-1 flex flex-row items-center justify-between p-6 outline outline-1 outline-subtle"
        >
          <div>{t('shops.chugoku')}</div>
          <div>
            <ChevronRightIcon
              className="h-6 w-6 stroke-subtle transition-colors duration-150 group-hover:stroke-white"
              strokeWidth={1.5}
            />
          </div>
        </Link>
        <Link
          href="shop-list/#kyushu"
          className="group col-span-1 flex flex-row items-center justify-between p-6 outline outline-1 outline-subtle"
        >
          <div>{t('shops.kyushu')}</div>
          <div>
            <ChevronRightIcon
              className="h-6 w-6 stroke-subtle transition-colors duration-150 group-hover:stroke-white"
              strokeWidth={1.5}
            />
          </div>
        </Link>
      </div>
    </div>
  );
}
