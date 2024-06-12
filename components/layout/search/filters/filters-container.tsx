import { getProductsInCollection } from 'components/layout/products-list/actions';
import FiltersList from './filters-list';

const FiltersContainer = async ({
  searchParams
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const { filters } = await getProductsInCollection({
    searchParams
  });

  return <FiltersList filters={filters} defaultOpen={false} />;
};

export const FiltersListPlaceholder = () => {
  return (
    <div className="hidden lg:flex lg:flex-col lg:gap-4">
      <div className="h-32 w-full rounded bg-gray-200" />
      <div className="h-32 w-full rounded bg-gray-200" />
      <div className="h-32 w-full rounded bg-gray-200" />
      <div className="h-32 w-full rounded bg-gray-200" />
    </div>
  );
};
export default FiltersContainer;
