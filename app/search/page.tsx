import Grid from 'components/grid';
import ProductGridItems from 'components/layout/product-grid-items';
import { orama, parseSorting } from 'lib/orama';
import { Product } from 'lib/shopify/types';

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

  const products = await orama.search({
    term: searchValue,
    boost: {
      title: 2
    },
    sortBy: parseSorting(sort),
    limit: 50,
  })

  const resultsText = products.count > 1 ? 'results' : 'result';
  const docs = products.hits.map((hit: any) => hit.document) as Product[];

  return (
    <>
      {searchValue ? (
        <p className="mb-4">
          {products.count === 0
            ? 'There are no products that match '
            : `Showing ${products.count} ${resultsText} for `}
          <span className="font-bold">&quot;{searchValue}&quot;</span>
        </p>
      ) : null}
      {products.count > 0 ? (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ProductGridItems products={docs} />
        </Grid>
      ) : null}
    </>
  );
}
