'use client';

import dynamic from 'next/dynamic';
import PreviewBanner from '../ui/preview-banner/preview-banner';
import { CategoryPageParams } from './category-page';

const CategoryPage = dynamic(() => import('./category-page'));

export default function CategoryPagePreview({ data }: CategoryPageParams) {
  if (!data) {
    return (
      <div className="text-center">
        Please start editing your Product document to see the preview!
      </div>
    );
  }

  return (
    <>
      <CategoryPage data={data} />
      <PreviewBanner title={data?.title ? data.title : ''} />
    </>
  );
}
