import { StarIcon } from '@heroicons/react/24/outline';
import Tag from 'components/tag';
import { TRANSMISSION_CODE_FILTER_ID } from 'lib/constants';
import { getProductFilters } from 'lib/shopify';
import { getCollectionUrl } from 'lib/utils';
import Link from 'next/link';

const TransmissionCode = async ({ collectionHandle }: { collectionHandle: string }) => {
  const transmissionCodes = await getProductFilters(
    { collection: collectionHandle },
    TRANSMISSION_CODE_FILTER_ID
  );

  if (!transmissionCodes || transmissionCodes.values.length === 0) {
    return null;
  }

  return (
    <div className="px-6 pt-20">
      <div className="mx-auto flex max-w-7xl flex-col gap-3">
        <Tag text="Get Started" />
        <h3 className="mb-3 text-3xl font-semibold lg:text-4xl">{`Browse By Transmission Code`}</h3>
        <div className="h-auto max-h-[700px] w-full overflow-auto rounded px-10 py-6 shadow">
          <p className="flex items-center gap-2">
            <StarIcon className="size-4" />
            <span className="font-medium text-blue-800">Popular Transmission Codes</span>
          </p>
          <div className="mt-6 grid grid-cols-2 gap-x-12 gap-y-5 md:grid-cols-3 md:gap-y-8 lg:grid-cols-4 xl:grid-cols-5">
            {transmissionCodes.values.map((transmissionCode) => (
              <Link
                href={`${getCollectionUrl(collectionHandle)}?${TRANSMISSION_CODE_FILTER_ID}=${transmissionCode.value}`}
                key={transmissionCode.id}
              >
                <div className="rounded border border-primary px-2 py-1 text-sm">
                  {transmissionCode.label}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransmissionCode;
