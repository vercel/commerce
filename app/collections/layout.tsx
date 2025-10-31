import Footer from 'components/layout/footer';
import Collections from 'components/layout/search/collections';
import FilterList from 'components/layout/search/filter';
import { sorting } from 'lib/constants';
import { Suspense } from 'react';

export default function CollectionsLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="mx-auto flex max-w-(--breakpoint-2xl) flex-col gap-8 px-4 pb-4 text-black md:flex-row dark:text-white">
        <div className="order-first w-full flex-none self-start md:max-w-[175px] md:sticky md:top-(--header-offset)">
          <Collections />
        </div>
        <div className="order-last min-h-screen w-full md:order-0">
          <Suspense fallback={null}>
            {children}
          </Suspense>
        </div>
        <div className="order-0 flex-none self-start md:w-[175px] md:sticky md:top-(--header-offset) md:order-last">
          <FilterList list={sorting} title="Sort by" />
        </div>
      </div>
      <Footer />
    </>
  );
}

