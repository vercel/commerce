import { getCollection } from 'lib/shopify';
import { cn } from 'lib/utils';
import Link from 'next/link';

const CollectionLink = async ({
  collectionLinkId,
  anchorText,
  className
}: {
  collectionLinkId?: string;
  anchorText: string;
  className?: string;
}) => {
  if (!collectionLinkId) return null;

  const collection = await getCollection({ id: collectionLinkId });

  if (!collection) return null;

  return (
    <Link href={collection.path} className={cn('border p-2 text-sm text-gray-600', className)}>
      {anchorText}
    </Link>
  );
};

export default CollectionLink;
