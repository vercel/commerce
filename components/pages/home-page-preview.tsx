'use client';

import dynamic from 'next/dynamic';
import PreviewBanner from '../ui/preview-banner';
import type { IndexPageParams } from './home-page';

const HomePage = dynamic(() => import('./home-page'));

export default function HomePagePreview({ data }: IndexPageParams) {
  if (!data) {
    return (
      <div className="text-center">Please start editing your Home document to see the preview!</div>
    );
  }

  return (
    <>
      <HomePage data={data} />
      <PreviewBanner title={data?.title ? data.title : ''} />
    </>
  );
}
