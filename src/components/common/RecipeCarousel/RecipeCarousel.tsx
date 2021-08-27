import { TOptionsEvents } from 'keen-slider'
import React from 'react'
import CarouselCommon, {
  CarouselCommonProps,
} from '../CarouselCommon/CarouselCommon'
import RecipeCard, { RecipeCardProps } from '../RecipeCard/RecipeCard'
import s from "./RecipeCarousel.module.scss"

interface RecipeCarouselProps
  extends Omit<CarouselCommonProps<RecipeCardProps>, 'Component'|"option"> {
		option?:TOptionsEvents
	}

const OPTION_DEFAULT: TOptionsEvents = {
  slidesPerView: 1.25,
  mode: 'free',
  spacing:24,
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
const RecipeCarousel = ({ option, data, ...props }: RecipeCarouselProps) => {
  return (
    <div className={s.recipeCardWarpper}>
      <CarouselCommon<RecipeCardProps>
        data={data}
        Component={RecipeCard}
        {...props}
        option={{ ...OPTION_DEFAULT, ...option }}
      />
    </div>
  )
}

export default RecipeCarousel
