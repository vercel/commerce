import cn from 'classnames'
import React, {
  forwardRef,
  ButtonHTMLAttributes,
  JSXElementConstructor,
  useRef,
} from 'react'
import mergeRefs from 'react-merge-refs'
import { useButton } from 'react-aria'
import s from './Button.module.css'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string
  className?: string
  variant?: 'filled' | 'outlined' | 'flat' | 'none'
  active?: boolean
  type?: 'submit' | 'reset' | 'button'
  Component?: string | JSXElementConstructor<any>
  width?: string | number
}

const Button: React.FC<ButtonProps> = forwardRef((props, buttonRef) => {
  const {
    className,
    variant = 'filled',
    children,
    href,
    active,
    onClick,
    disabled,
    width,
    Component = 'button',
    ...rest
  } = props
  const ref = useRef<typeof Component>(null)
  const { buttonProps, isPressed } = useButton(
    {
      ...rest,
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
      ref={mergeRefs([ref, buttonRef])}
      {...buttonProps}
      style={{
        width,
      }}
      data-active={isPressed ? '' : undefined}
    >
      {children}
    </Component>
  )
})

export default Button
