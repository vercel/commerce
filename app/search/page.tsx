import Grid from 'components/grid';
import ProductGridItems from 'components/layout/product-grid-items';
import FilterList from 'components/layout/search/filter';
import { defaultSort, sorting } from 'lib/constants';
import { getSearchCollectionProducts } from 'lib/shopware';

export const runtime = 'edge';

export const metadata = {
  title: 'Search',
  description: 'Search for products in the store.'
};

export default async function SearchPage({
  searchParams
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { sort, q: searchValue } = searchParams as { [key: string]: string };
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;

  const products = await getSearchCollectionProducts({ sortKey, reverse, query: searchValue });
  const resultsText = products.length > 1 ? 'results' : 'result';

  return (
    <>
      {searchValue && products.length === 0 ? (
        <div className="mx-auto flex max-w-7xl flex-col bg-white py-6 text-black dark:bg-black dark:text-white md:flex-row">
          <p>
            {'There are no products that match '}
            <span className="font-bold">&quot;{searchValue}&quot;</span>
          </p>
        </div>
      ) : null}
      {products.length > 0 ? (
        <div className="mx-auto flex max-w-7xl flex-col bg-white py-6 text-black dark:bg-black dark:text-white md:flex-row">
          <div className="order-first flex-none md:w-1/6">
            {searchValue ? (
              <p>
                {`Showing ${products.length} ${resultsText} for `}
                <span className="font-bold">&quot;{searchValue}&quot;</span>
              </p>
            ) : null}
            <p className="pt-4">Good place to add other suggest search terms ;)</p>
          </div>
          <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <ProductGridItems products={products} />
          </Grid>
          <div className="order-none md:order-last md:w-1/6 md:flex-none">
            <FilterList list={sorting} title="Sort by" />
          </div>
        </div>
      ) : null}
    </>
  );
}
