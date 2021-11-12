import React from 'react';
import { ResponsiveType } from 'react-multi-carousel';
import CarouselCommon, {
  CarouselCommonProps
} from '../CarouselCommon/CarouselCommon';
import ProductCard, { ProductCardProps } from '../ProductCard/ProductCard';
import s from "./ProductCarousel.module.scss";

interface ProductCarouselProps
  extends Omit<CarouselCommonProps<ProductCardProps>, 'Component' | "option"> {
    collection?:string
}
const RESPONSIVE:ResponsiveType = {
  lgScreen: {
    breakpoint: { max:9999, min: 1440 },
    items: 5.5,
    slidesToSlide: 2
  },
  desktop: {
    breakpoint: { max: 1440, min: 1280 },
    items: 4.5,
    slidesToSlide: 2
  },
  lap: {
    breakpoint: { max: 1280, min: 1008 },
    items: 3.5,
    slidesToSlide: 2,
  },
  tablet: {
    breakpoint: { max: 1008, min: 640 },
    items: 3,
    slidesToSlide: 2,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 2,
    slidesToSlide: 2,
  }
};
const ProductCarousel = ({ data, responsive= RESPONSIVE, collection,  ...props }: ProductCarouselProps) => {
  
  return (
    <>
      <div className={s.productCardWarpper}>
        <CarouselCommon<ProductCardProps>
          data={data}
          Component={ProductCard}
          draggable={true} infinite={true}
          responsive={responsive}
          isPadding
          defaultComponentProps={{
            collection,
            }
          }
          {...props}
        />
      </div>
    </>
  )
}

export default ProductCarousel
