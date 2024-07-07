import Tag from 'components/tag';
import { Metaobject } from 'lib/shopify/types';
import { Suspense } from 'react';
import Tabs, { TabsPlaceholder } from './tabs';

const DynamicContent = async ({ content }: { content: Metaobject }) => {
  const sectionIds = content.sections ? JSON.parse(content.sections) : [];

  return (
    <div className="mx-auto mt-6 max-w-screen-2xl px-8 pb-10">
      <Tag text="Learn More" />
      <h3 className="mb-5 text-3xl font-bold leading-loose text-black-700">{content.title}</h3>
      <Suspense fallback={<TabsPlaceholder />}>
        <Tabs tabItemIds={sectionIds} />
      </Suspense>
    </div>
  );
};

export default DynamicContent;
