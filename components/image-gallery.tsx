'use client';
import Image from 'next/image';
import { ImgHTMLAttributes, useState } from 'react';

// eslint-disable-next-line no-unused-vars
type onSelectImageType = (arg0: string) => void;
export const ImageGallery = ({
  images,
  onSelectImage
}: {
  images: ImgHTMLAttributes<HTMLImageElement>[];
  onSelectImage: onSelectImageType;
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState('0');
  const handleClick = (index: string) => {
    setSelectedImageIndex(index);
    onSelectImage(index);
    console.log('click end', index);
  };
  return (
    <ul
      className="scrollbar-none relative -mx-1 flex snap-x snap-mandatory gap-1 overflow-x-auto py-2"
      aria-hidden="true"
    >
      {images.map((image, index) => (
        <li className="shrink-0 snap-center" key={index}>
          <button
            onClick={() => {
              console.log('click start');
              handleClick(index.toString());
            }}
            className={`rounded-lg border-2 border-transparent ${selectedImageIndex === index.toString() ? 'border-neutral-400' : 'bg-neutral-100'} bg-clip-content p-0.5 transition-colors hover:border-neutral-400`}
          >
            <Image
              {...image}
              key={image.id}
              id={`gallery-image-${image.id}`}
              src={image.src!}
              alt={image.alt || ''}
              width={parseInt(image.width as string, 10)}
              height={parseInt(image.height as string, 10)}
              className="size-12 rounded object-cover"
            />
          </button>
        </li>
      ))}
    </ul>
  );
};
