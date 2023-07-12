'use client';

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { GridTileImage } from 'components/grid/tile';
import Image from 'next/image';
import { useState } from 'react';

export function Gallery({ images }: { images: { src: string; altText: string }[] }) {
  const [currentImage, setCurrentImage] = useState(0);

  function handleNavigate(direction: 'next' | 'previous') {
    if (direction === 'next') {
      setCurrentImage(currentImage + 1 < images.length ? currentImage + 1 : 0);
    } else {
      setCurrentImage(currentImage === 0 ? images.length - 1 : currentImage - 1);
    }
  }

  const buttonClassName =
    'h-full px-6 transition-all ease-in-out hover:scale-110 hover:text-black dark:hover:text-white';

  return (
    <div className="h-full">
      <div className="relative mb-12 h-full max-h-[550px] overflow-hidden">
        {images[currentImage] && (
          <Image
            className="relative object-contain w-full h-full"
            height={600}
            width={600}
            alt={images[currentImage]?.altText as string}
            src={images[currentImage]?.src as string}
          />
        )}

        {images.length > 1 ? (
          <div className="absolute bottom-[15%] flex w-full justify-center">
            <div className="flex items-center mx-auto text-gray-500 border border-white rounded-full h-11 bg-light/80 backdrop-blur dark:border-black dark:bg-dark/80">
              <button
                aria-label="Previous product image"
                onClick={() => handleNavigate('previous')}
                className={buttonClassName}
              >
                <ArrowLeftIcon className="h-5" />
              </button>
              <div className="w-px h-6 mx-1 bg-gray-500"></div>
              <button
                aria-label="Next product image"
                onClick={() => handleNavigate('next')}
                className={buttonClassName}
              >
                <ArrowRightIcon className="h-5" />
              </button>
            </div>
          </div>
        ) : null}
      </div>

      {images.length > 1 ? (
        <div className="flex space-x-2">
          {images.map((image, index) => {
            const isActive = index === currentImage;
            return (
              <button
                aria-label="Enlarge product image"
                key={image.src}
                className={clsx('h-auto w-1/6')}
                onClick={() => setCurrentImage(index)}
              >
                <GridTileImage
                  alt={image?.altText}
                  src={image.src}
                  width={600}
                  height={600}
                  active={isActive}
                />
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
