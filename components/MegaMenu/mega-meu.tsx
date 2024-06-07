import { MenuItem } from '../../lib/shopify/types';
import MenuItemComponent from './menu-item-component';

type MegaMenuProps = {
  menu: MenuItem[];
};

const MegaMenu = ({ menu }: MegaMenuProps) => {
  return (
    <div className="mt-4 hidden justify-center md:flex">
      <ul className="text-md flex gap-6 font-semibold">
        {menu.map((item) => (
          <MenuItemComponent key={item.title} item={item} />
        ))}
      </ul>
    </div>
  );
};

export default MegaMenu;
