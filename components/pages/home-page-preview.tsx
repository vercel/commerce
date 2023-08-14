'use client';

import { homePageQuery } from '@/lib/sanity/queries';
import { useLiveQuery } from '@sanity/preview-kit';
import PreviewBanner from '../ui/preview-banner';
import HomePage from './home-page';

interface HomePagePreviewParams {
  initialData: [];
  params: {
    locale: string;
  };
}

export default function HomePagePreview({ initialData, params }: HomePagePreviewParams) {
  const [data] = useLiveQuery(initialData, homePageQuery, params);

  return (
    <>
      <HomePage data={data} />;{/* @ts-ignore */}
      <PreviewBanner title={data?.title} />
    </>
  );
}
