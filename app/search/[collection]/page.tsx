import { getCollection } from 'lib/shopify';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import Breadcrumb from 'components/breadcrumb';
import BreadcrumbHome from 'components/breadcrumb/breadcrumb-home';
import FAQ from 'components/faq';
import YMMFilters, { YMMFiltersPlaceholder } from 'components/filters';
import Manufacturers from 'components/home-page/manufacturers';
import ProductsList from 'components/layout/products-list';
import { getProductsInCollection } from 'components/layout/products-list/actions';
import FiltersContainer, {
  FiltersListPlaceholder
} from 'components/layout/search/filters/filters-container';
import MobileFilters from 'components/layout/search/filters/mobile-filters';
import SubMenu from 'components/layout/search/filters/sub-menu';
import Header, { HeaderPlaceholder } from 'components/layout/search/header';
import HelpfulLinks from 'components/layout/search/helpful-links';
import ProductsGridPlaceholder from 'components/layout/search/placeholder';
import SortingMenu from 'components/layout/search/sorting-menu';
import { Suspense } from 'react';

export async function generateMetadata({
  params
}: {
  params: { collection: string };
}): Promise<Metadata> {
  const collection = await getCollection({ handle: params.collection });

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
    searchParams,
    collection: params.collection
  });

  return (
    <>
      <div className="my-3 block lg:hidden">
        <Suspense fallback={<YMMFiltersPlaceholder />}>
          <YMMFilters />
        </Suspense>
      </div>
      <div className="mb-5 flex w-full items-center justify-between gap-2 lg:justify-end">
        <MobileFilters filters={filters} menu={<SubMenu collection={params.collection} />} />
        <SortingMenu />
      </div>

      {products.length === 0 ? (
        <p className="py-3 text-lg">{`No products found in this collection`}</p>
      ) : (
        <ProductsList
          initialProducts={products}
          pageInfo={pageInfo}
          collection={params.collection}
          searchParams={searchParams}
          key={JSON.stringify(searchParams)}
        />
      )}
    </>
  );
}

export default async function CategorySearchPage(props: {
  params: { collection: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  return (
    <>
      <div className="mx-auto mt-6 max-w-screen-2xl px-8 pb-10">
        <div className="grid lg:grid-cols-3 lg:gap-x-10 xl:grid-cols-4">
          <aside className="hidden lg:block">
            <div className="mb-5">
              <Suspense fallback={<YMMFiltersPlaceholder />}>
                <YMMFilters />
              </Suspense>
            </div>

            <SubMenu collection={props.params.collection} />
            <h3 className="sr-only">Filters</h3>
            <Suspense
              fallback={<FiltersListPlaceholder />}
              key={`filters-${props.params.collection}`}
            >
              <FiltersContainer
                searchParams={props.searchParams}
                collection={props.params.collection}
              />
              <HelpfulLinks collection={props.params.collection} />
            </Suspense>
          </aside>
          <div className="lg:col-span-2 xl:col-span-3">
            <div className="mb-2">
              <Suspense fallback={<BreadcrumbHome />} key={`breadcrumb-${props.params.collection}`}>
                <Breadcrumb type="collection" handle={props.params.collection} />
              </Suspense>
            </div>
            <Suspense fallback={<HeaderPlaceholder />} key={`header-${props.params.collection}`}>
              <Header collection={props.params.collection} />
            </Suspense>

            <Suspense
              fallback={<ProductsGridPlaceholder />}
              key={`products-${props.params.collection}`}
            >
              <CategoryPage {...props} />
            </Suspense>
          </div>
        </div>
      </div>
      <FAQ handle="plp-faqs" />
      <Suspense>
        <Manufacturers
          variant={
            (props.params.collection as string).includes('engines') ? 'engines' : 'transmissions'
          }
        />
      </Suspense>
    </>
  );
}
