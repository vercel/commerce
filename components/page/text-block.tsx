import { PageContent } from 'lib/shopify/types';
import RichTextDisplay from './rich-text-display';

const TextBlock = ({ content }: { content: PageContent }) => {
  if (!content.metaobjects.length) return null;

  return (
    <div className="flex flex-col gap-8">
      {content.metaobjects.map((metaobject) => {
        const contentBlocks = JSON.parse(metaobject.content || '{}');

        return (
          <div className="flex flex-col gap-5 px-4 md:px-0" key={metaobject.id}>
            <h3 className="text-xl font-semibold leading-6 text-gray-900">{metaobject.title}</h3>
            <RichTextDisplay contentBlocks={contentBlocks.children} />
          </div>
        );
      })}
    </div>
  );
};

export default TextBlock;
