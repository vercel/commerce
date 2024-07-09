import Tag from 'components/tag';
import { Metaobject } from 'lib/shopify/types';
import { Suspense } from 'react';
import Tabs, { TabsPlaceholder } from './tabs';

const DynamicContent = ({ content }: { content: Metaobject }) => {
  const { id, type, title, ...fields } = content;

  return (
    <div>
      <Tag text="Learn More" />
      <h3 className="mb-5 mt-3 text-3xl font-semibold text-content-strong lg:text-4xl">
        {content.title}
      </h3>
      <Suspense fallback={<TabsPlaceholder />}>
        <Tabs fields={fields} />
      </Suspense>
    </div>
  );
};

export default DynamicContent;
