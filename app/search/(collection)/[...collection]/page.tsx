import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import Grid from 'components/grid';
import Collections from 'components/layout/search/collections';
import FilterList from 'components/layout/search/filter';
import ProductGridItems from 'components/layout/product-grid-items';
import Pagination from 'components/collection/pagination';

import { getCollection, getCollectionProducts } from 'lib/shopware';
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
  const { sort, page } = searchParams as { [key: string]: string };
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;

  const { products, total, limit } = await getCollectionProducts({
    collection: params.collection,
    page: page ? parseInt(page) : 1,
    sortKey,
    reverse
  });

  return (
    <section>
      {products.length === 0 ? (
        <p className="py-3 text-lg">{`No products found in this collection`}</p>
      ) : (
        <div className="mx-auto flex max-w-7xl flex-col bg-white py-6 text-black dark:bg-black dark:text-white md:flex-row">
          <div className="order-first flex-none md:w-1/6">
            <Collections collection={params.collection} />
          </div>
          <div className="order-last min-h-screen w-full md:order-none">
            <Grid className="grid-cols-2 lg:grid-cols-3">
              <ProductGridItems products={products} />
            </Grid>
            <nav aria-label="Collection pagination" className="block items-center sm:flex">
              <Pagination
                itemsPerPage={limit}
                itemsTotal={total}
                currentPage={page ? parseInt(page) - 1 : 0}
              />
            </nav>
          </div>
          <div className="order-none md:order-last md:w-1/6 md:flex-none">
            <FilterList list={sorting} title="Sort by" />
          </div>
        </div>
      )}
    </section>
  );
}
