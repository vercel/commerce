import SanityImage from '@/components/ui/sanity-image/sanity-image';
import Link from 'components/ui/link/link';
import Text from 'components/ui/text/text';

interface HeroProps {
  variant: string;
  text?: string;
  label?: string;
  title: string;
  image: object | any;
  link: {
    title: string;
    reference: {
      title: string;
      slug: {
        current: string;
      };
    };
  };
}

type HeroSize = keyof typeof heroSize;

const heroSize = {
  fullScreen: 'aspect-[3/4] lg:aspect-auto lg:h-[calc(100vh-4rem)]',
  halfScreen: 'aspect-square max-h-[50vh] lg:aspect-auto lg:min-h-[50vh]'
};

const Hero = ({ variant, title, text, label, image, link }: HeroProps) => {
  const heroClass = heroSize[variant as HeroSize] || heroSize.fullScreen;

  return (
    <div
      className={`relative w-screen ${heroClass} relative flex flex-col justify-end bg-neutral-300 text-high-contrast`}
    >
      {image && (
        <SanityImage
          image={image}
          alt={image.alt}
          priority={true}
          width={1200}
          height={600}
          className="absolute inset-0 z-10 h-full w-full object-cover"
        />
      )}
      <div className="absolute bottom-5 left-4 z-50 flex max-w-md flex-col items-start text-high-contrast lg:bottom-8 lg:left-8 lg:max-w-2xl 2xl:bottom-16 2xl:left-16">
        {label && (
          <Text className="mb-1 lg:mb-2" variant="label">
            {label}
          </Text>
        )}
        {title ? (
          <Text variant="heading">{title}</Text>
        ) : (
          <Text variant="heading" className="italic">
            No title provided yet
          </Text>
        )}
        {text && (
          <Text className="mt-4" variant="paragraph">
            {label}
          </Text>
        )}
        {link?.reference && (
          <Link
            className="mt-6 inline-flex bg-high-contrast px-10 py-4 text-base text-white transition hover:bg-low-contrast lg:mt-8"
            href={link.reference.slug.current}
          >
            {link?.title ? link.title : link.reference.title}
          </Link>
        )}
      </div>
    </div>
  );
};

export default Hero;
