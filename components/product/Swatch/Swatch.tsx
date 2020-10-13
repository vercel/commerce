import cn from 'classnames'
import { FC } from 'react'
import s from './Swatch.module.css'
import { Colors } from '@components/ui/types'
import { Check } from '@components/icon'
import Button, { ButtonProps } from '@components/ui/Button'

interface Props extends ButtonProps {
  className?: string
  children?: any
  active?: boolean
  color?: Colors
  size?: string
}

const Swatch: FC<Props> = ({ className, size, color, active, ...props }) => {
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

  return (
    <Button className={rootClassName} {...props}>
      {color && active && (
        <span
          className={cn('absolute', {
            'text-white': color !== 'white',
            'text-black': color === 'white',
          })}
        >
          <Check />
        </span>
      )}
      {size}
    </Button>
  )
}

export default Swatch
