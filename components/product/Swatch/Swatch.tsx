import cn from 'classnames'
import { FC } from 'react'
import s from './Swatch.module.css'
import { Check } from '@components/icons'
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

const Swatch: FC<Omit<ButtonProps, 'variant'> & Props> = ({
  className,
  color = '',
  label,
  variant = 'size',
  active,
  ...props
}) => {
  label = label?.toLowerCase()
  const isColor = color !== ''

  const rootClassName = cn(
    s.root,
    {
      [s.active]: active,
      [s.size]: !isColor,
      [s.color]: color,
      [s.dark]: color ? isDark(color) : false,
    },
    className
  )

  return (
    <Button
      className={rootClassName}
      style={isColor ? { backgroundColor: color } : {}}
      aria-label="Variant Swatch"
      {...(isColor && { title: label })}
      {...props}
    >
      {isColor ? (
        <span>
          <Check />
        </span>
      ) : (
        label
      )}
    </Button>
  )
}

export default Swatch
