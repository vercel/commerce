import { ENGINE_SIZE_FILTER_ID, MAKE_FILTER_ID } from 'lib/constants';
import { getProductFilters } from 'lib/shopify';
import { getCollectionUrl } from 'lib/utils';
import Link from 'next/link';

const EngineSizes = async ({
  collectionHandle,
  make
}: {
  collectionHandle: string;
  make?: string | string[];
}) => {
  // eg: collectionHandle = transmission-bmw-x5
  const makeFromCollectionHandle = collectionHandle.split('-')[1];

  if (!makeFromCollectionHandle && !make) {
    return null;
  }
  const engineSizes = await getProductFilters(
    { collection: collectionHandle, make },
    ENGINE_SIZE_FILTER_ID
  );

  if (!engineSizes || engineSizes.values.length === 0) {
    return null;
  }

  return (
    <div className="px-6 pt-10">
      <div className="mx-auto max-w-7xl">
        <h3 className="mb-6 text-3xl font-semibold lg:text-4xl">Browse Engines By Engine Sizes</h3>
        <div className="h-auto max-h-[700px] w-full overflow-auto rounded px-10 py-6 shadow">
          <div className="mt-6 grid grid-cols-2 gap-x-12 gap-y-5 md:grid-cols-3 md:gap-y-8 lg:grid-cols-4 xl:grid-cols-5">
            {engineSizes.values.map((engineSize) => (
              <Link
                href={`${getCollectionUrl(collectionHandle)}?${ENGINE_SIZE_FILTER_ID}=${engineSize.value}${make ? `&${MAKE_FILTER_ID}=${make}` : ''}`}
                key={engineSize.id}
              >
                <div className="rounded border border-primary px-2 py-1 text-sm">
                  {engineSize.label}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EngineSizes;
