import cn from 'clsx'
import React, { FC } from 'react'

interface ContainerProps {
  className?: string
  children?: any
  el?: HTMLElement
  clean?: boolean
}

const Container: FC<ContainerProps> = ({
  children,
  className,
  el = 'div',
  clean,
}) => {
  const rootClassName = cn(className, {
    'mx-auto max-w-8xl px-6': !clean,
  })

  let Component: React.ComponentType<React.HTMLAttributes<HTMLDivElement>> =
    el as any

  return <Component className={rootClassName}>{children}</Component>
}

export default Container
