'use client';

import { urlForImage } from 'lib/sanity/sanity.image';
import { cn } from 'lib/utils';
import Image from 'next/image';

interface SanityImageProps {
  image: object | any;
  alt: string;
  priority?: boolean;
  width?: number;
  height?: number;
  quality?: number;
  sizes?: string;
  className?: string;
  fill?: boolean;
}

const placeholderImg = '/product-img-placeholder.svg';

export default function SanityImage(props: SanityImageProps) {
  const {
    image: source,
    priority = false,
    quality = 75,
    alt = '',
    height = 1080,
    width = 1080,
    sizes = '100vw',
    className,
    fill = false
  } = props;

  const rootClassName = cn('w-full h-auto', className);

  const image = source?.asset?._rev ? (
    <>
      {fill ? (
        <Image
          className={`${rootClassName}`}
          placeholder="blur"
          fill
          alt={alt}
          src={urlForImage(source).quality(quality).url()}
          sizes={sizes}
          priority={priority}
          blurDataURL={source.asset.metadata.lqip}
        />
      ) : (
        <Image
          className={`${rootClassName}`}
          placeholder="blur"
          width={width}
          height={height}
          alt={alt}
          src={urlForImage(source).width(width).height(height).quality(quality).url()}
          sizes={sizes}
          priority={priority}
          blurDataURL={source.asset.metadata.lqip}
        />
      )}
    </>
  ) : (
    <>
      <Image
        className={`${rootClassName}`}
        width={width}
        height={height}
        alt={alt}
        src={placeholderImg}
        sizes={sizes}
        priority={false}
      />
    </>
  );

  return image;
}
