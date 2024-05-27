import { getCollection } from 'lib/shopify';

const Header = async ({ collection }: { collection: string }) => {
  const collectionData = await getCollection({ handle: collection });

  return collectionData ? (
    <div className="mb-3 mt-3 max-w-5xl lg:mb-1">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900">{collectionData.title}</h1>
      <p className="mt-2 text-base text-gray-500">{collectionData.description}</p>
    </div>
  ) : null;
};

export const HeaderPlaceholder = () => {
  return (
    <div className="mb-3 mt-3 max-w-5xl lg:mb-1">
      <div className="h-10 w-1/2 rounded bg-gray-200" />
    </div>
  );
};
export default Header;
