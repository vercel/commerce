import Grid from 'components/grid';
import DynamicHeroIcon from 'components/hero-icon';
import { getMetaobjects, getMetaobjectsByIds } from 'lib/shopify';
import { Metaobject } from 'lib/shopify/types';
import { computeLayoutClassnames } from './layout';

export const IconBlockPlaceholder = () => {
  return (
    <div className="flex animate-pulse flex-col gap-5 px-4 md:px-0">
      <div className="h-10 w-1/2 rounded bg-gray-200" />
      <div className="h-40 w-full rounded bg-gray-200" />
      <div className="h-40 w-full rounded bg-gray-200" />
    </div>
  );
};

const IconWithTextBlock = async ({ block }: { block: Metaobject }) => {
  const [contentBlocks, layouts, screenSizes] = await Promise.all([
    getMetaobjectsByIds(block.content ? JSON.parse(block.content) : []),
    getMetaobjectsByIds(block.layouts ? JSON.parse(block.layouts) : []),
    getMetaobjects('screen_sizes')
  ]);

  const validClassnames = computeLayoutClassnames({ layouts, screenSizes });

  return (
    <div className="flex flex-col gap-5 px-4 md:px-0">
      {block.title ? (
        <h3 className="text-xl font-semibold leading-6 text-gray-900">{block.title}</h3>
      ) : null}

      <Grid className={`${validClassnames} gap-x-8`}>
        {contentBlocks.map((block) => (
          <div key={block.id} className="items-center sm:flex">
            {block.icon_name && (
              <div className="sm:flex-shrink-0">
                <div className="flow-root">
                  <DynamicHeroIcon icon={block.icon_name} className="w-16 text-secondary" />
                </div>
              </div>
            )}
            <div className="mt-3 sm:ml-4 sm:mt-0">
              {block.title && (
                <div className="text-sm font-medium text-gray-900">{block.title}</div>
              )}
              {block.content && <p className="mt-2 text-sm text-gray-500">{block.content}</p>}
            </div>
          </div>
        ))}
      </Grid>
    </div>
  );
};

export default IconWithTextBlock;
