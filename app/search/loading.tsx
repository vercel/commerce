import Grid from 'components/grid';
import FilterList from 'components/layout/search/filter';
import { sorting } from 'lib/constants';

export default function Loading() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col bg-white py-6 text-black dark:bg-black dark:text-white md:flex-row">
      <div className="order-first flex-none md:w-1/6"></div>
      <div className="order-last min-h-screen w-full md:order-none">
        <Grid className="grid-cols-2 lg:grid-cols-3">
          {Array(12)
            .fill(0)
            .map((_, index) => {
              return (
                <Grid.Item key={index} className="animate-pulse bg-gray-100 dark:bg-gray-900" />
              );
            })}
        </Grid>
      </div>
      <div className="order-none md:order-last md:w-1/6 md:flex-none">
        <FilterList list={sorting} title="Sort by" />
      </div>
    </div>
  );
}
