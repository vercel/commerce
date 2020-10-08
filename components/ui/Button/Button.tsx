import cn from 'classnames'
import React, {
  ButtonHTMLAttributes,
  JSXElementConstructor,
  useRef,
} from 'react'
import { useButton } from 'react-aria'
import s from './Button.module.css'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string
  className?: string
  variant?: 'filled' | 'outlined' | 'flat' | 'none'
  active?: boolean
  type?: 'submit' | 'reset' | 'button'
  Component?: string | JSXElementConstructor<any>
}

const Button: React.FC<Props> = (props) => {
  const {
    className,
    variant = 'filled',
    children,
    href,
    active,
    onClick,
    disabled,
    Component = 'button',
    ...rest
  } = props
  const ref = useRef<typeof Component>(null)
  const { buttonProps, isPressed } = useButton(
    {
      ...props,
      // @ts-ignore onClick === onPress for our purposes
      onPress: onClick,
      isDisabled: disabled,
      elementType: Component,
    },
    ref
  )

  const rootClassName = cn(
    s.root,
    {
      [s.filled]: variant === 'filled',
    },
    className
  )

  return (
    <Component
      className={rootClassName}
      href={href}
      aria-pressed={active}
      data-variant={variant}
      ref={ref}
      {...rest}
      {...buttonProps}
      data-active={isPressed ? '' : undefined}
    >
      {children}
    </Component>
  )
}

export default Button
