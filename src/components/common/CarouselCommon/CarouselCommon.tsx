import { useKeenSlider } from 'keen-slider/react'
import React from 'react'
import 'keen-slider/keen-slider.min.css'
import { CustomCarouselArrow } from './CustomArrow/CustomCarouselArrow';
import s from "./CaroucelCommon.module.scss"
interface CarouselCommonProps {
  children?: React.ReactNode
  data?: any[]
  Component: React.ComponentType
  isArrow?:Boolean
  key:String
}

const CarouselCommon = ({ data, Component,key }: CarouselCommonProps) => {
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    slidesPerView: 1,
    initial: 0,
    slideChanged(s) {
      setCurrentSlide(s.details().relativeSlide)
    },
  })
  const handleRightArrowClick = () => {
    slider.next()
  }

  const handleLeftArrowClick = () => {
    slider.prev()
  }
  return (
    <div className={s.navigation_wrapper}>
      <div ref={sliderRef} className="keen-slider">
        {data?.map((props,index) => (
          <div className="keen-slider__slide" key={`${key}-${index}`}>
            <Component {...props} />
          </div>
        ))}
      </div>
      {slider && (
          <>
            <CustomCarouselArrow
              side="right"
              onClick={handleRightArrowClick}
              isDisabled={currentSlide === slider.details().size - 1}
            />
            <CustomCarouselArrow
              side="left"
              onClick={handleLeftArrowClick}
              isDisabled={currentSlide === 0}
            />
          </>
        )}
    </div>
  )
}

export default CarouselCommon
