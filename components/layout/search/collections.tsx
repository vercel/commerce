import clsx from 'clsx';
import { Suspense } from 'react';

import { getSubCollections } from 'lib/shopware';
import FilterList from './filter';
import { transformCollectionToList } from 'lib/shopware/transform';

async function CollectionList({ collection }: { collection: string }) {
  const collections = await getSubCollections(collection);
  if (collections) {
    const list = transformCollectionToList(collections);
    if (list.length > 0) return <FilterList list={list} title="Sub-Collections" />;
  }
}

const skeleton = 'mb-3 h-4 w-5/6 animate-pulse rounded';
const activeAndTitles = 'bg-neutral-800 dark:bg-neutral-300';
const items = 'bg-neutral-400 dark:bg-neutral-700';

export default function Collections({ collection }: { collection: string }) {
  return (
    <Suspense
      fallback={
        <div className="col-span-2 hidden h-[400px] w-full flex-none py-4 lg:block">
          <div className={clsx(skeleton, activeAndTitles)} />
          <div className={clsx(skeleton, activeAndTitles)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
        </div>
      }
    >
      <CollectionList collection={collection} />
    </Suspense>
  );
}
