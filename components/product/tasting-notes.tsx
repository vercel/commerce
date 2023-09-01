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
        <div className="flex w-1/2 flex-col space-y-4">
          <h2 className="font-multilingual text-[38px] leading-tight">tasting notes</h2>
          <div className="flex w-full flex-row justify-end whitespace-pre-line">{notes}</div>
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
