import Tag from 'components/tag';
import { Metaobject } from 'lib/shopify/types';
import { Suspense } from 'react';
import Tabs, { TabsPlaceholder } from './tabs';

const DynamicContent = async ({ content }: { content: Metaobject }) => {
  const sectionIds = content.sections ? JSON.parse(content.sections) : [];

  return (
    <div className="space-y-3">
      <Tag text="Learn More" />
      <h3 className="mb-3 text-3xl font-semibold text-black-700 lg:text-4xl">{content.title}</h3>
      <Suspense fallback={<TabsPlaceholder />}>
        <Tabs tabItemIds={sectionIds} />
      </Suspense>
    </div>
  );
};

export default DynamicContent;
