import { getMenu } from 'lib/shopify';
import Link from 'next/link';

const SubMenu = async ({ collection }: { collection: string }) => {
  const menu = await getMenu('main-menu');

  const subMenu = menu.find((item) => item.path === `/search/${collection}`)?.items || [];

  return subMenu.length ? (
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
  ) : null;
};

export default SubMenu;
