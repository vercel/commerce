import ImageDisplay from 'components/page/image-display';
import RichTextDisplay from 'components/page/rich-text-display';
import { getMetaobject, getMetaobjectsByIds } from 'lib/shopify';
import kebabCase from 'lodash.kebabcase';
import { Suspense } from 'react';
import Tag from '../tag';

const { SITE_NAME } = process.env;
const WhyChoose = async () => {
  const whyChooseContent = await getMetaobject({
    handle: { type: 'why_choose', handle: `${kebabCase(SITE_NAME)}-why-choose` }
  });

  if (!whyChooseContent || !whyChooseContent.items) return null;

  const reasons = await getMetaobjectsByIds(JSON.parse(whyChooseContent.items) as string[]);

  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-y-5 px-6 py-16 lg:grid-cols-5 lg:gap-y-0">
      <div className="col-span-1 flex flex-col gap-3">
        <Tag text="Benefits" />
        <h3 className="text-3xl font-semibold lg:text-4xl">Why choose {SITE_NAME}?</h3>
      </div>
      <div className="col-span-1 grid grid-cols-subgrid gap-x-6 gap-y-12 lg:col-span-4">
        {reasons.map((reason) => (
          <div className="col-span-1 flex lg:col-span-2" key={reason.id}>
            <Suspense>
              <ImageDisplay
                fileId={reason.file as string}
                title={(reason.title || reason.name) as string}
                className="h-[60px] w-[60px]"
              />
            </Suspense>
            <div className="mx-3 h-[100px] min-w-0.5 bg-gray-200" />
            <div className="ml-2 flex flex-col gap-3">
              <h4 className="text-xl font-medium text-blue-800">{reason.title}</h4>
              <RichTextDisplay contentBlocks={JSON.parse(reason.description || '{}').children} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChoose;
