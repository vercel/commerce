import { cn } from '@/lib/utils';
import { getImageDimensions } from '@sanity/asset-utils';
import { urlForImage } from 'lib/sanity/sanity.image';
import Image from 'next/image';

interface SanityImageProps {
  image: object | any;
  alt?: string;
  priority?: boolean;
  width?: number;
  height?: number;
  size?: string;
  className?: string;
  fill?: boolean;
}

// const placeholderImg = '/product-img-placeholder.svg';

export default function SanityImage({
  image,
  alt = image?.alt ?? 'An image without an alt, whoops',
  size = '100vw',
  fill = false,
  priority = false,
  width,
  height,
  className
}: SanityImageProps) {
  const imageUrl = image && urlForImage(image).url();

  return (
    <div className={cn('relative w-full overflow-hidden bg-subtle', className)}>
      {fill && imageUrl && (
        <Image
          src={imageUrl}
          alt={alt}
          fill={fill}
          className={cn('absolute h-full w-full object-cover', className)}
          sizes={size}
          priority={priority}
          placeholder="blur"
          blurDataURL={urlForImage(image).width(24).height(24).blur(10).url()}
        />
      )}

      {imageUrl && (
        <Image
          src={imageUrl}
          alt={alt}
          className={cn(className)}
          width={width ?? getImageDimensions(image).width}
          height={height ?? getImageDimensions(image).height}
          sizes={size}
          priority={priority}
          placeholder="blur"
          blurDataURL={urlForImage(image).width(24).height(24).blur(10).url()}
        />
      )}
    </div>
  );
}
