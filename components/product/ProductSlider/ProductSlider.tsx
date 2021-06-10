import { useKeenSlider } from 'keen-slider/react'
import React, {
  Children,
  FC,
  isValidElement,
  useState,
  useRef,
  useEffect,
} from 'react'
import cn from 'classnames'
import { a } from '@react-spring/web'
import s from './ProductSlider.module.css'
import ProductSliderControl from '../ProductSliderControl'

interface ProductSliderProps {
  children: React.ReactNode[]
  className?: string
}

const ProductSlider: React.FC<ProductSliderProps> = ({
  children,
  className = '',
}) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMounted, setIsMounted] = useState(false)
  const sliderContainerRef = useRef<HTMLDivElement>(null)
  const thumbsContainerRef = useRef<HTMLDivElement>(null)

  const [ref, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slidesPerView: 1,
    mounted: () => setIsMounted(true),
    slideChanged(s) {
      const slideNumber = s.details().relativeSlide
      setCurrentSlide(slideNumber)

      if (thumbsContainerRef.current) {
        const $el = document.getElementById(
          `thumb-${s.details().relativeSlide}`
        )
        if (slideNumber >= 3) {
          thumbsContainerRef.current.scrollLeft = $el!.offsetLeft
        } else {
          thumbsContainerRef.current.scrollLeft = 0
        }
      }
    },
  })

  // Stop the history navigation gesture on touch devices
  useEffect(() => {
    const preventNavigation = (event: TouchEvent) => {
      // Center point of the touch area
      const touchXPosition = event.touches[0].pageX
      // Size of the touch area
      const touchXRadius = event.touches[0].radiusX || 0

      // We set a threshold (10px) on both sizes of the screen,
      // if the touch area overlaps with the screen edges
      // it's likely to trigger the navigation. We prevent the
      // touchstart event in that case.
      if (
        touchXPosition - touchXRadius < 10 ||
        touchXPosition + touchXRadius > window.innerWidth - 10
      )
        event.preventDefault()
    }

    sliderContainerRef.current!.addEventListener(
      'touchstart',
      preventNavigation
    )

    return () => {
      if (sliderContainerRef.current) {
        sliderContainerRef.current!.removeEventListener(
          'touchstart',
          preventNavigation
        )
      }
    }
  }, [])

  const onPrev = React.useCallback(() => slider.prev(), [slider])
  const onNext = React.useCallback(() => slider.next(), [slider])

  return (
    <div className={cn(s.root, className)} ref={sliderContainerRef}>
      <div
        ref={ref}
        className={cn(s.slider, { [s.show]: isMounted }, 'keen-slider')}
      >
        {slider && <ProductSliderControl onPrev={onPrev} onNext={onNext} />}
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

      <a.div className={s.album} ref={thumbsContainerRef}>
        {slider &&
          Children.map(children, (child, idx) => {
            if (isValidElement(child)) {
              return {
                ...child,
                props: {
                  ...child.props,
                  className: cn(child.props.className, s.thumb, {
                    [s.selected]: currentSlide === idx,
                  }),
                  id: `thumb-${idx}`,
                  onClick: () => {
                    slider.moveToSlideRelative(idx)
                  },
                },
              }
            }
            return child
          })}
      </a.div>
    </div>
  )
}

export default ProductSlider
