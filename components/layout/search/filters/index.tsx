import { getMenu } from 'lib/shopify';
import { Filter } from 'lib/shopify/types';
import Link from 'next/link';
import FiltersList from './filters-list';

const Filters = async ({ collection, filters }: { collection: string; filters: Filter[] }) => {
  const menu = await getMenu('main-menu');
  const subMenu = menu.find((item) => item.path === `/search/${collection}`)?.items || [];
  return (
    <div>
      {subMenu.length ? (
        <>
          <h3 className="sr-only">Categories</h3>
          <ul
            role="list"
            className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"
          >
            {subMenu.map((subMenuItem) => (
              <li key={subMenuItem.title}>
                <Link href={subMenuItem.path} className="hover:underline">
                  {subMenuItem.title}
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : null}
      <h3 className="sr-only">Filters</h3>
      <FiltersList filters={filters} />
    </div>
  );
};

export default Filters;
