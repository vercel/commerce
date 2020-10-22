import { ArrowLeft } from '@components/icon'
import { useKeenSlider } from 'keen-slider/react'
import React, { Children, FC, isValidElement, useState } from 'react'
import cn from 'classnames'

import s from './ProductSlider.module.css'

const ProductSlider: FC = ({ children }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [ref, slider] = useKeenSlider<HTMLDivElement>({
    slideChanged(s) {
      setCurrentSlide(s.details().relativeSlide)
    },
    loop: true,
  })

  return (
    <div className={s.root}>
      <button className={cn(s.leftControl, s.control)} onClick={slider?.prev}>
        <ArrowLeft />
      </button>
      <button className={cn(s.rightControl, s.control)} onClick={slider?.next}>
        <ArrowLeft />
      </button>
      <div ref={ref} className="keen-slider h-full">
        {Children.map(children, (child) => {
          // Add the keen-slider__slide className to children
          if (isValidElement(child)) {
            return {
              ...child,
              props: {
                ...child.props,
                className: `${
                  child.props.className ? `${child.props.className} ` : ''
                }keen-slider__slide`,
              },
            }
          }
          return child
        })}
      </div>
      {slider && (
        <div className={cn(s.positionIndicatorsContainer)}>
          {[...Array(slider.details().size).keys()].map((idx) => {
            return (
              <button
                key={idx}
                className={cn(s.positionIndicator, {
                  [s.positionIndicatorActive]: currentSlide === idx,
                })}
                onClick={() => {
                  slider.moveToSlideRelative(idx)
                }}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

export default ProductSlider
