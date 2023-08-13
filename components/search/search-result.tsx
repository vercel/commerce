'use client';

import Text from '@/components/ui/text/text';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import Link from 'next-intl/link';
import { Configure, Highlight, InfiniteHits } from 'react-instantsearch';

export default function SearchResult() {
  const t = useTranslations('search');

  const Hit = (props: any) => {
    const { hit } = props;
    const { handle, price } = props.hit;

    return (
      <Link href={`/product/${handle}`} className="flex w-full flex-col gap-4 outline-offset-2">
        <div className="relative aspect-square h-full w-full bg-neutral-300" />
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
      <Configure hitsPerPage={4} />
      <InfiniteHits
        translations={{
          showMoreButtonText: t('showMore')
        }}
        showPrevious={false}
        classNames={{
          root: cn('flex flex-col flex-1'),
          list: cn(
            'grid grid-cols-2 mt-4 gap-4 md:grid-cols-3 md:mt-8 lg:grid-cols-4 lg:gap-8 lg:mt-12 2xl:gap-12'
          ),
          loadMore:
            'border border-ui-border mt-4 px-6 py-3 inline-flex mx-auto w-auto disabled:opacity-50 disabled:cursor-not-allowed md:mt-8 lg:mt-12'
        }}
        hitComponent={Hit}
      />
    </>
  );
}
