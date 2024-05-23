import Grid from 'components/grid';
import DynamicHeroIcon from 'components/hero-icon';
import { getMetaobjects, getMetaobjectsByIds } from 'lib/shopify';
import { PageContent, ScreenSize } from 'lib/shopify/types';

export const IconBlockPlaceholder = () => {
  return (
    <div className="flex animate-pulse flex-col gap-5 px-4 md:px-0">
      <div className="h-10 w-1/2 rounded bg-gray-200" />
      <div className="h-40 w-full rounded bg-gray-200" />
      <div className="h-40 w-full rounded bg-gray-200" />
    </div>
  );
};

const IconWithTextBlock = async ({ content }: { content: PageContent }) => {
  // for icon with text content, we only need the first metaobject as the array always contains only one element due to the metafield definition set up on Shopify
  const metaobject = content.metaobjects[0];

  if (!metaobject) return null;

  const [contentBlocks, layouts, screenSizes] = await Promise.all([
    getMetaobjectsByIds(metaobject.content ? JSON.parse(metaobject.content) : []),
    getMetaobjectsByIds(metaobject.layouts ? JSON.parse(metaobject.layouts) : []),
    getMetaobjects('screen_sizes')
  ]);

  const availableLayouts = layouts.reduce(
    (acc, layout) => {
      const screenSize = screenSizes.find((screen) => screen.id === layout.screen_size);
      if (screenSize?.size) {
        acc[screenSize.size.toLowerCase() as ScreenSize] = Number(layout.number_of_columns);
      }

      return acc;
    },
    {} as Record<ScreenSize, number>
  );

  let classnames = {} as { [key: string]: boolean };

  if (availableLayouts.small) {
    classnames = {
      ...classnames,
      'sm:grid-cols-1': availableLayouts.small === 1,
      'sm:grid-cols-2': availableLayouts.small === 2,
      'sm:grid-cols-3': availableLayouts.small === 3,
      'sm:grid-cols-4': availableLayouts.small === 4
    };
  }

  if (availableLayouts.medium) {
    classnames = {
      ...classnames,
      'md:grid-cols-1': availableLayouts.medium === 1,
      'md:grid-cols-2': availableLayouts.medium === 2,
      'md:grid-cols-3': availableLayouts.medium === 3,
      'md:grid-cols-4': availableLayouts.medium === 4
    };
  }

  if (availableLayouts.large) {
    classnames = {
      ...classnames,
      'lg:grid-cols-1': availableLayouts.large === 1,
      'lg:grid-cols-2': availableLayouts.large === 2,
      'lg:grid-cols-3': availableLayouts.large === 3,
      'lg:grid-cols-4': availableLayouts.large === 4
    };
  }

  const validClassnames = Object.keys(classnames)
    .filter((key) => classnames[key])
    .join(' ');

  return (
    <div className="flex flex-col gap-5 px-4 md:px-0">
      <h3 className="text-xl font-semibold leading-6 text-gray-900">{metaobject.title}</h3>
      <Grid className={validClassnames}>
        {contentBlocks.map((block) => (
          <Grid.Item key={block.id} className="flex flex-col gap-2">
            {block.icon_name && (
              <DynamicHeroIcon icon={block.icon_name} className="w-16 text-secondary" />
            )}
            <div className="text-lg font-medium">{block.title}</div>
            <p className="text-base text-gray-800">{block.content}</p>
          </Grid.Item>
        ))}
      </Grid>
    </div>
  );
};

export default IconWithTextBlock;
