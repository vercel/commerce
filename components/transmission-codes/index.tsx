import { StarIcon } from '@heroicons/react/24/outline';
import Tag from 'components/tag';
import { getCollection, getMetaobjectsByIds } from 'lib/shopify';
import { Metaobject } from 'lib/shopify/types';
import Link from 'next/link';

const { STORE_PREFIX } = process.env;

const validStores = ['car-part-planet', 'reman-transmission', 'transmission-locator'];

const LinkBlock = async ({ collectionId, title }: { collectionId?: string; title?: string }) => {
  if (!collectionId || !title) return null;

  const collection = await getCollection({ id: collectionId });

  if (!collection) return null;

  return (
    <Link href={collection.path}>
      <div className="rounded border border-primary px-2 py-1 text-sm">{title}</div>
    </Link>
  );
};
const TransmissionCode = async ({ collectionHandle }: { collectionHandle: string }) => {
  const collection = await getCollection({ handle: collectionHandle });
  if (!collection || !collection.plpType || !validStores.includes(STORE_PREFIX!)) {
    return null;
  }

  let transmissionCodes = [] as Metaobject[];

  if (
    (collection.plpType === 'Product Type' || collection.plpType === 'Make') &&
    collection.transmissionCodeLinks
  ) {
    transmissionCodes = await getMetaobjectsByIds(collection.transmissionCodeLinks);
  }

  if (!transmissionCodes.length) {
    return null;
  }

  return (
    <div className="px-6 py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-3">
        <Tag text="Get Started" />
        <h3 className="mb-3 text-3xl font-semibold lg:text-4xl">{`Browse By Transmission Code`}</h3>
        <div className="h-auto max-h-[700px] w-full overflow-auto rounded px-10 py-6 shadow">
          <p className="flex items-center gap-2">
            <StarIcon className="size-4" />
            <span className="font-medium text-blue-800">Popular Transmission Codes</span>
          </p>
          <div className="mt-6 grid grid-cols-2 gap-x-12 gap-y-5 md:grid-cols-3 md:gap-y-8 lg:grid-cols-4 xl:grid-cols-5">
            {transmissionCodes.map((transmissionCode) => (
              <LinkBlock
                collectionId={transmissionCode.collection_link}
                title={transmissionCode.transmission_code}
                key={transmissionCode.id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransmissionCode;
