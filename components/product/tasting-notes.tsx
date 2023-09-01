import Prose from 'components/prose';
import { Product } from 'lib/shopify/types';
import Image from 'next/image';

export function ProductTastingNotes({ product }: { product: Product }) {
  const notes = product?.notes?.value;
  const imageUrl = product?.notesImage?.reference?.image?.url;
  const imageWidth = product?.notesImage?.reference?.image?.width;
  const imageHeight = product?.notesImage?.reference?.image?.height;
  const imageAlt = product?.notesImage?.reference?.image?.altText;

  if (!imageUrl && !imageWidth && !imageHeight) {
    return null;
  }

  return (
    <div className="flex flex-col justify-between space-y-6 px-6 md:flex-row md:space-x-6 md:space-y-0">
      {!!notes ? (
        <div>
          <Prose className="mb-6 text-lg leading-tight dark:text-white/[60%]" html={notes} />
        </div>
      ) : null}
      {imageUrl && imageHeight && imageWidth && (
        <div>
          <Image
            src={imageUrl}
            width={imageWidth}
            height={imageHeight}
            alt={imageAlt || imageUrl}
          />
        </div>
      )}
    </div>
  );
}
