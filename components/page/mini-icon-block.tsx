import DynamicHeroIcon from 'components/hero-icon';
import { getMetaobjectsByIds } from 'lib/shopify';
import { Metaobject } from 'lib/shopify/types';

const MiniIconBlock = async ({ block }: { block: Metaobject }) => {
  const contentIds = block.content ? JSON.parse(block.content) : [];
  const contentBlocks = await getMetaobjectsByIds(contentIds);

  if (!contentBlocks || contentBlocks.length === 0) {
    return null;
  }

  return (
    <div className="flex w-full flex-col gap-y-3">
      {block.title ? (
        <h3 className="text-xl font-semibold leading-6 text-gray-900">{block.title}</h3>
      ) : null}
      {contentBlocks.map((content) => (
        <div key={content.id} className="flex items-center gap-x-3">
          {content.icon_name && (
            <DynamicHeroIcon icon={content.icon_name} className="w-5 text-secondary" />
          )}
          {content.title && content.content && (
            <div>
              {content.title && (
                <div className="text-sm font-medium text-content-strong">{content.title}</div>
              )}
              {content.content && (
                <p className="mt-2 text-sm text-content-strong">{content.content}</p>
              )}
            </div>
          )}
          {content.title && <div className="text-sm text-content-strong">{content.title}</div>}
        </div>
      ))}
    </div>
  );
};

export default MiniIconBlock;
