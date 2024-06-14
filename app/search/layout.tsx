import FAQ from 'components/faq';
import Footer from 'components/layout/footer';
import { Suspense } from 'react';

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="mx-auto mt-6 min-h-[500px] max-w-screen-2xl px-8 pb-10 lg:min-h-[800px]">
        <Suspense>{children}</Suspense>
      </div>
      <FAQ handle="plp-faqs" />

      <Footer />
    </>
  );
}
