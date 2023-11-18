'use client';

import dynamic from 'next/dynamic';

// const DynamicPDFTest = dynamic(() => import('components/pdf/PDFTest'), {
//   ssr: false
// });

const GenerateStoryComponent = dynamic(() => import('components/generate/GenerateStoryComponent'), {
  ssr: false
});

export const runtime = 'edge';

export default function Test() {
  return <GenerateStoryComponent />;
}
