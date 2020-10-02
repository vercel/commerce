import cn from 'classnames'
import React, { ButtonHTMLAttributes } from 'react'
import s from './Button.module.css'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string
  className?: string
  variant?: 'filled' | 'outlined' | 'flat' | 'none'
  active?: boolean
  type?: 'submit' | 'reset' | 'button'
}

export default class Button extends React.Component<Props> {
  public render() {
    const {
      className,
      variant = 'filled',
      children,
      disabled = false,
      href,
      active,
      ...rest
    } = this.props

    let Component: React.ComponentType<
      React.AnchorHTMLAttributes<
        HTMLAnchorElement | HTMLButtonElement | HTMLDivElement
      > &
        React.ClassAttributes<HTMLButtonElement | HTMLAnchorElement>
    > = 'a' as any

    // Catch for buttons / span / stc.

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
        {...rest}
      >
        {children}
      </Component>
    )
  }
}
