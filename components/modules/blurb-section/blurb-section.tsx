import dynamic from 'next/dynamic';

import { Carousel, CarouselItem } from 'components/modules/carousel/carousel';
const Card = dynamic(() => import('components/ui/card'));

import Text from 'components/ui/text';

interface BlurbSectionProps {
  blurbs: any;
  title: string;
  mobileLayout: string;
  desktopLayout: string;
  imageFormat: 'square' | 'portrait' | 'landscape';
}

const BlurbSection = ({
  title,
  mobileLayout,
  desktopLayout,
  blurbs,
  imageFormat
}: BlurbSectionProps) => {
  const gridLayout =
    desktopLayout === '2-column'
      ? 'lg:grid-cols-2'
      : desktopLayout === '3-column'
      ? 'lg:grid-cols-3'
      : 'lg:grid-cols-4';

  const sliderLayout = desktopLayout === '2-column' ? 2 : desktopLayout === '3-column' ? 3 : 4;

  return (
    <div>
      {title ? (
        <Text className="mb-4 px-4 lg:mb-6 lg:px-8 2xl:mb-8 2xl:px-16" variant="sectionHeading">
          {title}
        </Text>
      ) : (
        <Text
          className="mb-4 px-4 italic lg:mb-6 lg:px-8 2xl:mb-8 2xl:px-16"
          variant="sectionHeading"
        >
          No title provided yet
        </Text>
      )}
      <div
        className={`grid px-4 ${gridLayout} gap-x-4 gap-y-8 ${
          mobileLayout === 'stacked' ? 'lg:hidden' : 'hidden'
        } lg:px-8 2xl:!px-16`}
      >
        {blurbs.map((blurb: object | any, index: number) => {
          return (
            <div key={index}>
              <Card
                title={blurb?.title}
                link={blurb?.link}
                image={blurb?.image}
                text={blurb?.text}
                imageFormat={blurb?.imageFormat}
              />
            </div>
          );
        })}
      </div>

      <div className={`${mobileLayout === 'stacked' ? 'hidden lg:block' : 'block'}`}>
        {blurbs && (
          <Carousel
            gliderClasses={'px-4 lg:px-8 2xl:px-16'}
            hasDots={true}
            slidesToShow={2.2}
            responsive={{
              breakpoint: 1024,
              settings: {
                slidesToShow: sliderLayout <= 4 ? sliderLayout + 0.5 : sliderLayout
              }
            }}
          >
            {blurbs.map((blurb: any, index: number) => (
              <CarouselItem key={`${index}`}>
                <Card
                  title={blurb?.title}
                  link={blurb?.link}
                  image={blurb?.image}
                  text={blurb.text}
                  imageFormat={imageFormat}
                />
              </CarouselItem>
            ))}
          </Carousel>
        )}
      </div>
    </div>
  );
};

export default BlurbSection;
