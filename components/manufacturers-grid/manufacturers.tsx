import { getMetaobjects } from 'lib/shopify';
import ManufacturersGrid from './grid';

const Manufacturers = async ({
  variant = 'home'
}: {
  variant?: 'engines' | 'transmissions' | 'home' | 'remanufactured-engines' | 'transfer-cases';
}) => {
  const manufacturers = await getMetaobjects('make');
  const title: Record<typeof variant, string> = {
    engines: 'Engines',
    home: 'Parts',
    transmissions: 'Transmissions',
    'remanufactured-engines': 'Remanufactured Engines',
    'transfer-cases': 'Transfer Cases'
  };

  return (
    <div>
      <h3 className="mb-3 text-3xl font-semibold text-content-strong lg:text-4xl">{`Browse ${title[variant]} By Manufacturer`}</h3>
      <ManufacturersGrid manufacturers={manufacturers} variant={variant} />
    </div>
  );
};

export default Manufacturers;
