import { Filter } from 'components/layout/search/filter';
import { SearchInput } from 'components/layout/search/search-input';
import { Sort } from 'components/layout/search/sort';

export function Search() {
  return (
    <>
      <section className="bg-brownBg flex justify-between gap-[30px] px-[50px] py-4">
        <SearchInput />
        <Filter />
        <Sort />
      </section>
    </>
  );
}
