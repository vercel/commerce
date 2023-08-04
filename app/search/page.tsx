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
        <div className="mx-auto flex max-w-screen-2xl flex-col gap-8 px-4 pb-4 text-black dark:text-white md:flex-row">
          <p className="mb-4">
            {'There are no products that match '}
            <span className="font-bold">&quot;{searchValue}&quot;</span>
          </p>
        </div>
      ) : null}
      {products.length > 0 ? (
        <div className="mx-auto flex max-w-screen-2xl flex-col gap-8 px-4 pb-4 text-black dark:text-white md:flex-row">
          <div className="order-first w-full flex-none md:max-w-[125px]">
            {searchValue ? (
              <p className="mb-4 text-sm text-neutral-500">
                {`Showing ${products.length} ${resultsText} for `}
                <span className="font-bold">&quot;{searchValue}&quot;</span>
              </p>
            ) : null}
            <p className="pt-4 text-xs text-neutral-500">
              Good place to add other suggested search terms ;)
            </p>
          </div>
          <div className="order-last min-h-screen w-full md:order-none">
            <Grid className="grid-cols-2 lg:grid-cols-3">
              <ProductGridItems products={products} />
            </Grid>
          </div>
          <div className="order-none flex-none md:order-last md:w-[125px]">
            <FilterList list={sorting} title="Sort by" />
          </div>
        </div>
      ) : null}
    </>
  );
}
