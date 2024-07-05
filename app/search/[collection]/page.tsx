import { getCollection } from 'lib/shopify';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import Breadcrumb from 'components/breadcrumb';
import BreadcrumbHome from 'components/breadcrumb/breadcrumb-home';
import EngineSizes from 'components/engine-sizes';
import FAQ from 'components/faq';
import YMMFilters, { YMMFiltersPlaceholder } from 'components/filters';
import Manufacturers from 'components/home-page/manufacturers';
import ProductsList from 'components/layout/products-list';
import { getProductsInCollection } from 'components/layout/products-list/actions';
import FiltersContainer, {
  FiltersListPlaceholder
} from 'components/layout/search/filters/filters-container';
import MakeModelFilters from 'components/layout/search/filters/make-model-filters';
import MobileFilters from 'components/layout/search/filters/mobile-filters';
import SubMenu from 'components/layout/search/filters/sub-menu';
import Header, { HeaderPlaceholder } from 'components/layout/search/header';
import HelpfulLinks from 'components/layout/search/helpful-links';
import ProductsGridPlaceholder from 'components/layout/search/placeholder';
import SortingMenu from 'components/layout/search/sorting-menu';
import Models from 'components/models';
import TransmissionCode from 'components/transmission-codes';
import { MAKE_FILTER_ID } from 'lib/constants';
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
  const collectionHandle = props.params.collection;
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

            <SubMenu collection={collectionHandle} />
            <Suspense>
              <MakeModelFilters collection={collectionHandle} />
            </Suspense>
            <h3 className="sr-only">Filters</h3>
            <Suspense fallback={<FiltersListPlaceholder />} key={`filters-${collectionHandle}`}>
              <FiltersContainer searchParams={props.searchParams} collection={collectionHandle} />
              <HelpfulLinks collection={collectionHandle} />
            </Suspense>
          </aside>
          <div className="lg:col-span-2 xl:col-span-3">
            <div className="mb-2">
              <Suspense fallback={<BreadcrumbHome />} key={`breadcrumb-${collectionHandle}`}>
                <Breadcrumb type="collection" handle={collectionHandle} />
              </Suspense>
            </div>
            <Suspense fallback={<HeaderPlaceholder />} key={`header-${collectionHandle}`}>
              <Header collection={collectionHandle} />
            </Suspense>

            <Suspense fallback={<ProductsGridPlaceholder />} key={`products-${collectionHandle}`}>
              <CategoryPage {...props} />
            </Suspense>
          </div>
        </div>
      </div>
      <FAQ handle="plp-faqs" />
      {collectionHandle.startsWith('transmissions') && (
        <Suspense>
          <TransmissionCode
            collectionHandle={collectionHandle}
            make={props.searchParams?.[MAKE_FILTER_ID]}
          />
        </Suspense>
      )}
      {['transmissions', 'engines', 'remanufactured-engines'].some((url) =>
        collectionHandle.startsWith(url)
      ) && (
        <Suspense>
          <Models collectionHandle={collectionHandle} make={props.searchParams?.[MAKE_FILTER_ID]} />
        </Suspense>
      )}

      {['engines', 'remanufactured-engines'].some((url) => collectionHandle.startsWith(url)) && (
        <Suspense>
          <EngineSizes
            collectionHandle={collectionHandle}
            make={props.searchParams?.[MAKE_FILTER_ID]}
          />
        </Suspense>
      )}

      <Suspense>
        <Manufacturers
          variant={(collectionHandle as string).includes('engines') ? 'engines' : 'transmissions'}
        />
      </Suspense>
    </>
  );
}
