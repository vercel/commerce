import Grid from "components/grid";
import ProductGridItems from "components/layout/product-grid-items";
import { defaultSort, sorting } from "lib/constants";
import { getProducts } from "lib/shopify";

export const metadata = {
  title: "Shop All Roasts",
  description:
    "The full Lone Elk roster — small-batch coffee, fresh-roasted on demand.",
};

export default async function SearchPage(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const { sort, q: searchValue } = searchParams as { [key: string]: string };
  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;

  const products = await getProducts({ sortKey, reverse, query: searchValue });
  const resultsText = products.length > 1 ? "results" : "result";

  return (
    <>
      {searchValue ? (
        <p className="mb-6 font-mono text-xs tracking-[0.14em] text-bone/60 uppercase">
          {products.length === 0
            ? "No roasts match "
            : `${products.length} ${resultsText} for `}
          <span className="text-bone">&quot;{searchValue}&quot;</span>
        </p>
      ) : null}
      {products.length > 0 ? (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ProductGridItems products={products} />
        </Grid>
      ) : !searchValue ? (
        <p className="py-3 font-mono text-xs tracking-[0.14em] text-bone/60 uppercase">
          The roster is being restocked — check back shortly.
        </p>
      ) : null}
    </>
  );
}
