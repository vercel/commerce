import clsx from 'clsx';
import { Suspense } from 'react';

import { getStaticCollections } from 'lib/shopware';
import FilterList from './filter';
import { transformStaticCollectionToList } from 'lib/shopware/transform';

async function CollectionList() {
  const collections = await getStaticCollections();
  if (collections) {
    const list = transformStaticCollectionToList(collections);
    return <FilterList list={list} title="Collections" />;
  }
}

const skeleton = 'mb-3 h-4 w-5/6 animate-pulse rounded';
const activeAndTitles = 'bg-gray-800 dark:bg-gray-300';
const items = 'bg-gray-400 dark:bg-gray-700';

export default function Collections() {
  return (
    <Suspense
      fallback={
        <div className="col-span-2 hidden h-[400px] w-full flex-none py-4 pl-10 lg:block">
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
      <CollectionList />
    </Suspense>
  );
}
