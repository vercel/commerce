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
  label?: string
  variant?: 'size' | 'color' | string
}

const Swatch: FC<Props> = ({
  className,
  label,
  variant = 'size',
  active,
  ...props
}) => {
  variant = variant?.toLowerCase()
  label = label?.toLowerCase()

  const rootClassName = cn(
    s.root,
    {
      [s.active]: active,
      [s.size]: variant === 'size',
      [s.colorPink]: label === 'pink',
      [s.colorWhite]: label === 'white',
      [s.colorBlack]: label === 'black',
      [s.colorViolet]: label === 'violet',
    },
    className
  )

  return (
    <Button className={rootClassName}>
      {variant === 'color' && active && (
        <span
          className={cn('absolute', {
            'text-white': label !== 'white',
            'text-black': label === 'white',
          })}
        >
          <Check />
        </span>
      )}
      {variant === 'size' ? label : null}
    </Button>
  )
}

export default Swatch
