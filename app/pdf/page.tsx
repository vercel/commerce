import dynamic from 'next/dynamic';

// Dynamically import PDFTest with no SSR
const DynamicPDFTest = dynamic(() => import('components/pdf/PDFTest'), {
  ssr: false
});

export const runtime = 'edge';

export default function Test() {
  return <DynamicPDFTest />;
}
