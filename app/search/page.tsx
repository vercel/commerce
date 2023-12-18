import Grid from 'components/grid';
import ProductGridItems from 'components/layout/product-grid-items';
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
  const totalProducts = products.length;
  const isProductEmpty = totalProduct === 0;
  const resultsText = totalProducts > 1 ? 'results' : 'result';

  if(searchValue && isProductEmpty){
    return (
      <p className="mb-4">
      There are no products that match
      </p>
      )
  }

  if(searchValue && !isProductEmpty){
    return (
      <>
        <p className="mb-4">
          {`Showing ${totalProducts} ${resultsText} for `}
        </p>
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <ProductGridItems products={products} />
        </Grid>
      </>
    )
  }
  
  return null;
}
