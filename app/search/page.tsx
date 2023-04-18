import SearchResults from 'components/layout/search/results';
import { defaultSort, sorting } from 'lib/constants';
import { getProducts } from 'lib/shopify';

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

  const products = await getProducts({ sortKey, reverse, query: searchValue });
  const resultsText = products.length > 1 ? 'results' : 'result';

  return (
    <>
      {searchValue &&
        (products.length > 0 ? (
          <p>
            {`Showing ${products.length} ${resultsText} for `}
            <span className="font-bold">&quot;{searchValue}&quot;</span>
          </p>
        ) : (
          <p>
            {'There are no products that match '}
            <span className="font-bold">&quot;{searchValue}&quot;</span>
          </p>
        ))}
      {/* @ts-expect-error Server Component */}
      <SearchResults products={products} />
    </>
  );
}
