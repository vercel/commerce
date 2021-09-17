import { TOptionsEvents } from 'keen-slider'
import React from 'react'
import { ResponsiveType } from 'react-multi-carousel'
import CarouselCommon, {
  CarouselCommonProps,
} from '../CarouselCommon/CarouselCommon'
import RecipeCard, { RecipeCardProps } from '../RecipeCard/RecipeCard'
import s from './RecipeCarousel.module.scss'

interface RecipeCarouselProps
  extends Omit<CarouselCommonProps<RecipeCardProps>, 'Component' | 'option'> {}

const OPTION_DEFAULT: TOptionsEvents = {
  slidesPerView: 1.25,
  mode: 'free',
  spacing: 24,
  breakpoints: {
    '(min-width: 640px)': {
      slidesPerView: 2,
    },
    '(min-width: 1024px)': {
      slidesPerView: 2.5,
    },
    '(min-width: 1440px)': {
      slidesPerView: 3,
    },
    '(min-width: 1536px)': {
      slidesPerView: 3.5,
    },
  },
}
const RESPONSIVE: ResponsiveType = {
  largeDesktop: {
    breakpoint: { max: 9999, min: 1536 },
    items: 3.5,
    slidesToSlide: 1, // optional, default to 1.
  },
  desktop: {
    breakpoint: { max: 1536, min: 1440 },
    items: 3,
    slidesToSlide: 1, // optional, default to 1.
  },
  lap: {
    breakpoint: { max: 1440, min: 1024 },
    items: 2.5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 640 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1.25,
  },
}
const RecipeCarousel = ({ data, ...props }: RecipeCarouselProps) => {
  return (
    <div className={s.recipeCardWarpper}>
      <CarouselCommon<RecipeCardProps>
        data={data}
        Component={RecipeCard}
        {...props}
        // option={{ ...OPTION_DEFAULT, ...option }}
        responsive={RESPONSIVE}
      />
    </div>
  )
}

export default RecipeCarousel
