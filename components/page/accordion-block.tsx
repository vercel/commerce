import { getMetaobject, getMetaobjectsByIds } from 'lib/shopify';
import { Metaobject } from 'lib/shopify/types';
import AccordionBlockItem from './accordion-block-item';
import PageContent from './page-content';

const AccordionItem = async ({ id, defaultOpen }: { id: string; defaultOpen?: boolean }) => {
  const accordionObject = await getMetaobject({ id });

  if (!accordionObject) return null;

  const content = await getMetaobjectsByIds(JSON.parse(accordionObject.accordion_content || '[]'));

  return (
    <AccordionBlockItem title={accordionObject.title || 'Section Title'} defaultOpen={defaultOpen}>
      {content.map((block) => (
        <PageContent block={block} key={block.id} />
      ))}
    </AccordionBlockItem>
  );
};

const AccordionBlock = ({
  block,
  defaultOpenIndex = 0
}: {
  block: Metaobject;
  defaultOpenIndex?: number;
}) => {
  const accordionItemIds = JSON.parse(block.accordion || '[]') as string[];

  return (
    <div className="w-full divide-y divide-gray-900/10 px-4 md:px-0">
      {block.title && (
        <h3 className="mb-7 text-xl font-semibold leading-6 text-gray-900">{block.title}</h3>
      )}
      <dl className="w-full space-y-6 divide-y divide-gray-900/10">
        {accordionItemIds.map((id, index) => (
          <AccordionItem key={id} id={id} defaultOpen={defaultOpenIndex === index} />
        ))}
      </dl>
    </div>
  );
};

export default AccordionBlock;
