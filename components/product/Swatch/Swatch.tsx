import cn from 'classnames'
import { FC } from 'react'
import s from './Swatch.module.css'
import { Colors } from '@components/ui/types'
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

  // TODO: technically this is a radio

  return (
    <Button className={rootClassName} {...props}>
      {color && active && (
        <span
          className={cn('absolute', {
            'text-white': color !== 'white',
            'text-black': color === 'white',
          })}
        >
          {Check}
        </span>
      )}
      {size}
    </Button>
  )
}

export default Swatch

const Check = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
  >
    <path
      d="M20 6L9 17L4 12"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
)
