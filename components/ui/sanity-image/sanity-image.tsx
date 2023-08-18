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
  alt = 'Cover image',
  width = 3500,
  height = 2000,
  size = '100vw',
  fill = false,
  className
}: SanityImageProps) {
  const imageUrl = image && urlForImage(image)?.height(height).width(width).fit('crop').url();

  console.log(imageUrl);

  return (
    <div className={`w-full overflow-hidden rounded-[3px] bg-gray-50 ${className}`}>
      {fill && imageUrl && (
        <Image
          fill={fill}
          className="absolute h-full w-full object-cover"
          alt={alt ? alt : ''}
          sizes={size}
          src={imageUrl}
        />
      )}

      {imageUrl && (
        <Image
          className="absolute h-full w-full object-cover"
          alt={alt ? alt : ''}
          width={width}
          height={height}
          sizes={size}
          src={imageUrl}
        />
      )}
    </div>
  );
}

// export default function SanityImage(props: SanityImageProps) {
//   const {
//     image: source,
//     priority = false,
//     alt = '',
//     height = 1080,
//     width = 1080,
//     sizes = '100vw',
//     className,
//     fill = false
//   } = props;

//   const rootClassName = cn('w-full h-auto', className);

//   const image = source?.asset ? (
//     <>
//       {fill ? (
//         <Image
//           className={`${rootClassName}`}
//           placeholder="blur"
//           fill
//           alt={alt}
//           src={urlForImage(source).url()}
//           sizes={sizes}
//           priority={priority}
//           blurDataURL={source.asset.metadata.lqip}
//         />
//       ) : (
//         <Image
//           className={`${rootClassName}`}
//           placeholder="blur"
//           width={width}
//           height={height}
//           alt={alt}
//           src={urlForImage(source).width(width).height(height).url()}
//           sizes={sizes}
//           priority={priority}
//           blurDataURL={source.asset.metadata.lqip}
//         />
//       )}
//     </>
//   ) : (
//     <>
//       <Image
//         className={`${rootClassName}`}
//         width={width}
//         height={height}
//         alt={alt}
//         src={placeholderImg}
//         sizes={sizes}
//         priority={false}
//       />
//     </>
//   );

//   return image;
// }
