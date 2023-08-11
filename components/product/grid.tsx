import Image from 'next/image';

export function Grid({
  images
}: {
  images: { src: string; alt: string; width: number | undefined; height: number | undefined }[];
}) {
  return (
    <div className="grid w-full grid-cols-2 gap-4">
      {images.map(
        (
          image: {
            src: string;
            alt: string;
            height: number | undefined;
            width: number | undefined;
          },
          index: number
        ) => {
          return (
            <Image
              className="aspect-square h-full w-full bg-neutral-300 object-cover first:col-span-2"
              src={image.src}
              height={image.height}
              width={image.width}
              sizes={`${
                index === 0 ? '(min-width: 1024px) 66vw, 100vw' : '(min-width: 1024px) 50vw, 0'
              }`}
              alt={image.alt}
              key={index}
              priority={index === 0 ? true : false}
            />
          );
        }
      )}
    </div>
  );
}
