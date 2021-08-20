import classNames from 'classnames'
import React from 'react'
import ArrowLeft from 'src/components/icons/ArrowLeft'
import ArrowRight from 'src/components/icons/ArrowRight'
import s from "./CustomCarouselArrow.module.scss"
interface CustomCarouselArrowProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  side: 'left' | 'right'
	isDisabled:Boolean
}

export const CustomCarouselArrow = ({
  side,isDisabled,
  ...props
}: CustomCarouselArrowProps) => {
  return (
    <button
      {...props}
      className={classNames(`${s.custom_arrow}`, { [`${s[side]}`]: side,[`${s.isDisabled}`]:isDisabled })}
    >
			{side==='left'?(<ArrowLeft/>):(<ArrowRight/>)}
		</button>
  )
}
