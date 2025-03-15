import Grid from "components/grid";
import ProductGridItems from "components/layout/product-grid-items";
import { getCollectionProducts } from "lib/store/products";
import { Metadata } from "next";

const defaultSort = {
  sortKey: "RELEVANCE",
  reverse: false,
};

export const metadata: Metadata = {
  title: "Search",
  description: "Search the collection.",
};

export default async function CategoryPage(props: {
  params: Promise<{ collection: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const { sort } = searchParams as { [key: string]: string };
  const { sortKey, reverse } = defaultSort;
  const products = await getCollectionProducts({
    collection: params.collection,
    sortKey,
    reverse,
  });

  return (
    <section>
      {products.length === 0 ? (
        <p className="py-3 text-lg">{`No products found in this collection`}</p>
      ) : (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ProductGridItems products={products} />
        </Grid>
      )}
    </section>
  );
}
