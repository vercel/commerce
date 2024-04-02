import { getCollection, getCollectionProducts } from 'lib/shopify';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ShirtGridItem } from 'components/grid/homepageShirts';
import { defaultSort, sorting } from 'lib/constants';

export const runtime = 'edge';

export async function generateMetadata({
  params
}: {
  params: { collection: string };
}): Promise<Metadata> {
  const collection = await getCollection(params.collection);

  if (!collection) return notFound();

  return {
    title: collection.seo?.title || collection.title,
    description:
      collection.seo?.description || collection.description || `${collection.title} products`
  };
}

export default async function CategoryPage({
  params,
  searchParams
}: {
  params: { collection: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { sort } = searchParams as { [key: string]: string };
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;
  const products = await getCollectionProducts({ collection: params.collection, sortKey, reverse });

  return (
    <section className="mx-auto grid max-w-screen-2xl gap-4 gap-y-32 px-4 pb-24 md:grid-cols-3 md:grid-rows-2 md:gap-y-16">
      {products.length === 0 ? (
        <p className="py-3 text-lg">{`No products found in this collection`}</p>
      ) : (
        // <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        //   <ProductGridItems products={products} />
        // </Grid>
        products.map((product) => (
          <ShirtGridItem key={product.id} size="third" item={product} priority={true} />
        ))
      )}
    </section>
  );
}
