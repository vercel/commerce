import Grid from 'components/grid';
import FilterList from 'components/layout/search/filter';
import { sorting } from 'lib/constants';

export default function Loading() {
  return (
    <div className="mx-auto flex max-w-screen-2xl flex-col gap-8 px-4 pb-4 text-black dark:text-white md:flex-row">
      <div className="order-first w-full flex-none md:max-w-[125px]"></div>
      <div className="order-last min-h-screen w-full md:order-none">
        <Grid className="grid-cols-2 lg:grid-cols-3">
          {Array(12)
            .fill(0)
            .map((_, index) => {
              return (
                <Grid.Item
                  key={index}
                  className="animate-pulse bg-neutral-100 dark:bg-neutral-900"
                />
              );
            })}
        </Grid>
      </div>
      <div className="order-none flex-none md:order-last md:w-[125px]">
        <FilterList list={sorting} title="Sort by" />
      </div>
    </div>
  );
}
