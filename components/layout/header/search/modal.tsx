'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Text from '@/components/ui/text/text';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import OpenSearch from './open-search';

import { Highlight, Hits } from 'react-instantsearch';

import Search from '@/components/search/search';
import Link from 'next-intl/link';

export default function SearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('search');

  const Hit = (props: any) => {
    const { hit } = props;
    const { handle, price } = props.hit;

    return (
      <Link
        onClick={() => setIsOpen(!isOpen)}
        href={`/product/${handle}`}
        className="flex w-full gap-4 outline-offset-0"
      >
        <div className="relative aspect-square h-16 w-16 bg-neutral-300" />
        <div>
          <Text className="!text-sm text-low-contrast" variant="label">
            Brand
          </Text>
          <h3 className="flex text-sm font-normal text-high-contrast">
            <Highlight attribute="title" hit={hit} />
          </h3>
          <p className="text-sm font-bold ">{price} SEK</p>
        </div>
      </Link>
    );
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
        <SheetTrigger asChild>
          <button aria-label="Open search">
            <OpenSearch />
          </button>
        </SheetTrigger>
        <SheetContent side="right" className="flex flex-col bg-app">
          <SheetHeader>
            <SheetTitle className="text-lg font-semibold">{t('search')}</SheetTitle>
          </SheetHeader>
          <Search>
            <Hits
              hitComponent={Hit}
              classNames={{
                root: 'flex flex-col flex-1 h-full overflow-auto pb-6',
                list: 'mt-4 grid w-full grid-cols-1 overflow-auto gap-4'
              }}
            />
          </Search>
        </SheetContent>
      </Sheet>
    </>
  );
}
