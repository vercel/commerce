import cn from 'classnames'
import { FC } from 'react'
import s from './Swatch.module.css'
import { Check } from '@components/icon'
import Button, { ButtonProps } from '@components/ui/Button'
import { isDark } from '@lib/colors'
interface Props {
  active?: boolean
  children?: any
  className?: string
  label?: string
  variant?: 'size' | 'color' | string
  color?: string
}

const Swatch: FC<Props & ButtonProps> = ({
  className,
  color,
  label,
  variant = 'size',
  active,
  ...props
}) => {
  variant = variant?.toLowerCase()
  label = label?.toLowerCase()
  const isDarkBg = isDark(color)

  const rootClassName = cn(
    s.root,
    {
      [s.active]: active,
      [s.size]: variant === 'size',
    },
    className
  )

  return (
    <Button
      className={rootClassName}
      style={color ? { backgroundColor: color } : {}}
      {...props}
    >
      {variant === 'color' && active && (
        <span
          className={cn('absolute', {
            'text-white': isDarkBg,
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
