import Tag from 'components/tag';
import { getMetaobject } from 'lib/shopify';
import { Suspense } from 'react';
import Tabs, { TabsPlaceholder } from './tabs';

const DefaultContent = async () => {
  const defaultPLPContent = await getMetaobject({
    handle: { handle: 'default-plp-content', type: 'plp_content' }
  });

  if (!defaultPLPContent) return null;

  const sectionIds = defaultPLPContent.sections ? JSON.parse(defaultPLPContent.sections) : [];

  return (
    <div className="mx-auto mt-6 max-w-screen-2xl px-8 pb-10">
      <Tag text="Learn More" />
      <h3 className="mb-5 text-3xl font-bold leading-loose text-black-700">
        {defaultPLPContent.title}
      </h3>
      <Suspense fallback={<TabsPlaceholder />}>
        <Tabs tabItemIds={sectionIds} />
      </Suspense>
    </div>
  );
};

export default DefaultContent;
