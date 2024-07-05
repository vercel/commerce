import { MODEL_FILTER_ID, YEAR_FILTER_ID } from 'lib/constants';
import { getProductFilters } from 'lib/shopify';
import { Filter } from 'lib/shopify/types';
import { getCollectionUrl } from 'lib/utils';
import kebabCase from 'lodash.kebabcase';
import Link from 'next/link';

type MakeModelFiltersProps = {
  collection: string;
};

const MakeModelFilters = async ({ collection }: MakeModelFiltersProps) => {
  if (!collection) return null;

  const [, make, model] = collection.split('_');
  if (!make && !model) return null;

  let data = null as Filter | null | undefined;
  let title = '';

  if (model) {
    data = await getProductFilters({ collection }, YEAR_FILTER_ID);
    title = 'Years';
  } else if (make) {
    data = await getProductFilters({ collection }, MODEL_FILTER_ID);
    title = 'Models';
  }

  if (!data?.values || !data?.values.length) return null;

  return (
    <div className="border-t pt-4">
      <div className="text-sm font-medium text-gray-900">{title}</div>
      <ul
        role="list"
        className="ml-1 mt-2 max-h-[300px] space-y-3 overflow-y-auto border-b border-gray-200 pb-6 text-sm text-gray-600"
      >
        {data.values.map((item) => (
          <li key={item.id}>
            <Link
              href={`${getCollectionUrl(`${collection}_${kebabCase(item.label)}`)}`}
              className="hover:underline"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MakeModelFilters;
