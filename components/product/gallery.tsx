'use client';

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { GridTileImage } from 'components/grid/tile';
import { createUrl } from 'lib/utils';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useOptimistic } from 'react';

export function Gallery({ images }: { images: { src: string; altText: string }[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const imageSearchParam = searchParams.get('image');
  const imageIndex = imageSearchParam ? parseInt(imageSearchParam) : 0;
  const [optimisticIndex, setOptimisticIndex] = useOptimistic(imageIndex);

  const buttonClassName =
    'h-full px-6 transition-all ease-in-out hover:scale-110 hover:text-black dark:hover:text-white flex items-center justify-center';

  function updateIndex(newIndex: number) {
    setOptimisticIndex(newIndex);
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('image', newIndex.toString());
    router.replace(createUrl(pathname, newSearchParams), { scroll: false });
  }

  return (
    <>
      <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden">
        {images[optimisticIndex] && (
          <Image
            className="h-full w-full object-contain"
            fill
            sizes="(min-width: 1024px) 66vw, 100vw"
            alt={images[optimisticIndex]?.altText as string}
            src={images[optimisticIndex]?.src as string}
            priority={true}
          />
        )}

        {images.length > 1 ? (
          <div className="absolute bottom-[15%] flex w-full justify-center">
            <div className="mx-auto flex h-11 items-center rounded-full border border-white bg-neutral-50/80 text-neutral-500 backdrop-blur dark:border-black dark:bg-neutral-900/80">
              <button
                aria-label="Previous product image"
                formAction={() => {
                  updateIndex(optimisticIndex - 1);
                }}
                className={buttonClassName}
              >
                <ArrowLeftIcon className="h-5" />
              </button>
              <div className="mx-1 h-6 w-px bg-neutral-500"></div>
              <button
                aria-label="Next product image"
                formAction={() => {
                  updateIndex(optimisticIndex + 1);
                }}
                className={buttonClassName}
              >
                <ArrowRightIcon className="h-5" />
              </button>
            </div>
          </div>
        ) : null}
      </div>

      {images.length > 1 ? (
        <ul className="my-12 flex items-center justify-center gap-2 overflow-auto py-1 lg:mb-0">
          {images.map((image, index) => {
            const isActive = index === optimisticIndex;

            return (
              <li key={image.src} className="h-20 w-20">
                <button
                  aria-label="Select product image"
                  className="h-full w-full"
                  formAction={() => {
                    updateIndex(index);
                  }}
                >
                  <GridTileImage
                    alt={image.altText}
                    src={image.src}
                    width={80}
                    height={80}
                    active={isActive}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </>
  );
}
