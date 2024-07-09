import Tag from 'components/tag';
import { getMetaobject } from 'lib/shopify';
import { Suspense } from 'react';
import Tabs, { TabsPlaceholder } from './tabs';

const DefaultContent = async () => {
  const defaultPLPContent = await getMetaobject({
    handle: { handle: 'default-plp-content', type: 'plp_content' }
  });

  if (!defaultPLPContent) {
    return null;
  }

  const { id, type, title, ...fields } = defaultPLPContent;

  return (
    <div>
      <Tag text="Learn More" />
      <h3 className="mb-5 mt-3 text-3xl font-semibold text-content-strong lg:text-4xl">{title}</h3>
      <Suspense fallback={<TabsPlaceholder />}>
        <Tabs fields={fields} />
      </Suspense>
    </div>
  );
};

export default DefaultContent;
