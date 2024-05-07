import { getCollection, getCollectionProducts, getMenu } from 'lib/shopify';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import Breadcrumb from 'components/breadcrumb';
import BreadcrumbHome from 'components/breadcrumb/breadcrumb-home';
import Grid from 'components/grid';
import ProductGridItems from 'components/layout/product-grid-items';
import FiltersList from 'components/layout/search/filters/filters-list';
import MobileFilters from 'components/layout/search/filters/mobile-filters';
import SubMenu from 'components/layout/search/filters/sub-menu';
import SortingMenu from 'components/layout/search/sorting-menu';
import {
  AVAILABILITY_FILTER_ID,
  PRICE_FILTER_ID,
  PRODUCT_METAFIELD_PREFIX,
  VARIANT_METAFIELD_PREFIX,
  defaultSort,
  sorting
} from 'lib/constants';
import { Suspense } from 'react';

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

const constructFilterInput = (filters: {
  [key: string]: string | string[] | undefined;
}): Array<object> => {
  const results = [] as Array<object>;
  Object.entries(filters)
    .filter(([key]) => key !== PRICE_FILTER_ID)
    .forEach(([key, value]) => {
      const [namespace, metafieldKey] = key.split('.').slice(-2);
      const values = Array.isArray(value) ? value : [value];

      if (key === AVAILABILITY_FILTER_ID) {
        results.push({
          available: value === 'true'
        });
      } else if (key.startsWith(PRODUCT_METAFIELD_PREFIX)) {
        results.push(
          ...values.map((v) => ({
            productMetafield: {
              namespace,
              key: metafieldKey,
              value: v
            }
          }))
        );
      } else if (key.startsWith(VARIANT_METAFIELD_PREFIX)) {
        results.push(
          ...values.map((v) => ({
            variantMetafield: {
              namespace,
              key: metafieldKey,
              value: v
            }
          }))
        );
      }
    });

  return results;
};

export default async function CategoryPage({
  params,
  searchParams
}: {
  params: { collection: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { sort, q, collection: _collection, ...rest } = searchParams as { [key: string]: string };
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;

  const filtersInput = constructFilterInput(rest);

  const productsData = getCollectionProducts({
    collection: params.collection,
    sortKey,
    reverse,
    ...(filtersInput.length ? { filters: filtersInput } : {})
  });
  const collectionData = getCollection(params.collection);
  const menuData = getMenu('main-menu');

  const [{ products, filters }, collection, menu] = await Promise.all([
    productsData,
    collectionData,
    menuData
  ]);

  return (
    <>
      <div className="mb-2">
        <Suspense fallback={<BreadcrumbHome />}>
          <Breadcrumb type="collection" handle={params.collection} />
        </Suspense>
      </div>
      {collection ? (
        <div className="mb-3 mt-3 max-w-5xl lg:mb-1">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">{collection.title}</h1>
          <p className="mt-2 text-base text-gray-500">{collection.description}</p>
        </div>
      ) : null}
      <div className="flex w-full flex-wrap items-center justify-between lg:justify-end">
        <MobileFilters collection={params.collection} filters={filters} menu={menu} />
        <SortingMenu />
      </div>
      <section>
        {products.length === 0 ? (
          <p className="py-3 text-lg">{`No products found in this collection`}</p>
        ) : (
          <Grid className="pt-5 lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
            <aside className="hidden lg:block">
              <SubMenu menu={menu} collection={params.collection} />
              <h3 className="sr-only">Filters</h3>
              <FiltersList filters={filters} />
            </aside>
            <div className="lg:col-span-2 xl:col-span-3">
              <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                <ProductGridItems products={products} />
              </Grid>
            </div>
          </Grid>
        )}
      </section>
    </>
  );
}
