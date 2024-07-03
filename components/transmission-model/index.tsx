import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { MAKE_FILTER_ID, MODEL_FILTER_ID } from 'lib/constants';
import { getProductFilters } from 'lib/shopify';
import { getCollectionUrl } from 'lib/utils';
import Link from 'next/link';

const TransmissionModels = async ({
  collectionHandle,
  make
}: {
  collectionHandle: string;
  make?: string;
}) => {
  // eg: collectionHandle = transmission-bmw-x5
  const makeFromCollectionHandle = collectionHandle.split('-')[1];

  if (!makeFromCollectionHandle && !make) {
    return null;
  }

  const transmissionModels = await getProductFilters(
    { collection: collectionHandle, make },
    MODEL_FILTER_ID
  );

  if (!transmissionModels || transmissionModels.values.length === 0) {
    return null;
  }

  return (
    <div className="px-6 pt-20">
      <div className="mx-auto max-w-7xl">
        <h3 className="mb-6 text-3xl font-semibold lg:text-4xl">Browse By Transmission Models</h3>
        <div className="h-auto max-h-[700px] w-full overflow-auto rounded px-10 py-6 shadow">
          <p className="flex items-center gap-2">
            <GlobeAltIcon className="size-4" />
            <span className="font-medium text-blue-800">Models</span>
          </p>
          <div className="mt-6 grid grid-cols-2 gap-x-12 gap-y-5 md:grid-cols-3 md:gap-y-8 lg:grid-cols-4 xl:grid-cols-5">
            {transmissionModels.values.map((model) => (
              <Link
                href={`${getCollectionUrl(collectionHandle)}?${MODEL_FILTER_ID}=${model.value}${make ? `&${MAKE_FILTER_ID}=${make}` : ''}`}
                key={model.id}
              >
                <div className="rounded border border-primary px-2 py-1 text-sm">{model.label}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransmissionModels;
