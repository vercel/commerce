import { getCollection, getMetaobjectsByIds } from 'lib/shopify';
import Link from 'next/link';

const LinkItem = async ({
  collectionLinkId,
  anchorText
}: {
  collectionLinkId: string;
  anchorText: string;
}) => {
  const collection = await getCollection({ id: collectionLinkId });

  if (!collection) return null;

  return (
    <Link href={collection.path} className="border p-2 text-sm text-gray-600">
      {anchorText}
    </Link>
  );
};
const HelpfulLinks = async ({ collection }: { collection: string }) => {
  const collectionData = await getCollection({ handle: collection });
  if (!collectionData || !collectionData.helpfulLinks) return null;

  const helpfulLinks = await getMetaobjectsByIds(collectionData.helpfulLinks);

  return (
    <div className="py-4">
      <div className="mb-4 text-sm font-medium text-gray-900">Helpful links</div>

      <div className="flex flex-wrap items-center gap-2">
        {helpfulLinks.map((link) => (
          <LinkItem
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
