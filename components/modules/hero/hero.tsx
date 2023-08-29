import SanityImage from '@/components/ui/sanity-image/sanity-image';
import Link from 'components/ui/link/link';
import Text from 'components/ui/text/text';

interface HeroProps {
  disabled: boolean;
  variant: string;
  text?: string;
  label?: string;
  title: string;
  image?: { asset?: any };
  color?: string;
  overlay?: boolean;
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

const Hero = ({
  disabled,
  variant,
  title,
  text,
  label,
  image,
  link,
  color,
  overlay
}: HeroProps) => {
  if (disabled) {
    return;
  }

  const heroClass = heroSize[variant as HeroSize] || heroSize.fullScreen;

  return (
    <div
      className={`relative w-screen ${heroClass} relative flex flex-col justify-end bg-neutral-300 text-high-contrast`}
    >
      {image && (
        <SanityImage
          image={image}
          priority={true}
          className="absolute inset-0 z-10 h-full w-full object-cover"
          size="100vw"
          fill
        />
      )}
      {overlay && <div className="absolute inset-0 z-10 h-full w-full bg-black/60" />}
      <div
        className={`${
          color === 'dark' ? 'text-high-contrast' : 'text-white'
        } items-star absolute bottom-5 left-4 z-50 flex max-w-md flex-col lg:bottom-8 lg:left-8 lg:max-w-2xl 2xl:bottom-16 2xl:left-16`}
      >
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
          <div className="prose prose-lg mt-4 lg:prose-xl">
            <Text className="" variant="paragraph">
              {text}
            </Text>
          </div>
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
