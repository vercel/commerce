import { getMenu } from 'lib/shopify';
import { getMMYFilters } from 'lib/vercel-kv';
import FiltersList from './filters-list';

const title: Record<string, string> = {
  'reman-transmission': 'Find Your Transmission',
  'car-part-planet': 'Find Your Part',
  'reman-engine': 'Fine Your Engine',
  'transmission-locator': 'Find Your Transmission',
  'engine-locator': 'Find Your Engine'
};

const { STORE_PREFIX } = process.env;

const HomePageFilters = async () => {
  const menu = await getMenu('main-menu');
  const data = await getMMYFilters();

  return (
    <>
      <h1 className="text-4xl font-bold tracking-tight text-white lg:text-6xl">
        {title[STORE_PREFIX!] || 'Find Your Part'}
      </h1>
      <div className="mt-5 flex grow flex-col items-center gap-3 @md:flex-row">
        <FiltersList menu={menu} {...data} />
      </div>
    </>
  );
};

export const HomePageFiltersPlaceholder = () => {
  return (
    <>
      <h1 className="text-4xl font-bold tracking-tight text-white lg:text-6xl">
        {title[STORE_PREFIX!] || 'Find Your Part'}
      </h1>
      <div className="mt-5 flex w-full flex-col items-center gap-3 md:flex-row">
        <div className="h-9 w-full rounded bg-gray-50 opacity-50" />
        <div className="h-9 w-full rounded bg-gray-50 opacity-50" />
        <div className="h-9 w-full rounded bg-gray-50 opacity-50" />
      </div>
    </>
  );
};

export default HomePageFilters;
