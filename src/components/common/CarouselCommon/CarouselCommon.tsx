import { useKeenSlider } from 'keen-slider/react'
import React, { useEffect } from 'react'
import 'keen-slider/keen-slider.min.css'
import { CustomCarouselArrow } from './CustomArrow/CustomCarouselArrow'
import s from './CaroucelCommon.module.scss'
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
}

const CarouselCommon = <T,>({
  data,
  Component,
  itemKey,
  keenClassname,
  isPadding = false,
  isArrow = true,
  isDot = false,
  option: { slideChanged,slidesPerView, ...sliderOption },
}: CarouselCommonProps<T>) => {
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const [dotActive, setDotActive] = React.useState<number>(0)
  const [dotArr, setDotArr] = React.useState<number[]>([])
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    ...sliderOption,
    slidesPerView,
    slideChanged(s) {
      setCurrentSlide(s.details().relativeSlide)
      let dot = 0 
      dotArr.forEach((index)=>{
        if(s.details().relativeSlide >= Math.floor(index)){
          dot = index
        }
      })
      setDotActive(dot)
    },
  })
  
  useEffect(() => {
    if(isDot && slider){
      // console.log('f',Math.ceil(data.length/(Number(slider.details().slidesPerView)||1)))
      let array:number[]
      array =  [...Array(Math.ceil(data.length/(Number(slider.details().slidesPerView)||1))).keys()].map((i)=>{
        return (Number(slider.details().slidesPerView)||1)*i
      })
      
      setDotArr(array)
    }
  }, [isDot,slider])

  const handleRightArrowClick = () => {
    slider.next()
  }

  const handleLeftArrowClick = () => {
    slider.prev()
  }

  const onDotClick = (index:number) => {
    slider.moveToSlideRelative(Math.floor(index))
    // setDotActive(index)
  }
  return (
    <div className={s.navigationWrapper}>
      <div
        ref={sliderRef}
        className={classNames('keen-slider', keenClassname, {
          [s.isPadding]: isPadding,
        })}
      >
        {data?.map((props, index) => (
          <div className="keen-slider__slide" key={`${itemKey}-${index}`}>
            <Component {...props} />
          </div>
        ))}
      </div>
      {slider && isArrow && (
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
      {slider && isDot && (
        <div className="dots">
          {dotArr.map((index) => {
            return (
              <CustomDot key={`dot-${index}`} index={index} dotActive={dotActive} onClick={onDotClick}/>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default CarouselCommon
