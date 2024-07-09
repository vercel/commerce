import { getMenu } from 'lib/shopify';
import { ReactNode } from 'react';
import { fetchMakes } from './actions';
import FiltersList from './filters-list';

const YMMFiltersContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="rounded border bg-white px-6 pb-5 pt-4 @container">
      <p className="mb-3 text-xl font-semibold leading-tight tracking-tight text-neutral-700">
        Find Your Car Part
      </p>
      {children}
    </div>
  );
};

const YMMFilters = async () => {
  const makes = await fetchMakes();
  const menu = await getMenu('main-menu');

  return (
    <YMMFiltersContainer>
      <div className="flex grow flex-col items-center gap-3 @md:flex-row">
        <FiltersList makes={makes} menu={menu} />
      </div>
    </YMMFiltersContainer>
  );
};

export const YMMFiltersPlaceholder = () => {
  return (
    <YMMFiltersContainer>
      <div className="flex grow animate-pulse flex-col items-center gap-3 @md:flex-row">
        <div className="h-9 w-full rounded bg-gray-100" />
        <div className="h-9 w-full rounded bg-gray-100" />
        <div className="h-9 w-full rounded bg-gray-100" />
      </div>
    </YMMFiltersContainer>
  );
};

export default YMMFilters;
