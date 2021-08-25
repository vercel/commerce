import classNames from 'classnames'
import React from 'react'
import ArrowLeft from 'src/components/icons/ArrowLeft'
import ArrowRight from 'src/components/icons/ArrowRight'
import "./CustomCarouselArrow.module.scss"
// import s from "../CaroucelCommon.module.scss"

interface CustomCarouselArrowProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  side: 'left' | 'right'
	isDisabled?:Boolean
}

export const CustomCarouselArrow = ({
  side,isDisabled,
  ...props
}: CustomCarouselArrowProps) => {
  return (
    <button
      {...props}
      // className={classNames(`${s.customArrow}`, { [`${s[`${side}Arrow`]}`]: side,[`${s.isDisabled}`]:isDisabled })}
      className={classNames("customArrow", { [`${side}Arrow`]: side,"isDisabledArrow":isDisabled})}
    >
			{side==='left'?(<ArrowLeft/>):(<ArrowRight/>)}
		</button>
  )
}
