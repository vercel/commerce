import classNames from 'classnames'
import React from 'react'
import s from './LabelCommon.module.scss'
interface LabelCommonProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  size?: 'default' | 'large'
  shape?: 'half' | 'round' | 'default'
  type?: 'default' | 'discount' | 'waiting' | 'delivering' | 'delivered'
  color?: string
}

const LabelCommon = ({
  size = 'default',
  type = 'default',
  shape = "default",
  children,
}: LabelCommonProps) => {
  return (
    <div
      className={classNames(s.labelCommonWarper, {
        [s[`${size}Size`]]: size,
        [s[`${type}Type`]]: type,
        [s[`${shape}Shape`]]: shape,
      })}
    >
      {children}
    </div>
  )
}

export default LabelCommon
