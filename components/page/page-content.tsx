import { Metaobject, PageType } from 'lib/shopify/types';
import { Suspense } from 'react';
import AccordionBlock from './accordion-block';
import CategoryPreview, { CategoryPreviewPlaceholder } from './category-preview';
import IconWithTextBlock, { IconBlockPlaceholder } from './icon-with-text-block';
import ImageWithTextBlock from './image-with-text-block';
import TextBlock from './text-block';

const PageContent = ({ block }: { block: Metaobject }) => {
  // eslint-disable-next-line no-unused-vars
  const contentMap: Record<PageType, (block: Metaobject) => JSX.Element> = {
    icon_content_section: (block) => (
      <Suspense fallback={<IconBlockPlaceholder />}>
        <IconWithTextBlock block={block} />
      </Suspense>
    ),
    image: (block) => <ImageWithTextBlock block={block} />,
    page_section: (block) => <TextBlock block={block} />,
    accordion: (block) => <AccordionBlock block={block} />,
    category_preview: (block) => (
      <Suspense fallback={<CategoryPreviewPlaceholder />}>
        <CategoryPreview block={block} />
      </Suspense>
    )
  };

  return contentMap[block.type as PageType](block);
};

export default PageContent;
