import { useKeenSlider } from 'keen-slider/react'
import React, {
  Children,
  isValidElement,
  useState,
  useRef,
  useEffect,
} from 'react'
import cn from 'clsx'
import { a } from '@react-spring/web'
import s from './ProductSlider.module.css'
import ProductSliderControl from '../ProductSliderControl'
import { useProduct } from '../product-context'

interface ProductSliderProps {
  children: React.ReactNode[]
  className?: string
}

const ProductSlider: React.FC<ProductSliderProps> = ({
  children,
  className = '',
}) => {
  const { imageIndex, resetImageIndex } = useProduct()
  const [currentSlide, setCurrentSlide] = useState(imageIndex ?? 0)
  const [isMounted, setIsMounted] = useState(false)
  const sliderContainerRef = useRef<HTMLDivElement>(null)
  const thumbsContainerRef = useRef<HTMLDivElement>(null)

  const [ref, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: { perView: 1 },
    created: () => setIsMounted(true),
    dragStarted: () => {
      resetImageIndex()
    },
    slideChanged(s) {
      const slideNumber = s.track.details.rel
      setCurrentSlide(slideNumber)
      if (thumbsContainerRef.current) {
        const $el = document.getElementById(`thumb-${slideNumber}`)
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

    const slider = sliderContainerRef.current!

    slider.addEventListener('touchstart', preventNavigation)

    return () => {
      if (slider) {
        slider.removeEventListener('touchstart', preventNavigation)
      }
    }
  }, [])

  useEffect(() => {
    if (imageIndex && imageIndex !== currentSlide) {
      slider.current?.moveToIdx(imageIndex, undefined, {
        duration: 0,
      })
    }
  }, [imageIndex, currentSlide, slider])

  const onPrev = React.useCallback(() => {
    resetImageIndex()
    slider.current?.prev()
  }, [resetImageIndex, slider])

  const onNext = React.useCallback(() => {
    resetImageIndex()
    slider.current?.next()
  }, [resetImageIndex, slider])

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
                    resetImageIndex()
                    slider.current?.moveToIdx(idx)
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
