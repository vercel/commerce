'use client';

import PreviewBanner from '@/components/ui/preview-banner';
import { searchPageQuery } from '@/lib/sanity/queries';
import { useLiveQuery } from '@sanity/preview-kit';
import SearchPage from './search-page';

interface SearchPagePreviewParams {
  initialData: [];
  params: {
    locale: string;
    slug: string;
  };
}

export default function SearchPagePreview({ initialData, params }: SearchPagePreviewParams) {
  const [data] = useLiveQuery(initialData, searchPageQuery, params);

  return (
    <>
      <SearchPage data={data && data} />
      {/* @ts-ignore */}
      <PreviewBanner title={data?.title} type={data?._type} />
    </>
  );
}
