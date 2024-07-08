import { getCollection, getMetaobjectsByIds } from 'lib/shopify';
import { Metaobject } from 'lib/shopify/types';
import get from 'lodash.get';
import Link from 'next/link';

const MenuItem = async ({ collectionId, title }: { collectionId?: string; title: string }) => {
  if (!collectionId || !title) return null;

  const collection = await getCollection({ id: collectionId });

  if (!collection) return null;

  return (
    <li>
      <Link href={collection.path} className="hover:underline">
        {title}
      </Link>
    </li>
  );
};

const sortOptions = (options: Metaobject[], displayField: string) => {
  return options.toSorted((a, b) =>
    get(a, displayField).toLowerCase().localeCompare(get(b, displayField).toLowerCase())
  );
};

const sortYearOptions = (options: Metaobject[]) => {
  return options.toSorted((a, b) => parseInt(get(b, 'year'), 10) - parseInt(get(a, 'year'), 10));
};

const SubMenu = async ({ collection }: { collection: string }) => {
  const collectionData = await getCollection({ handle: collection });

  if (!collectionData || !collectionData.plpType) return null;
  let subMenu = [] as Metaobject[];
  let displayField = '';
  let title = '';

  if (collectionData.plpType === 'Product Type' && collectionData.lhnLinks) {
    displayField = 'make';
    title = 'Make';
    const response = await getMetaobjectsByIds(collectionData.lhnLinks);
    subMenu = sortOptions(response, displayField);
  }

  if (collectionData.plpType === 'Make' && collectionData.lhnLinks) {
    displayField = 'model';
    title = 'Model';
    const response = await getMetaobjectsByIds(collectionData.lhnLinks);
    subMenu = sortOptions(response, displayField);
  }

  if (collectionData.plpType === 'Model' && collectionData.lhnLinks) {
    displayField = 'year';
    title = 'Year';
    const response = await getMetaobjectsByIds(collectionData.lhnLinks);
    subMenu = sortYearOptions(response);
  }

  return subMenu.length ? (
    <div className="border-t pt-4">
      <div className="text-sm font-medium text-gray-900">{title}</div>
      <ul
        role="list"
        className="ml-1 mt-2 max-h-[300px] space-y-3 overflow-y-auto border-b border-gray-200 pb-6 text-sm text-gray-600"
      >
        {subMenu.map((subMenuItem) => (
          <MenuItem
            key={subMenuItem.id}
            collectionId={subMenuItem.collection_link}
            title={get(subMenuItem, displayField)}
          />
        ))}
      </ul>
    </div>
  ) : null;
};

export const SubMenuPlaceholder = () => {
  return (
    <div className="border-t pt-4">
      <ul role="list" className="ml-1 mt-2 animate-pulse space-y-3 border-b border-gray-200 pb-6">
        <li className="h-3 w-1/2 rounded bg-gray-200" />
        <li className="h-3 w-1/2 rounded bg-gray-200" />
        <li className="h-3 w-1/2 rounded bg-gray-200" />
        <li className="h-3 w-1/2 rounded bg-gray-200" />
        <li className="h-3 w-1/2 rounded bg-gray-200" />
      </ul>
    </div>
  );
};
export default SubMenu;
