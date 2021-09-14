import { useKeenSlider } from 'keen-slider/react'
import React, { useEffect } from 'react'
import 'keen-slider/keen-slider.min.css'
import { CustomCarouselArrow } from './CustomArrow/CustomCarouselArrow'
import s from './CarouselCommon.module.scss'
import { TOptionsEvents } from 'keen-slider'
import classNames from 'classnames'
import CustomDot from './CustomDot/CustomDot'
export interface CarouselCommonProps<T> {
  data: T[]
  Component: React.ComponentType<T>
  isArrow?: Boolean
  isDot?: Boolean
  itemKey: String
  option: TOptionsEvents
  keenClassname?: string
  isPadding?: boolean
  defaultComponentProps?: object
}

const CarouselCommon = <T,>({
  data,
  Component,
  itemKey,
  keenClassname,
  isPadding = false,
  isArrow = true,
  isDot = false,
  defaultComponentProps,
  option: { slideChanged,slidesPerView, ...sliderOption },
}: CarouselCommonProps<T>) => {
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const [dotArr, setDotArr] = React.useState<number[]>([])
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    ...sliderOption,
    slidesPerView,
    slideChanged(s) {
      setCurrentSlide(s.details().relativeSlide)
    },
  })
  
  useEffect(() => {
    if(isDot && slider && data){
      let array:number[]
      let number = data.length - Math.floor(slider.details().slidesPerView - 1)
      if(number<1){
        number = 1
      }
      array =  [...Array(number).keys()]
      setDotArr(array)
    }
  }, [isDot,slider,data])

  const handleRightArrowClick = () => {
    slider.next()
  }

  const handleLeftArrowClick = () => {
    slider.prev()
  }

  const onDotClick = (index:number) => {
    slider.moveToSlideRelative(index)
  }
  return (
    <div className={s.navigationWrapper}>
      <div
        ref={sliderRef}
        className={classNames('keen-slider', keenClassname, {
          [s.isPadding]: isPadding,
        })}
      >
        {data?.map((props, index) => {
          const allProps = defaultComponentProps ? { ...props, ...defaultComponentProps } : props
          return (
            <div className="keen-slider__slide" key={`${itemKey}-${index}`}>
              <Component {...allProps} />
            </div>
          )
        })}
      </div>
      {slider && isArrow && (
        <>
          <CustomCarouselArrow
            side="right"
            onClick={handleRightArrowClick}
          />
          <CustomCarouselArrow
            side="left"
            onClick={handleLeftArrowClick}
          />
        </>
      )}
      {slider && isDot && (
        <div className="dots">
          {dotArr.map((index) => {
            return (
              <CustomDot key={`dot-${index}`} index={index} dotActive={currentSlide} onClick={onDotClick}/>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default CarouselCommon
