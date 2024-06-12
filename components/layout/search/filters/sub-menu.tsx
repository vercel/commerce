import { getMenu } from 'lib/shopify';
import Link from 'next/link';

const SubMenu = async ({ collection }: { collection: string }) => {
  const menu = await getMenu('main-menu');

  const subMenu = menu.find((item) => item.path === `/search/${collection}`)?.items || [];

  return subMenu.length ? (
    <div className="border-t pt-4">
      <div className="text-sm font-medium text-gray-900">Manufacturers</div>
      <ul
        role="list"
        className="ml-1 mt-2 max-h-[300px] space-y-3 overflow-y-auto border-b border-gray-200 pb-6 text-sm text-gray-600"
      >
        {subMenu.map((subMenuItem) => (
          <li key={subMenuItem.title}>
            <Link href={subMenuItem.path} className="hover:underline">
              {subMenuItem.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  ) : null;
};

export default SubMenu;
