import Footer from 'components/layout/footer';
import { Suspense } from 'react';

const Placeholder = () => {
  return (
    <div className="mx-auto mb-2 w-full max-w-7xl animate-pulse py-6">
      <div className="h-10 w-1/2 rounded bg-gray-200" />
      <div className="mt-6 h-96 w-full rounded bg-gray-200" />
    </div>
  );
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="min-h-[600px] w-full">
        <Suspense fallback={<Placeholder />}>
          <div className="py-6">{children}</div>
        </Suspense>
      </div>
      <Suspense>
        <Footer />
      </Suspense>
    </>
  );
}
