'use client';

import dynamic from 'next/dynamic';
import { SinglePageParams } from './single-page';

const SinglePage = dynamic(() => import('./single-page'));
const PreviewBanner = dynamic(() => import('../ui/preview-banner/preview-banner'));

export default function SinglePagePreview({ data }: SinglePageParams) {
  if (!data) {
    return (
      <div className="text-center">Please start editing your Page document to see the preview!</div>
    );
  }

  return (
    <>
      <SinglePage data={data} />
      <PreviewBanner title={data?.title ? data.title : ''} />
    </>
  );
}
