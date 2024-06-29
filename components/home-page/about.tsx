import DisplayTabs from 'components/display-tabs';
import RichTextDisplay from 'components/page/rich-text-display';
import { getMetaobject, getMetaobjectsByIds } from 'lib/shopify';
import Image from 'next/image';
import Tag from '../tag';
import ButtonLink from './button-link';

const About = async () => {
  const aboutUs = await getMetaobject({
    handle: { type: 'about_us', handle: 'about-us' }
  });

  if (!aboutUs) return null;
  const features = aboutUs.features
    ? await getMetaobjectsByIds(JSON.parse(aboutUs.features) as string[])
    : [];

  const introduction = aboutUs.introduction ? JSON.parse(aboutUs.introduction) : null;

  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-x-0 gap-y-10 px-6 py-16 lg:grid-cols-2 lg:gap-x-10">
      <div className="relative">
        <Image
          src="/about.png"
          alt="About Us"
          sizes="(min-width: 1920px) 588px, (min-width: 770px) 50vw, 100vw"
          width={588}
          height={468}
          className="col-span-1 h-full w-full rounded-sm object-contain"
        />
        <div className="absolute bottom-0 right-0 flex h-auto w-[150px] flex-col items-center gap-2 rounded-sm bg-gray-100 py-5">
          <span className="text-3xl font-medium text-primary">20+</span>
          <span className="text-center text-dark">Years Of Experiance</span>
        </div>
      </div>

      <div className="flex h-full flex-col justify-between pb-2">
        <div className="mb-3 flex flex-col gap-3">
          <Tag text="About Us" />
          <h3 className="text-3xl font-semibold lg:text-4xl">{aboutUs.title}</h3>
          {introduction ? <RichTextDisplay contentBlocks={introduction.children} /> : null}

          <DisplayTabs items={features} />
        </div>
        <ButtonLink link={{ text: 'Learn More', url: '/about' }} />
      </div>
    </div>
  );
};

export default About;
