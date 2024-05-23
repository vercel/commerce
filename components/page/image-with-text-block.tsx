import { PageContent } from 'lib/shopify/types';
import { Suspense } from 'react';
import ImageDisplay from './image-display';
import RichTextDisplay from './rich-text-display';

const ImageWithTextBlock = ({ content }: { content: PageContent }) => {
  if (!content.metaobjects.length) return null;

  return (
    <div className="flex flex-col gap-10">
      {content.metaobjects.map((metaobject) => {
        const contentBlocks = JSON.parse(metaobject.description || '{}');

        return (
          <div className="flex flex-col gap-6 px-4 md:px-0" key={metaobject.id}>
            <h3 className="text-xl font-semibold leading-6 text-gray-900">{metaobject.title}</h3>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              <div className="relative col-span-1">
                <Suspense>
                  <ImageDisplay
                    title={metaobject.title as string}
                    fileId={metaobject.file as string}
                  />
                </Suspense>
              </div>
              <div className="col-span-2">
                <RichTextDisplay contentBlocks={contentBlocks.children} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ImageWithTextBlock;
