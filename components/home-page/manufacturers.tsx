import ManufacturersGrid from 'components/manufacturers-grid';
import Tag from 'components/tag';
import { getMetaobjects } from 'lib/shopify';

const Manufacturers = async ({
  variant = 'home'
}: {
  variant?: 'engines' | 'transmissions' | 'home';
}) => {
  const manufacturers = await getMetaobjects('make');
  const title: Record<typeof variant, string> = {
    engines: 'Engines',
    home: 'Parts',
    transmissions: 'Transmissions'
  };

  return (
    <div className="px-6 py-20">
      <div className="mx-auto flex max-w-7xl flex-col gap-3">
        <Tag text="Get Started" />
        <h3 className="mb-3 text-3xl font-semibold lg:text-4xl">{`Browse ${title[variant]} By Manufacturer`}</h3>
        <ManufacturersGrid manufacturers={manufacturers} variant={variant} />
      </div>
    </div>
  );
};

export default Manufacturers;
