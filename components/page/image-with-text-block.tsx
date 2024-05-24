import { Metaobject } from 'lib/shopify/types';
import { Suspense } from 'react';
import ImageDisplay from './image-display';
import RichTextDisplay from './rich-text-display';

const ImageWithTextBlock = ({ block }: { block: Metaobject }) => {
  const description = block.description ? JSON.parse(block.description) : null;

  return (
    <div className="flex flex-col gap-6 px-4 md:px-0">
      {block.title && (
        <h3 className="text-xl font-semibold leading-6 text-gray-900">{block.title}</h3>
      )}
      {description ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <div className="relative col-span-1">
            <Suspense>
              <ImageDisplay title={block.title || 'Image Preview'} fileId={block.file as string} />
            </Suspense>
          </div>
          <div className="col-span-2">
            <RichTextDisplay contentBlocks={description.children} />
          </div>
        </div>
      ) : (
        <div className="relative w-full">
          <Suspense>
            <ImageDisplay title={block.title || 'Image Preview'} fileId={block.file as string} />
          </Suspense>
        </div>
      )}
    </div>
  );
};

export default ImageWithTextBlock;
