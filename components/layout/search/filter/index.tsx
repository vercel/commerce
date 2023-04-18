import { SortFilterItem } from 'lib/constants';
import FilterItemDropdown from './dropdown';
import { FilterItem } from './item';

export type ListItem = SortFilterItem | PathFilterItem;
export type PathFilterItem = { title: string; path: string };

function FilterItemList({ list }: { list: ListItem[] }) {
  return (
    <div className="hidden md:block">
      {list.map((item: ListItem, i) => (
        <FilterItem key={i} item={item} />
      ))}
    </div>
  );
}

export default function FilterList({ list, title }: { list: ListItem[]; title?: string }) {
  return (
    <>
      <nav className="col-span-2 w-full flex-none px-6 py-2 md:py-4 md:pl-10">
        {title ? (
          <h3 className="hidden font-semibold text-black dark:text-white md:block">{title}</h3>
        ) : null}
        <ul className="hidden md:block">
          <FilterItemList list={list} />
        </ul>
        <ul className="md:hidden">
          <FilterItemDropdown list={list} />
        </ul>
      </nav>
    </>
  );
}
