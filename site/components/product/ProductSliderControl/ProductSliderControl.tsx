import { FC, MouseEventHandler, memo } from 'react'
import cn from 'clsx'
import s from './ProductSliderControl.module.css'
import { ArrowLeft, ArrowRight } from '@components/icons'

interface ProductSliderControl {
  onPrev: MouseEventHandler<HTMLButtonElement>
  onNext: MouseEventHandler<HTMLButtonElement>
  lighterColor: string
  darkerColor: string
}

const ProductSliderControl: FC<ProductSliderControl> = ({ onPrev, onNext, lighterColor, darkerColor }) => (
  <>
    <style jsx>
      {`
        #leftButtonSlider:hover,
        #rightButtonSlider:hover {
          background-color: ${lighterColor} !important;
        }

        #leftButtonSlider,
        #rightButtonSlider {
          background-color: ${darkerColor} !important;
        }      
      `}
    </style>
    <div className={s.control}>
      <button
        className={cn(s.leftControl)}
        id="leftButtonSlider"
        onClick={onPrev}
        aria-label="Previous Product Image"
      >
        <ArrowLeft />
      </button>
      <button
        className={cn(s.rightControl)}
        id="rightButtonSlider"
        onClick={onNext}
        aria-label="Next Product Image"
      >
        <ArrowRight />
      </button>
    </div>
  </>
)

export default memo(ProductSliderControl)
