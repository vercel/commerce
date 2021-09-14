import { TOptionsEvents } from 'keen-slider'
import React from 'react'
import CarouselCommon, {
  CarouselCommonProps,
} from '../CarouselCommon/CarouselCommon'
import ProductCard, { ProductCardProps } from '../ProductCard/ProductCard'
import s from "./ProductCarousel.module.scss"

interface ProductCarouselProps
  extends Omit<CarouselCommonProps<ProductCardProps>, 'Component' | "option"> {
  option?: TOptionsEvents
}

const OPTION_DEFAULT: TOptionsEvents = {
  slidesPerView: 2,
  mode: 'free',
  breakpoints: {
    '(min-width: 640px)': {
      slidesPerView: 3,
    },
    '(min-width: 768px)': {
      slidesPerView: 3,
    },
    '(min-width: 1008px)': {
      slidesPerView: 3.5,
    },
    '(min-width: 1280px)': {
      slidesPerView: 4.5,
    },
    '(min-width: 1440px)': {
      slidesPerView: 5.5,
    },
  },
}
const ProductCarousel = ({ option, data, ...props }: ProductCarouselProps) => {
  return (
    <div className={s.productCardWarpper}>
      <CarouselCommon<ProductCardProps>
        data={data}
        Component={ProductCard}
        {...props}
        option={{ ...OPTION_DEFAULT, ...option }}
      />
    </div>
  )
}

export default ProductCarousel
