import { getMetaobject } from 'lib/shopify';
import DefaultContent from './default-content';
import DynamicContent from './dynamic-content';

const Content = async ({ collection }: { collection: string }) => {
  const [lastSegment] = collection.split('_').slice(-1);

  if (!lastSegment) {
    return <DefaultContent />;
  }

  let content = null;

  if (collection.startsWith('transmissions')) {
    content = await getMetaobject({
      handle: { handle: `transmission_code_${lastSegment}`, type: 'plp_content' }
    });
  } else if (collection.startsWith('engines')) {
    content = await getMetaobject({
      handle: { handle: `engine_size_${lastSegment}`, type: 'plp_content' }
    });
  }

  if (!content) {
    return <DefaultContent />;
  }

  return <DynamicContent content={content} />;
};

export default Content;
