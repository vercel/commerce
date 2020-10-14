import { FC, useState } from 'react'
import React from 'react'
import SwipeableViews from 'react-swipeable-views'

interface Props {
  children?: any
}

const ProductSlider: FC<Props> = ({ children }) => {
  const [idx, setIdx] = useState(0)
  const count = React.Children.count(children)

  const goBack = () => {
    idx !== 0 ? setIdx(idx - 1) : setIdx(count - 1)
  }

  const goNext = () => {
    idx + 1 === count ? setIdx(0) : setIdx(idx + 1)
  }

  return (
    <div className="relative w-full h-full">
      <div className="absolute flex flex-row inset-0 z-10 opacity-0">
        <div className="flex-1 bg-cyan" onClick={goBack}></div>
        <div className="flex-1 bg-pink" onClick={goNext}></div>
      </div>
      <SwipeableViews index={idx} onChangeIndex={setIdx}>
        {children}
      </SwipeableViews>
    </div>
  )
}

export default ProductSlider
