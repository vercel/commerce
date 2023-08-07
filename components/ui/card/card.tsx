'use client';

import SanityImage from 'components/ui/sanity-image';
import { cn } from 'lib/utils';
import Link from 'next/link';
import { FC } from 'react';

interface CardProps {
  className?: string;
  title: string;
  image: object | any;
  link: object | any;
  text?: string;
  imageFormat?: 'square' | 'portrait' | 'landscape';
}

const placeholderImg = '/product-img-placeholder.svg';

const Card: FC<CardProps> = ({ className, title, image, link, text, imageFormat = 'square' }) => {
  const rootClassName = cn('relative', className);

  const { linkType } = link;

  const imageWrapperClasses = cn('w-full h-full overflow-hidden relative', {
    ['aspect-square']: imageFormat === 'square',
    ['aspect-[3/4]']: imageFormat === 'portrait',
    ['aspect-[4/3]']: imageFormat === 'landscape'
  });
  const imageClasses = cn('object-cover w-full h-full');

  function Card() {
    if (linkType === 'internal') {
      const type = link.internalLink.reference._type;

      let href = '';

      if (type === 'product') {
        href = `/product/${link.internalLink.reference.slug.current}`;
      } else if (type === 'category') {
        href = `/category/${link.internalLink.reference.slug.current}`;
      } else {
        return `${link.internalLink.reference.slug.current}`;
      }

      return (
        <Link href={href} className={rootClassName} aria-label={title}>
          <div className="flex flex-col">
            {image && (
              <div className={imageWrapperClasses}>
                <SanityImage
                  className={imageClasses}
                  image={image}
                  alt={image.alt || ''}
                  sizes="(max-width: 1024px) 50vw, 20vw"
                />
              </div>
            )}
            <h3 className="mt-2 text-sm font-medium text-high-contrast underline underline-offset-2 lg:mt-3 lg:text-lg lg:underline-offset-4 2xl:text-xl">
              {title}
            </h3>
            {text && <p className="mt-1 text-sm text-low-contrast lg:mt-2 lg:text-base">{text}</p>}
          </div>
        </Link>
      );
    }

    return (
      <a href={link.externalLink.url} className={rootClassName} aria-label={title}>
        <div className="flex flex-col">
          {image && (
            <div className={imageWrapperClasses}>
              <SanityImage
                className={imageClasses}
                image={image}
                alt={image.alt || ''}
                sizes="(max-width: 1024px) 50vw, 20vw"
              />
            </div>
          )}
          <h3 className="mt-2 text-sm font-medium text-high-contrast underline underline-offset-2 lg:mt-3 lg:text-lg lg:underline-offset-4 2xl:text-xl">
            {title}
          </h3>
          {text && <p className="mt-1 text-sm text-low-contrast lg:mt-2 lg:text-base">{text}</p>}
        </div>
      </a>
    );
  }

  return <Card />;
};

export default Card;
