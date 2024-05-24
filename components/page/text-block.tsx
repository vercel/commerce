import { Metaobject } from 'lib/shopify/types';
import RichTextDisplay from './rich-text-display';

const TextBlock = ({ block }: { block: Metaobject }) => {
  const content = JSON.parse(block.content || '{}');

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-5 px-4 md:px-0">
        {block.title && (
          <h3 className="text-xl font-semibold leading-6 text-gray-900">{block.title}</h3>
        )}

        <RichTextDisplay contentBlocks={content.children} />
      </div>
    </div>
  );
};

export default TextBlock;
