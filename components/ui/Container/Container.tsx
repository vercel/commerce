import cn from 'classnames'
import React, { FC } from 'react'

interface Props {
  className?: string
  children?: any
  el?: HTMLElement
}

const Container: FC<Props> = ({ children, className, el = 'div' }) => {
  const rootClassName = cn('mx-auto max-w-8xl px-12', className)

  let Component: React.ComponentType<React.HTMLAttributes<
    HTMLDivElement
  >> = el as any

  return <Component className={rootClassName}>{children}</Component>
}

export default Container
