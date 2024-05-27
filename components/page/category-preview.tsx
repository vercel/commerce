import Grid from 'components/grid';
import { getCollection, getMetaobjects, getMetaobjectsByIds } from 'lib/shopify';
import { Metaobject } from 'lib/shopify/types';
import { Suspense } from 'react';
import ImageDisplay from './image-display';
import { computeLayoutClassnames } from './layout';

export const Category = async ({ collectionId }: { collectionId: string }) => {
  const collection = await getCollection({ id: collectionId });
  return (
    <h3 className="mt-4 text-base font-semibold text-gray-900">
      <a href={collection?.path}>
        <span className="absolute inset-0" />
        {collection?.title}
      </a>
    </h3>
  );
};

const CategoryPreview = async ({ block }: { block: Metaobject }) => {
  const [contentBlocks, layouts, screenSizes] = await Promise.all([
    getMetaobjectsByIds(block.categories ? JSON.parse(block.categories) : []),
    getMetaobjectsByIds(block.layout ? JSON.parse(block.layout) : []),
    getMetaobjects('screen_sizes')
  ]);

  const validClassnames = computeLayoutClassnames({ layouts, screenSizes });

  return (
    <>
      <div className="px-4 md:px-0">
        <h2 className="text-2xl font-bold text-gray-900">{block.title}</h2>

        <Grid className={`${validClassnames} mt-6`}>
          {contentBlocks.map((contentBlock) => (
            <div key={contentBlock.id} className="group relative">
              <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                <Suspense>
                  <ImageDisplay
                    title={block.title || 'Image Preview'}
                    fileId={contentBlock.preview_image as string}
                    className="h-full w-full object-cover object-center"
                  />
                </Suspense>
              </div>
              <Suspense>
                <Category collectionId={contentBlock.collection as string} />
              </Suspense>
            </div>
          ))}
        </Grid>
      </div>
    </>
  );
};

export const CategoryPreviewPlaceholder = () => {
  return (
    <div className="mx-auto max-w-2xl lg:max-w-none">
      <Grid className="grid animate-pulse grid-cols-3 gap-y-16">
        <div className="h-64 w-full rounded-lg bg-gray-200" />
        <div className="h-64 w-full rounded-lg bg-gray-200" />
        <div className="h-64 w-full rounded-lg bg-gray-200" />
      </Grid>
    </div>
  );
};
export default CategoryPreview;
