import { getImage } from 'lib/shopify';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

const ImageDisplay = async ({
  fileId,
  title,
  className,
  ...props
}: {
  fileId: string;
  title: string;
  className?: string;
} & Omit<React.ComponentProps<typeof Image>, 'src' | 'alt'>) => {
  const image = await getImage(fileId);
  return (
    <Image
      src={image.url}
      alt={image.altText || `Display Image for ${title} section`}
      width={image.width}
      height={image.height}
      className={twMerge('h-full w-full object-contain', className)}
      {...props}
    />
  );
};

export default ImageDisplay;
