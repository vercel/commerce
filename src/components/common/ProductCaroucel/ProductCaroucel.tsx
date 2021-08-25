import { TOptionsEvents } from 'keen-slider'
import React from 'react'
import CarouselCommon, {
  CarouselCommonProps,
} from '../CarouselCommon/CarouselCommon'
import ProductCard, { ProductCardProps } from '../ProductCard/ProductCard'
import s from "./ProductCaroucel.module.scss"

interface ProductCaroucelProps
  extends Omit<CarouselCommonProps<ProductCardProps>, 'Component'|"option"> {
		option?:TOptionsEvents
	}

const OPTION_DEFAULT: TOptionsEvents = {
  slidesPerView: 2,
  mode: 'free',
  breakpoints: {
    '(min-width: 768px)': {
      slidesPerView: 3,
    },
    '(min-width: 1024px)': {
      slidesPerView: 5.5,
    },
  },
}
const ProductCaroucel = ({ option, data, ...props }: ProductCaroucelProps) => {
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

export default ProductCaroucel
