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
import { useProduct } from '../context'

interface ProductSliderProps {
  children: React.ReactNode[]
  className?: string
}

const ProductSlider: React.FC<ProductSliderProps> = ({
  children,
  className = '',
}) => {
  const { imageIndex, setImageIndex } = useProduct()
  const [currentSlide, setCurrentSlide] = useState(imageIndex ?? 0)
  const [isMounted, setIsMounted] = useState(false)
  const sliderContainerRef = useRef<HTMLDivElement>(null)
  const thumbsContainerRef = useRef<HTMLDivElement>(null)

  const [ref, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: { perView: 1 },
    dragStarted: () => {
      setImageIndex(null)
    },
    created: () => setIsMounted(true),
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
    if (imageIndex !== null) {
      slider.current?.moveToIdx(imageIndex, false, {
        duration: 0,
      })
    }
  }, [imageIndex, slider])

  const onPrev = React.useCallback(() => {
    setImageIndex(null)
    slider.current?.prev()
  }, [setImageIndex, slider])

  const onNext = React.useCallback(() => {
    setImageIndex(null)
    slider.current?.next()
  }, [setImageIndex, slider])

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
                    setImageIndex(null)
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
