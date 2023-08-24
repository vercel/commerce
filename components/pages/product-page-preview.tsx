'use client';

import dynamic from 'next/dynamic';
import PreviewBanner from '../ui/preview-banner/preview-banner';
import type { ProductPageParams } from './product-page';

const ProductPage = dynamic(() => import('./product-page'));

export default function ProductPagePreview({ data }: ProductPageParams) {
  if (!data) {
    return (
      <div className="text-center">
        Please start editing your Product document to see the preview!
      </div>
    );
  }

  return (
    <>
      <ProductPage data={data} />
      <PreviewBanner title={data?.title ? data.title : ''} />
    </>
  );
}
