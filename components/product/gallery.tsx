'use client';

import { useState } from 'react';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { GridTileImage } from 'components/grid/tile';

export function Gallery({
  title,
  amount,
  currencyCode,
  images
}: {
  title: string;
  amount: string;
  currencyCode: string;
  images: { src: string; altText: string }[];
}) {
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
          <GridTileImage
            src={images[currentImage]?.src as string}
            alt={images[currentImage]?.altText as string}
            width={600}
            height={600}
            isInteractive={false}
            priority={true}
            background="purple"
            labels={{
              title,
              amount,
              currencyCode
            }}
          />
        )}

        {images.length > 1 ? (
          <div className="absolute flex flex-row h-12 text-white border border-white shadow-xl bottom-10 right-10 dark:border-black dark:text-black">
            <button
              aria-label="Previous product image"
              className={clsx(buttonClassName, 'border-r border-white dark:border-black')}
              onClick={() => handleNavigate('previous')}
            >
              <ChevronLeftIcon className="h-6" />
            </button>
            <button
              aria-label="Next product image"
              className={clsx(buttonClassName)}
              onClick={() => handleNavigate('next')}
            >
              <ChevronRightIcon className="h-6" />
            </button>
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
                className="w-1/4 h-full"
                onClick={() => setCurrentImage(index)}
              >
                <GridTileImage
                  alt={image?.altText}
                  src={image.src}
                  width={600}
                  height={600}
                  background="purple-dark"
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
