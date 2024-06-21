import { MenuItem } from '../../lib/shopify/types';
import classes from './MegaMenu.module.scss';
import MenuItemComponent from './menu-item-component';

type MegaMenuProps = {
  menu: MenuItem[];
};

const MegaMenu = ({ menu }: MegaMenuProps) => {
  return (
    <div className={classes.megaMenu}>
      <ul className={classes.menuList}>
        {menu.map((item) => (
          <MenuItemComponent key={item.title} item={item} />
        ))}
      </ul>
    </div>
  );
};

export default MegaMenu;
