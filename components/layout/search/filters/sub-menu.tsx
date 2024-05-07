import { Menu } from 'lib/shopify/types';
import Link from 'next/link';

const SubMenu = ({ menu, collection }: { menu: Menu[]; collection: string }) => {
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
