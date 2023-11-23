'use client';

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { GridTileImage } from 'components/grid/tile';
import Image from 'next/image';
import { useState } from 'react';

export function Gallery({ images }: { images: { src: string; altText: string }[] }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  function handleNavigate(direction: 'next' | 'previous') {
    if (direction === 'next') {
      setCurrentImageIndex(currentImageIndex + 1 < images.length ? currentImageIndex + 1 : 0);
    } else {
      setCurrentImageIndex(currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1);
    }
  }

  const buttonClassName =
    'h-full px-6 transition-all ease-in-out hover:scale-110 hover:text-black dark:hover:text-white';

  return (
    <div className="lg:mr-8 h-full w-full justify-center">
      <div className="relative mb-2 lg:mb-12 aspect-square overflow-hidden flex lg:w-full lg:h-auto"> 
        {images[currentImageIndex] && (
            <Image
              className="relative w-full h-full object-cover"
              height={500}
              width={500}
              alt={images[currentImageIndex]?.altText as string}
              src={images[currentImageIndex]?.src as string}
              priority={true}
            />
        )}

        {images.length > 1 ? (
          <div className="bottom-2 z-50 flex w-full justify-center absolute">
            <div className="mx-auto flex h-8 items-center rounded-full border border-white bg-neutral-50/50 text-neutral-500 backdrop-blur dark:border-black dark:bg-neutral-900/80">
              <button
                aria-label="Previous product image"
                onClick={() => handleNavigate('previous')}
                className={buttonClassName}
              >
                <ArrowLeftIcon className="h-5" />
              </button>
              <div className="mx-1 h-6 w-px bg-neutral-500"></div>
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
        <div className="flex items-center justify-center gap-2 overflow-auto py-1 pl-20 md:pl-0">
          {images.map((image, index) => {
            const isActive = index === currentImageIndex;
            return (
              <button
                aria-label="Enlarge product image"
                key={image.src}
                className="h-20 w-20"
                onClick={() => setCurrentImageIndex(index)}
              >
                <GridTileImage
                  alt={image.altText}
                  src={image.src}
                  width={50}
                  height={50}
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
