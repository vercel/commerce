import { getCollection } from 'lib/shopify';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import Breadcrumb from 'components/breadcrumb';
import BreadcrumbHome from 'components/breadcrumb/breadcrumb-home';
import YMMFilters, { YMMFiltersPlaceholder } from 'components/filters';
import Grid from 'components/grid';
import ProductsList from 'components/layout/products-list';
import { getProductsInCollection } from 'components/layout/products-list/actions';
import FiltersList from 'components/layout/search/filters/filters-list';
import MobileFilters from 'components/layout/search/filters/mobile-filters';
import SubMenu from 'components/layout/search/filters/sub-menu';
import Header, { HeaderPlaceholder } from 'components/layout/search/header';
import ProductsGridPlaceholder from 'components/layout/search/placeholder';
import SortingMenu from 'components/layout/search/sorting-menu';
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

async function CategoryPage({
  params,
  searchParams
}: {
  params: { collection: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { products, filters, pageInfo } = await getProductsInCollection({
    searchParams
  });

  return (
    <>
      <div className="flex w-full items-center justify-between gap-2 lg:justify-end">
        <MobileFilters filters={filters} menu={<SubMenu collection={params.collection} />} />
        <SortingMenu />
      </div>
      <section>
        <Grid className="pt-5 lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
          <aside className="hidden lg:block">
            <SubMenu collection={params.collection} />
            <h3 className="sr-only">Filters</h3>
            <FiltersList filters={filters} />
          </aside>
          <div className="lg:col-span-2 xl:col-span-3">
            <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {products.length === 0 ? (
                <p className="py-3 text-lg">{`No products found in this collection`}</p>
              ) : (
                <ProductsList
                  initialProducts={products}
                  pageInfo={pageInfo}
                  page="collection"
                  searchParams={searchParams}
                  key={JSON.stringify(searchParams)}
                />
              )}
            </Grid>
          </div>
        </Grid>
      </section>
    </>
  );
}

export default function CategorySearchPage(props: {
  params: { collection: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  return (
    <>
      <div className="mb-2">
        <Suspense fallback={<BreadcrumbHome />}>
          <Breadcrumb type="collection" handle={props.params.collection} />
        </Suspense>
      </div>
      <Suspense fallback={<HeaderPlaceholder />}>
        <Header collection={props.params.collection} />
      </Suspense>
      <div className="my-3">
        <Suspense fallback={<YMMFiltersPlaceholder />}>
          <YMMFilters />
        </Suspense>
      </div>
      <Suspense fallback={<ProductsGridPlaceholder />}>
        <CategoryPage {...props} />
      </Suspense>
    </>
  );
}
