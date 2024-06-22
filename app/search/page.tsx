import YMMFilters, { YMMFiltersPlaceholder } from 'components/filters';
import Grid from 'components/grid';
import ProductsList from 'components/layout/products-list';
import { searchProducts } from 'components/layout/products-list/actions';
import SortingMenu from 'components/layout/search/sorting-menu';
import { Suspense } from 'react';

export const metadata = {
  title: 'Search',
  description: 'Search for products in the store.'
};

export default async function SearchPage({
  searchParams
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { q: searchValue } = searchParams as { [key: string]: string };
  const { products, pageInfo } = await searchProducts({ searchParams });
  const resultsText = products.length > 1 ? 'results' : 'result';

  return (
    <>
      <Suspense fallback={<YMMFiltersPlaceholder />}>
        <YMMFilters />
      </Suspense>
      <div className="my-3 flex w-full justify-end">
        <SortingMenu />
      </div>
      {searchValue ? (
        <p className="mb-4">
          {products.length === 0
            ? 'There are no products that match '
            : `Showing ${resultsText} for `}
          <span className="font-bold">&quot;{searchValue}&quot;</span>
        </p>
      ) : null}
      {products.length > 0 ? (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ProductsList
            initialProducts={products}
            pageInfo={pageInfo}
            searchParams={searchParams}
            page="search"
          />
        </Grid>
      ) : null}
    </>
  );
}
