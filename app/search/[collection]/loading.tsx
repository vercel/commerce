import BreadcrumbHome from 'components/breadcrumb/breadcrumb-home';
import { YMMFiltersPlaceholder } from 'components/filters';
import { FiltersListPlaceholder } from 'components/layout/search/filters/filters-container';
import { HeaderPlaceholder } from 'components/layout/search/header';
import ProductsGridPlaceholder from 'components/layout/search/placeholder';

const Loading = () => {
  return (
    <div className="mx-auto mt-6 max-w-screen-2xl px-8 pb-10">
      <div className="grid lg:grid-cols-3 lg:gap-x-10 xl:grid-cols-4">
        <aside className="hidden lg:block">
          <div className="mb-5">
            <YMMFiltersPlaceholder />
          </div>
          <h3 className="sr-only">Filters</h3>
          <FiltersListPlaceholder />
        </aside>
        <div className="lg:col-span-2 xl:col-span-3">
          <div className="mb-2">
            <BreadcrumbHome />
          </div>
          <HeaderPlaceholder />

          <ProductsGridPlaceholder />
        </div>
      </div>
    </div>
  );
};

export default Loading;
