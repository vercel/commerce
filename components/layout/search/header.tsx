import { getCollection, getMetaobjectsByIds } from 'lib/shopify';
import { Suspense } from 'react';
import CollectionLink from './collection-link';

const HelpfulLinks = async ({ ids }: { ids: string[] | null }) => {
  if (!ids?.length) return null;

  const links = await getMetaobjectsByIds(ids);

  return (
    <div className="flex w-full flex-wrap items-center gap-3 py-2">
      {links.map((link) => (
        <CollectionLink
          key={link.id}
          collectionLinkId={link.collection_link!}
          anchorText={link.anchor_text!}
          className="rounded border border-gray-600 px-3 py-1 text-sm"
        />
      ))}
    </div>
  );
};

const HelpfulLinksPlaceholder = () => {
  return (
    <div className="flex w-full animate-pulse items-center gap-3 py-2">
      <div className="h-[30px] w-[150px] rounded bg-gray-200" />
      <div className="h-[30px] w-[150px] rounded bg-gray-200" />
      <div className="h-[30px] w-[150px] rounded bg-gray-200" />
    </div>
  );
};

const Header = async ({ collection }: { collection: string }) => {
  const collectionData = await getCollection({ handle: collection });

  return collectionData ? (
    <>
      <div className="mb-3 mt-3 max-w-5xl lg:mb-1">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">{collectionData.title}</h1>
        <p className="mt-2 text-base text-gray-500">{collectionData.description}</p>
      </div>
      <Suspense fallback={<HelpfulLinksPlaceholder />}>
        <HelpfulLinks ids={collectionData.helpfulLinksTop} />
      </Suspense>
    </>
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
