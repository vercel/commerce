import Link from 'next/link';
import { MenuItem } from '../../lib/shopify/types';

type MenuItemProps = {
  item: MenuItem;
  isSubMenu?: boolean;
};

const MenuItemComponent = ({ item, isSubMenu = false }: MenuItemProps) => {
  return (
    <li className={`group relative  ${isSubMenu ? 'submenu-item p-2' : ''}`}>
      <Link
        href={item.path}
        className="pl-2 font-semibold text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
      >
        {item.title}
      </Link>
      {item.items.length > 0 && (
        <ul className="absolute left-0 top-full z-10  hidden w-48 rounded-xl bg-white shadow-lg group-hover:block">
          {item.items.map((subItem) => (
            <MenuItemComponent key={subItem.title} item={subItem} isSubMenu={true} />
          ))}
        </ul>
      )}
      {isSubMenu && item.items.length > 0 && (
        <ul className="absolute left-0 top-full z-10 hidden w-48 bg-white shadow-lg group-hover:block">
          {item.items.map((subItem, index) =>
            index === 2 ? (
              <MenuItemComponent key={subItem.title} item={subItem} isSubMenu={true} />
            ) : null
          )}
        </ul>
      )}
    </li>
  );
};

export default MenuItemComponent;
