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
    <div className="flex flex-col justify-between space-y-6 px-6 md:flex-row md:items-end md:space-x-12 md:space-y-0">
      {!!notes ? (
        <div className="font-multilingual flex flex-col space-y-4 md:min-w-[120px] md:max-w-sm">
          <h2 className="text-[38px] leading-tight">tasting notes</h2>
          <div className="flex w-full flex-row justify-end whitespace-pre-line">{notes}</div>
        </div>
      ) : null}
      {imageUrl && imageHeight && imageWidth && (
        <div className="md:w-2/3">
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
