import React, { useEffect, useRef } from 'react'
import 'keen-slider/keen-slider.min.css'
import { CustomCarouselArrow } from './CustomArrow/CustomCarouselArrow'
import s from './CarouselCommon.module.scss'
import classNames from 'classnames'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import {
  ResponsiveType,
  CarouselProps,
  ButtonGroupProps,
} from 'react-multi-carousel/lib/types'
export interface CarouselCommonProps<T>
  extends Omit<CarouselProps, 'children' | 'responsive'> {
  data: T[]
  Component: React.ComponentType<T>
  itemKey: String
  keenClassname?: string
  isPadding?: boolean
  defaultComponentProps?: object
  responsive?: ResponsiveType
}
const RESPONSIVE = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
}

const CarouselCommon = <T,>({
  data = [],
  Component,
  itemKey,
  defaultComponentProps,
  responsive = RESPONSIVE,
  showDots,
  isPadding,
  arrows,
  ...props
}: CarouselCommonProps<T>) => {
  const carousel = useRef<Carousel>(null)
  const handleRightArrowClick = () => {
    carousel.current?.next(carousel.current.props.slidesToSlide||1)
  }
  const handleLeftArrowClick = () => {
    carousel.current?.previous(carousel.current.props.slidesToSlide||1)
  }
  return (
    <div className={s.navigationWrapper}>
      <Carousel
        {...props}
        ref={carousel}
        showDots={showDots}
        customButtonGroup={<CarouselButtonGroup />}
        renderButtonGroupOutside
        sliderClass={''}
        containerClass={classNames({
          [s.showDots]: showDots,
          [s.isPadding]: isPadding,
        })}
        responsive={responsive}
        arrows={false}
        renderDotsOutside={true}
        // customLeftArrow={<CustomCarouselArrow side="left" />}
        // customRightArrow={<CustomCarouselArrow side="right" />}
      >
        {data?.map((props, index) => {
          const allProps = defaultComponentProps
            ? { ...props, ...defaultComponentProps }
            : props
          return <Component {...allProps} key={`${itemKey}-${index}`} />
        })}
      </Carousel>
      {carousel && arrows && (
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
      {/* {slider && isDot && (
        <div className="dots">
          {dotArr.map((index) => {
            return (
              <CustomDot key={`dot-${index}`} index={index} dotActive={currentSlide} onClick={onDotClick}/>
            )
          })}
        </div>
      )}  */}
    </div>
  )
}
const CarouselButtonGroup = ({ next, previous }: ButtonGroupProps) => {
  return (
    <>
      <CustomCarouselArrow side="left" onClick={previous} />
      <CustomCarouselArrow side="right" onClick={next} />
    </>
  )
}
export default CarouselCommon
