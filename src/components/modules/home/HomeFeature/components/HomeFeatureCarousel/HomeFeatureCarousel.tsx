import React from 'react'
import { TOptionsEvents } from 'keen-slider'

import HomeFeatureItem, {HomeFeatureItemProps} from '../HomeFeatureItem/HomeFeatureItem'
import CarouselCommon, {CarouselCommonProps} from '../../../../../common/CarouselCommon/CarouselCommon'
import { ResponsiveType } from 'react-multi-carousel'

interface HomeFeatureCarouselProps
  extends Omit<CarouselCommonProps<HomeFeatureItemProps>, 'Component' | "option"> {
}

const OPTION_DEFAULT: TOptionsEvents = {
    slidesPerView: 1.2,
    mode: 'free',
    breakpoints: {
      '(min-width: 640px)': {
        slidesPerView: 1.8,
      },
      '(min-width: 768px)': {
        slidesPerView: 2.1,
      },
      '(min-width: 1008px)': {
        slidesPerView: 2.3,
      },
      '(min-width: 1280px)': {
        slidesPerView: 2.8,
      },
      '(min-width: 1440px)': {
        slidesPerView: 3,
      },
    },
  }
  const RESPONSIVE: ResponsiveType = {
    largeDesktop: {
      breakpoint: { max: 9999, min: 1440 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    desktop: {
      breakpoint: { max: 1440, min: 1280 },
      items: 2.8,
      slidesToSlide: 1, // optional, default to 1.
    },
    smallDesktop: {
      breakpoint: { max: 1280, min: 1008 },
      items: 2.3,
      slidesToSlide: 1, // optional, default to 1.
    },
    lap: {
      breakpoint: { max: 1008, min: 768 },
      items: 2.1,
    },
    tablet: {
      breakpoint: { max: 768, min: 640 },
      items: 1.8,
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 1.2,
    },
  }
const HomeFeatureCarousel = ({data, ...props} : HomeFeatureCarouselProps)  => {
    return (
        <div>
            <CarouselCommon<HomeFeatureItemProps>
                data={data}
                Component={HomeFeatureItem}
                {...props}
                responsive={RESPONSIVE}
             />
        </div>
    )

}

export default HomeFeatureCarousel