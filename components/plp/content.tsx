import { getCollection, getMetaobject } from 'lib/shopify';
import DefaultContent from './default-content';
import DynamicContent from './dynamic-content';

const Content = async ({ collection }: { collection: string }) => {
  const collectionData = await getCollection({ handle: collection });

  if (!collectionData) {
    return null;
  }

  if (!collectionData.dynamicContent) {
    return <DefaultContent />;
  }

  const content = await getMetaobject({ id: collectionData.dynamicContent });
  if (!content) {
    return <DefaultContent />;
  }

  return <DynamicContent content={content} />;
};

export default Content;
