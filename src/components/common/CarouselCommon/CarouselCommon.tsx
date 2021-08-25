import { useKeenSlider } from 'keen-slider/react'
import React from 'react'
import 'keen-slider/keen-slider.min.css'
import { CustomCarouselArrow } from './CustomArrow/CustomCarouselArrow'
import s from './CaroucelCommon.module.scss'
import { TOptionsEvents } from 'keen-slider'
import classNames from 'classnames'
export interface CarouselCommonProps<T> {
  data: T[]
  Component: React.ComponentType<T>
  isArrow?: Boolean
  itemKey: String
  option: TOptionsEvents
  keenClassname?: string
  isPadding?: boolean
}

const CarouselCommon = <T,>({
  data,
  Component,
  itemKey,
  keenClassname,isPadding=false,
  option: { slideChanged, ...sliderOption },
}: CarouselCommonProps<T>) => {
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    ...sliderOption,
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
    <div className={s.navigationWrapper}>
      <div ref={sliderRef} className={classNames('keen-slider', keenClassname,{[s.isPadding]:isPadding})}>
        {data?.map((props, index) => (
          <div className="keen-slider__slide" key={`${itemKey}-${index}`}>
            <Component {...props} />
          </div>
        ))}
      </div>
      {slider && (
        <>
          <CustomCarouselArrow
            side="right"
            onClick={handleRightArrowClick}
            // isDisabled={currentSlide === slider.details().size - 1}
          />
          <CustomCarouselArrow
            side="left"
            onClick={handleLeftArrowClick}
            // isDisabled={currentSlide === 0}
          />
        </>
      )}
    </div>
  )
}

export default CarouselCommon
