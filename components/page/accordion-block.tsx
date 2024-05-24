import { getMetaobjectById, getMetaobjectsByIds } from 'lib/shopify';
import { Metaobject } from 'lib/shopify/types';
import AccordionBlockItem from './accordion-block-item';
import PageContent from './page-content';

const AccordionItem = async ({ id }: { id: string }) => {
  const accordionObject = await getMetaobjectById(id);

  if (!accordionObject) return null;

  const content = await getMetaobjectsByIds(JSON.parse(accordionObject.accordion_content || '[]'));

  return (
    <AccordionBlockItem title={accordionObject.title || 'Section Title'}>
      {content.map((block) => (
        <PageContent block={block} key={block.id} />
      ))}
    </AccordionBlockItem>
  );
};

const AccordionBlock = async ({ block }: { block: Metaobject }) => {
  const accordionItemIds = JSON.parse(block.accordion || '[]') as string[];

  return (
    <div className="divide-y divide-gray-900/10">
      {block.title && (
        <h3 className="mb-7 text-xl font-semibold leading-6 text-gray-900">{block.title}</h3>
      )}
      <dl className="w-full space-y-6 divide-y divide-gray-900/10">
        {accordionItemIds.map((id) => (
          <AccordionItem key={id} id={id} />
        ))}
      </dl>
    </div>
  );
};

export default AccordionBlock;
