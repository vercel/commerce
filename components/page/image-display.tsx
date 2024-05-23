import { getImage } from 'lib/shopify';
import Image from 'next/image';

const ImageDisplay = async ({ fileId, title }: { fileId: string; title: string }) => {
  const image = await getImage(fileId);
  return (
    <Image
      src={image.url}
      alt={image.altText || `Display Image for ${title} section`}
      width={image.width}
      height={image.height}
      className="h-full w-full object-contain"
    />
  );
};

export default ImageDisplay;
