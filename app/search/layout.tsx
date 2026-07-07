import Footer from "components/layout/footer";
import Collections from "components/layout/search/collections";
import FilterList from "components/layout/search/filter";
import { sorting } from "lib/constants";
import ChildrenWrapper from "./children-wrapper";
import { Suspense } from "react";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="border-b border-seam">
        <div className="mx-auto w-full max-w-(--breakpoint-2xl) px-4 py-10">
          <p className="font-mono text-[11px] tracking-[0.35em] text-field uppercase">
            The Roster
          </p>
          <h1 className="font-display mt-2 text-4xl font-bold tracking-[0.1em] uppercase md:text-5xl">
            All Roasts
          </h1>
        </div>
      </div>
      <div className="mx-auto flex max-w-(--breakpoint-2xl) flex-col gap-8 px-4 pt-8 pb-12 text-bone md:flex-row">
        <div className="order-first w-full flex-none md:max-w-[140px]">
          <Collections />
        </div>
        <div className="order-last min-h-screen w-full md:order-none">
          <Suspense fallback={null}>
            <ChildrenWrapper>{children}</ChildrenWrapper>
          </Suspense>
        </div>
        <div className="order-none flex-none md:order-last md:w-[140px]">
          <FilterList list={sorting} title="Sort by" />
        </div>
      </div>
      <Footer />
    </>
  );
}
