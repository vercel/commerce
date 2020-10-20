import React, { FC, useState } from 'react'
import SwipeableViews from 'react-swipeable-views'
import s from './ProductSlider.module.css'
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
    <div className={s.root}>
      <SwipeableViews
        index={idx}
        onChangeIndex={setIdx}
        containerStyle={{ overflow: 'visible' }}
        slideStyle={{ overflow: 'visible' }}
      >
        {children}
      </SwipeableViews>
      <div className={s.rootPanel}>
        <div className={s.leftPanel} onClick={goBack}></div>
        <div className={s.rightPanel} onClick={goNext}></div>
      </div>
    </div>
  )
}

export default ProductSlider
