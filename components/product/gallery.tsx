'use client';

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
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
    'px-9 cursor-pointer ease-in-and-out duration-200 transition-bg bg-[#7928ca] hover:bg-violetDark';

  return (
    <div className="h-full">
      <div className="relative h-full max-h-[600px] overflow-hidden">
        {images[currentImage] && (
          <Image
            className="relative h-full w-full object-contain"
            height={600}
            width={600}
            alt={images[currentImage]?.altText as string}
            src={images[currentImage]?.src as string}
          />
        )}

        {images.length > 1 ? (
          <div className="absolute bottom-[15%] flex w-full justify-center">
            <div className="mx-auto flex h-11 items-center rounded-full border border-white bg-light/80 px-6 text-gray-500 backdrop-blur">
              <button
                aria-label="Previous product image"
                onClick={() => handleNavigate('previous')}
              >
                <ArrowLeftIcon className="h-5" />
              </button>
              <div className="mx-6 h-6 w-px bg-gray-400"></div>
              <button aria-label="Next product image" onClick={() => handleNavigate('next')}>
                <ArrowRightIcon className="h-5" />
              </button>
              {/* <button
              aria-label="Previous product image"
              className={clsx(buttonClassName, 'border-r border-white dark:border-black')}
              onClick={() => handleNavigate('previous')}
            >
              <ArrowLeftIcon className="h-6" />
            </button>
            <button
              aria-label="Next product image"
              className={clsx(buttonClassName)}
              onClick={() => handleNavigate('next')}
            >
              <ArrowRightIcon className="h-6" />
            </button> */}
            </div>
          </div>
        ) : null}
      </div>

      {images.length > 1 ? (
        <div className="flex">
          {images.map((image, index) => {
            const isActive = index === currentImage;
            return (
              <button
                aria-label="Enlarge product image"
                key={image.src}
                className="h-full w-1/4"
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
