import { GlobeAltIcon, StarIcon } from '@heroicons/react/24/outline';
import { Metaobject } from 'lib/shopify/types';
import ButtonGroup from './button-group';
import ManufacturerItem from './item';

type ManufacturersGridProps = {
  manufacturers: Metaobject[];
  variant?: 'engine' | 'transmission' | 'home';
};

const ManufacturersGrid = ({ manufacturers, variant = 'home' }: ManufacturersGridProps) => {
  const popularManufacturers = manufacturers.filter(
    (manufacturer) => manufacturer.is_popular === 'true'
  );

  return (
    <div className="h-auto max-h-[700px] w-full overflow-auto rounded px-10 py-6 shadow">
      <p className="flex items-center gap-2">
        <StarIcon className="size-4" />
        <span className="text-sm font-medium text-blue-800">Popular Manufacturers</span>
      </p>
      <div className="mt-6 grid grid-cols-2 gap-x-12 gap-y-7 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {popularManufacturers.map((manufacturer) => (
          <div key={manufacturer.id} className="flex flex-col gap-3">
            <ManufacturerItem manufacturer={manufacturer} />
            {variant === 'home' && <ButtonGroup manufacturer={manufacturer} />}
          </div>
        ))}
      </div>
      <hr className="my-10 w-full" />
      <p className="flex items-center gap-2">
        <GlobeAltIcon className="size-4" />
        <span className="text-sm font-medium text-blue-800">All Manufacturers</span>
      </p>
      <div className="mt-6 grid grid-cols-2 gap-x-12 gap-y-7 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {manufacturers
          .toSorted((a, b) => a.display_name!.localeCompare(b.display_name!))
          .map((manufacturer) => (
            <div key={manufacturer.id} className="flex flex-col gap-3">
              <ManufacturerItem manufacturer={manufacturer} />
              {variant === 'home' && <ButtonGroup manufacturer={manufacturer} />}
            </div>
          ))}
      </div>
    </div>
  );
};

export default ManufacturersGrid;
