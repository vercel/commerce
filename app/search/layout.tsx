import Footer from 'components/layout/footer';
import { Suspense } from 'react';

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <div className="mx-auto max-w-screen-2xl px-8 pb-4">{children}</div>
      <Footer />
    </Suspense>
  );
}
