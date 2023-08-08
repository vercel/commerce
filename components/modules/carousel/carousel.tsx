import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import 'glider-js/glider.min.css';
import React from 'react';
import Glider from 'react-glider';

export interface CarouselItemProps {
  children: React.ReactNode;
  className?: string;
}

export const CarouselItem: React.FC<CarouselItemProps> = ({
  children,
  className = 'ml-2 first:ml-0 lg:ml-4'
}: CarouselItemProps) => {
  return <div className={className}>{children}</div>;
};

export interface CarouselProps {
  children: JSX.Element | JSX.Element[] | any;
  gliderClasses?: string;
  hasArrows?: boolean;
  hasDots?: boolean;
  slidesToShow?: number;
  slidesToScroll?: number;
  responsive?: any;
}

export const Carousel: React.FC<CarouselProps> = ({
  children,
  gliderClasses,
  hasArrows = true,
  hasDots = true,
  slidesToShow = 1,
  slidesToScroll = 1,
  responsive
}) => {
  return (
    <>
      <Glider
        className={`relative block ${gliderClasses}`}
        draggable
        slidesToShow={slidesToShow}
        scrollLock
        slidesToScroll={slidesToScroll}
        hasArrows={hasArrows}
        hasDots={hasDots}
        iconLeft={<ArrowLeftIcon className="h-6 w-6" />}
        iconRight={<ArrowRightIcon className="h-6 w-6" />}
        responsive={[responsive]}
      >
        {React.Children.map(children, (child) => {
          return React.cloneElement(child);
        })}
      </Glider>
    </>
  );
};
