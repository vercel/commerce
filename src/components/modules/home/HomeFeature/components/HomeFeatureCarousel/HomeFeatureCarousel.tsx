import React from 'react'
import HomeFeatureItem, {HomeFeatureItemProps} from '../HomeFeatureItem/HomeFeatureItem'
import CarouselCommon, {CarouselCommonProps} from '../../../../../common/CarouselCommon/CarouselCommon'
import { ResponsiveType } from 'react-multi-carousel'

interface HomeFeatureCarouselProps
  extends Omit<CarouselCommonProps<HomeFeatureItemProps>, 'Component' | "option"> {
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
                arrows={false}
             />
        </div>
    )

}

export default HomeFeatureCarousel