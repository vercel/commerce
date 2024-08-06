import Image from 'next/image';
import { ImgHTMLAttributes, useEffect, useRef } from 'react';
import { isMobile } from 'react-device-detect';
export const ImageSlider = ({
  images,
  scrollIntoView,
  selectedImageIndex
}: {
  scrollIntoView: () => void;
  images: ImgHTMLAttributes<HTMLImageElement>[];
  selectedImageIndex: string;
}) => {
  const previousIndex = useRef(-1);
  useEffect(() => {
    // skip the first render
    if (previousIndex.current >= 0 && selectedImageIndex !== previousIndex.current.toString()) {
      const element = document.getElementById(`slider-image-${selectedImageIndex}`);
      if (element) {
        if (isMobile) {
          element.scrollIntoView(true);
        } else {
          element.scrollIntoView({ behavior: 'smooth', inline: 'center' });
        }
      }
    }
    previousIndex.current = parseInt(selectedImageIndex, 10);
  }, [selectedImageIndex]);

  return (
    <ul className="scrollbar-none grid snap-x snap-mandatory auto-cols-[100%] grid-flow-col overflow-x-auto">
      {images.map((image, index) => (
        <li className="snap-center" key={image.id}>
          <Image
            className="aspect-square h-auto w-full object-contain"
            {...image}
            key={image.id}
            id={`slider-image-${index}`}
            src={image.src!}
            alt={image.alt || ''}
            width={parseInt(image.width as string, 10)}
            height={parseInt(image.height as string, 10)}
            onClick={scrollIntoView}
            // add touch events
            onTouchStart={scrollIntoView}
          />
        </li>
      ))}
    </ul>
  );
};
