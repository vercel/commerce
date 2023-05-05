import dynamic from 'next/dynamic'

const SanityImage = dynamic(() => import('components/ui/sanity-image'))
const Link = dynamic(() => import('components/ui/link'))
const Text = dynamic(() => import('components/ui/text'))

interface HeroProps {
  variant: string
  text?: string
  label?: string
  title: string
  image: object | any
  desktopImage: object | any
  link: {
    title: string
    reference: {
      title: string
      slug: {
        current: string
      }
    }
  }
}

type HeroSize = keyof typeof heroSize

const heroSize = {
  fullScreen: 'aspect-[3/4] lg:aspect-auto lg:h-[calc(100vh-4rem)]',
  halfScreen: 'aspect-square max-h-[60vh] lg:aspect-auto lg:min-h-[60vh]',
}

const Hero = ({ variant, title, text, label, image, link }: HeroProps) => {
  const heroClass = heroSize[variant as HeroSize] || heroSize.fullScreen

  return (
    <div
      className={`relative w-screen ${heroClass} flex flex-col justify-end relative text-high-contrast`}
    >
      {image && (
        <SanityImage
          image={image}
          alt={image.alt}
          priority={true}
          width={1200}
          height={600}
          className="absolute inset-0 h-full w-full object-cover z-10"
        />
      )}
      <div className="flex flex-col items-start text-high-contrast absolute max-w-md z-50 left-4 bottom-5 lg:max-w-2xl lg:bottom-8 lg:left-8 2xl:left-16 2xl:bottom-16">
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
            className="inline-flex transition bg-high-contrast text-white text-base py-4 px-10 mt-6 hover:bg-low-contrast lg:mt-8"
            href={link.reference.slug.current}
          >
            {link?.title ? link.title : link.reference.title}
          </Link>
        )}
      </div>
    </div>
  )
}

export default Hero
