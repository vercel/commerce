import cn from 'classnames'
import React, { FC } from 'react'
import s from './Swatch.module.css'
import { Colors } from '@components/ui/types'

interface Props {
  className?: string
  children?: any
  active?: boolean
  color?: Colors
  size?: string
}

const Swatch: FC<Props> = ({ className, size, color, active }) => {
  const rootClassName = cn(
    s.root,
    {
      [s.active]: active,
      [s.size]: size,
      [s.colorPink]: color === 'pink',
      [s.colorWhite]: color === 'white',
      [s.colorBlack]: color === 'black',
      [s.colorViolet]: color === 'violet',
    },
    className
  )
  return <span className={rootClassName}>{size ? size : null}</span>
}

export default Swatch
