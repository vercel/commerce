import { getMetaobject } from 'lib/shopify';
import { Collection } from 'lib/shopify/types';
import DefaultContent from './default-content';
import DynamicContent from './dynamic-content';

const Content = async ({ collection }: { collection: Collection }) => {
  if (!collection.dynamicContent) {
    return <DefaultContent collection={collection} />;
  }

  const content = await getMetaobject({ id: collection.dynamicContent });
  if (!content) {
    return <DefaultContent collection={collection} />;
  }

  return <DynamicContent content={content} />;
};

export default Content;
