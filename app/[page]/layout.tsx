import Footer from 'components/layout/footer';
import { Suspense } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <div className="w-full bg-white dark:bg-black">
        <div className="mx-8 max-w-2xl py-20 sm:mx-auto">
          <Suspense>{children}</Suspense>
        </div>
      </div>
      {/* @ts-expect-error Server Component */}
      <Footer />
    </Suspense>
  );
}
