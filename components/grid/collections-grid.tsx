import { ViewTransitionLink } from 'components/view-transition-link';
import { getCollections } from 'lib/shopify';
import Image from 'next/image';

type CollectionConfig = {
  handle: string;
  label?: string;
};

async function CollectionCard({ 
  collection 
}: { 
  collection: CollectionConfig 
}) {
  const collections = await getCollections();
  // Log collections with non-null images
  // collections
  //   .filter((c) => c.image?.url)
  //   .forEach((c) => {
  //     console.log(`Collection: ${c.title} (handle: ${c.handle})`);
  //   });

  const collectionData = collections.find((c) => c.handle === collection.handle);

  if (!collectionData) return null;

  const displayTitle = collection.label || collectionData.title;

  return (
    <ViewTransitionLink
      href={`/collections/${collectionData.handle}`}
      className="group relative flex aspect-square flex-col items-center justify-center overflow-hidden rounded-lg border border-neutral-200 bg-white p-4 transition-all hover:border-blue-600 hover:shadow-lg dark:border-neutral-800 dark:bg-black"
      prefetch={true}
    >
      <div className="relative h-full w-full overflow-hidden">
        {collectionData.image?.url ? (
          <Image
            src={collectionData.image.url}
            alt={displayTitle}
            fill
            className="object-contain transition-transform duration-300 ease-in-out group-hover:scale-105"
            sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, 50vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-neutral-100 dark:bg-neutral-900">
            <span className="text-4xl text-neutral-400">🏆</span>
          </div>
        )}
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
        <h3 className="text-center text-sm font-semibold text-white md:text-base">
          {displayTitle}
        </h3>
      </div>
    </ViewTransitionLink>
  );
}

export async function CollectionsGrid({
  collections,
  title
}: {
  collections: CollectionConfig[];
  title?: string;
}) {
  return (
    <section className="mx-auto w-full max-w-(--breakpoint-2xl) px-4 py-8">
      {title && (
        <h2 className="mb-8 text-center text-3xl font-bold tracking-tight md:text-4xl">
          {title}
        </h2>
      )}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {collections.map((collection) => (
          <CollectionCard key={collection.handle} collection={collection} />
        ))}
      </div>
    </section>
  );
}

