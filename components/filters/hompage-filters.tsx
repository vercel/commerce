import { getMenu, getMetaobjects } from 'lib/shopify';
import FiltersList from './filters-list';

const title: Record<string, string> = {
  'reman-transmission': 'Find your Transmission',
  'car-part-planet': 'Find Your Car Part',
  'reman-engine': 'Fine your Engine',
  'transmission-locator': 'Find your Transmission',
  'engine-locator': 'Find your Engine'
};

const { STORE_PREFIX } = process.env;

const HomePageFilters = async () => {
  const yearsData = getMetaobjects('make_model_year_composite');
  const modelsData = getMetaobjects('make_model_composite');
  const makesData = getMetaobjects('make');

  const [years, models, makes] = await Promise.all([yearsData, modelsData, makesData]);
  const menu = await getMenu('main-menu');
  return (
    <>
      <h1 className="text-4xl font-bold tracking-tight text-white lg:text-6xl">
        {title[STORE_PREFIX!] || 'Find Your Car Part'}
      </h1>
      <div className="mt-5 flex grow flex-col items-center gap-3 @md:flex-row">
        <FiltersList
          years={years}
          makes={makes}
          models={models}
          menu={menu}
          autoFocusField="partType"
        />
      </div>
    </>
  );
};

export const HomePageFiltersPlaceholder = () => {
  return (
    <>
      <h1 className="text-4xl font-bold tracking-tight text-white lg:text-6xl">
        Find Your Car Part
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
