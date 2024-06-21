import Link from 'next/link';
import { MenuItem } from '../../lib/shopify/types';
import styles from './MenuItemComponent.module.scss'; // Importing the SCSS module

type MenuItemProps = {
  item: MenuItem;
  isSubMenu?: boolean;
};

const MenuItemComponent = ({ item, isSubMenu = false }: MenuItemProps) => {
  return (
    <li className={`${styles.menuItem} ${isSubMenu ? styles.submenuItem : ''}`}>
      <Link href={item.path} className={styles.menuLink}>
        {item.title}
      </Link>
      {item.items.length > 0 && (
        <ul className={`${styles.subMenu} ${styles.dropdown}`}>
          {item.items.map((subItem) => (
            <MenuItemComponent key={subItem.title} item={subItem} isSubMenu={true} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default MenuItemComponent;
