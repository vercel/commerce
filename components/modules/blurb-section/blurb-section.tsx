import Card from '@/components/ui/card/card';
import { cn } from '@/lib/utils';
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
        className={cn(
          'w-full gap-4 px-4 lg:px-8 2xl:px-16',
          {
            ['grid grid-cols-1']: mobileLayout !== 'horizontal',
            ['flex snap-x snap-proximity overflow-x-auto lg:grid lg:overflow-visible']:
              mobileLayout === 'horizontal'
          },
          `${gridLayout}`
        )}
      >
        {blurbs.map((blurb: object | any, index: number) => {
          return (
            <div
              key={index}
              className={`${
                mobileLayout === 'horizontal' && 'w-11/12 shrink-0 snap-center lg:w-full'
              }`}
            >
              <Card
                title={blurb?.title}
                link={blurb?.link}
                image={blurb?.image}
                text={blurb?.text}
                imageFormat={imageFormat}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BlurbSection;
