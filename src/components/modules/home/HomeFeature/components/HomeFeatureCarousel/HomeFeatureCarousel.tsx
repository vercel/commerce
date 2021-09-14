import React from 'react'
import { TOptionsEvents } from 'keen-slider'

import HomeFeatureItem, {HomeFeatureItemProps} from '../HomeFeatureItem/HomeFeatureItem'
import CarouselCommon, {CarouselCommonProps} from '../../../../../common/CarouselCommon/CarouselCommon'

interface HomeFeatureCarouselProps
  extends Omit<CarouselCommonProps<HomeFeatureItemProps>, 'Component' | "option"> {
  option?: TOptionsEvents
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

const HomeFeatureCarousel = ({option, data, ...props} : HomeFeatureCarouselProps)  => {
    return (
        <div>
            <CarouselCommon<HomeFeatureItemProps>
                data={data}
                Component={HomeFeatureItem}
                {...props}
                option={{ ...OPTION_DEFAULT, ...option }}
             />
        </div>
    )

}

export default HomeFeatureCarousel