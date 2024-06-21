import { getCollection, getMetaobjectsByIds } from 'lib/shopify';
import CollectionLink from './collection-link';

const HelpfulLinks = async ({ collection }: { collection: string }) => {
  const collectionData = await getCollection({ handle: collection });
  if (!collectionData || !collectionData.helpfulLinks) return null;

  const helpfulLinks = await getMetaobjectsByIds(collectionData.helpfulLinks);

  return (
    <div className="py-4">
      <div className="mb-4 text-sm font-medium text-gray-900">Helpful links</div>

      <div className="flex flex-wrap items-center gap-2">
        {helpfulLinks.map((link) => (
          <CollectionLink
            key={link.id}
            collectionLinkId={link.collection_link!}
            anchorText={link.anchor_text!}
          />
        ))}
      </div>
    </div>
  );
};

export default HelpfulLinks;
