import { getCollection, getMetaobjectsByIds } from 'lib/shopify';
import { Metaobject } from 'lib/shopify/types';
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

const EngineSizes = async ({ collectionHandle }: { collectionHandle: string }) => {
  const collection = await getCollection({ handle: collectionHandle });
  if (!collection || !collection.plpType || !validStores.includes(STORE_PREFIX!)) {
    return null;
  }

  let engineSizes = [] as Metaobject[];

  if (collection.plpType === 'Product Type' && collection.engineSizeLinks) {
    engineSizes = await getMetaobjectsByIds(collection.engineSizeLinks);
  }

  if (!engineSizes.length) {
    return null;
  }

  return (
    <div className="px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <h3 className="mb-6 text-3xl font-semibold lg:text-4xl">Browse Engines By Engine Sizes</h3>
        <div className="h-auto max-h-[700px] w-full overflow-auto rounded px-10 py-6 shadow">
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
    </div>
  );
};

export default EngineSizes;
