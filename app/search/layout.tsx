import Footer from 'components/layout/footer';
import Collections from 'components/layout/search/collections';
import FilterList from 'components/layout/search/filter';
import { sorting } from 'lib/constants';
import { Suspense } from 'react';

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <div className="mx-auto flex max-w-screen-2xl flex-col px-4 py-6 text-black dark:text-white md:flex-row">
        <div className="order-first flex-none md:pr-12 md:pt-6">
          <Collections />
        </div>
        <div className="order-last min-h-screen w-full md:order-none">{children}</div>
        <div className="order-none md:order-last md:flex-none md:pl-12 md:pt-6">
          <FilterList list={sorting} title="Sort by" />
        </div>
      </div>
      <Footer />
    </Suspense>
  );
}
