import { useKeenSlider } from 'keen-slider/react'
import React, { Children, FC, isValidElement, useState, useRef, useEffect } from 'react'
import cn from 'classnames'

import s from './ProductSlider.module.css'

const ProductSlider: FC = ({ children }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMounted, setIsMounted] = useState(false)
  const sliderContainerRef = useRef<HTMLDivElement>(null)

  const [ref, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slidesPerView: 1,
    mounted: () => setIsMounted(true),
    slideChanged(s) {
      setCurrentSlide(s.details().relativeSlide)
    },
  })

  // Stop the history navigation gesture on touch devices
  useEffect(() => {
    const preventNavigation = (event: TouchEvent) => {
      const touchXPosition = event.touches[0].pageX
      if (touchXPosition > 10 && touchXPosition < window.innerWidth - 10) return
      event.preventDefault()
    }

    sliderContainerRef.current!
      .addEventListener('touchstart', preventNavigation)

    return () => {
      sliderContainerRef.current!
      .removeEventListener('touchstart', preventNavigation)
    }
  }, [])

  return (
    <div className={s.root} ref={sliderContainerRef}>
      <button
        className={cn(s.leftControl, s.control)}
        onClick={slider?.prev}
        aria-label="Previous Product Image"
      />
      <button
        className={cn(s.rightControl, s.control)}
        onClick={slider?.next}
        aria-label="Next Product Image"
      />
      <div
        ref={ref}
        className="keen-slider h-full transition-opacity duration-150"
        style={{ opacity: isMounted ? 1 : 0 }}
      >
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
                aria-label="Position indicator"
                key={idx}
                className={cn(s.positionIndicator, {
                  [s.positionIndicatorActive]: currentSlide === idx,
                })}
                onClick={() => {
                  slider.moveToSlideRelative(idx)
                }}
              >
                <div className={s.dot} />
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default ProductSlider
