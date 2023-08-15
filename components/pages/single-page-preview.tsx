'use client';

import PreviewBanner from '@/components/ui/preview-banner';
import { pageQuery } from '@/lib/sanity/queries';
import { useLiveQuery } from '@sanity/preview-kit';
import SinglePage from './single-page';

interface SinglePagePreviewParams {
  initialData: [];
  params: {
    locale: string;
    slug: string;
  };
}

export default function SinglePagePreview({ initialData, params }: SinglePagePreviewParams) {
  const [data] = useLiveQuery(initialData, pageQuery, params);

  return (
    <>
      <SinglePage data={data && data} />
      {/* @ts-ignore */}
      <PreviewBanner title={data?.title} type={data?._type} />
    </>
  );
}
