import { StarIcon } from '@heroicons/react/24/outline';
import { getCollection, getMetaobjectsByIds } from 'lib/shopify';
import { Collection, Metaobject } from 'lib/shopify/types';
import Link from 'next/link';

const { STORE_PREFIX } = process.env;

const validStores = ['car-part-planet', 'reman-engine', 'engine-locator'];

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

const EngineSizes = async ({ collection }: { collection: Collection }) => {
  if (!collection.plpType || !validStores.includes(STORE_PREFIX!)) {
    return null;
  }

  let engineSizes = [] as Metaobject[];

  if (['Product Type', 'Make'].includes(collection.plpType) && collection.engineSizeLinks) {
    engineSizes = await getMetaobjectsByIds(collection.engineSizeLinks);
  }

  if (!engineSizes.length) {
    return null;
  }

  return (
    <div>
      <h3 className="mb-3 text-3xl font-semibold text-content-strong lg:text-4xl">
        Browse Engines By Engine Sizes
      </h3>
      <div className="h-auto max-h-[700px] w-full overflow-auto rounded px-10 py-6 shadow">
        <p className="flex items-center gap-2">
          <StarIcon className="size-4" />
          <span className="font-medium text-blue-800">Popular Engine Sizes</span>
        </p>
        <div className="mt-6 grid grid-cols-2 gap-x-12 gap-y-5 md:grid-cols-3 md:gap-y-8 lg:grid-cols-4 xl:grid-cols-5">
          {engineSizes.map((engineSize) => (
            <LinkBlock
              collectionId={engineSize.collection_link}
              title={engineSize.engine_size}
              key={engineSize.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EngineSizes;
