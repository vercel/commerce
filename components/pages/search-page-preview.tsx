'use client';

import dynamic from 'next/dynamic';
import PreviewBanner from '../ui/preview-banner';
import type { SearchPageParams } from './search-page';

const SearchPage = dynamic(() => import('./search-page'));

export default function SearchPagePreview({ data }: SearchPageParams) {
  if (!data) {
    return (
      <div className="text-center">
        Please start editing your Search page document to see the preview!
      </div>
    );
  }

  return (
    <>
      <SearchPage data={data} />
      <PreviewBanner title={data?.title ? data.title : ''} />
    </>
  );
}
