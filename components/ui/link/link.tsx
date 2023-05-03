'use client'

import { cn } from 'lib/utils'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'

const Link: React.FC<
  NextLinkProps & {
    children?: React.ReactNode
    className?: string
  }
> = ({ href, children, className, ...props }) => {
  return (
    <NextLink className={cn('', className)} href={href} {...props}>
      {children}
    </NextLink>
  )
}

export default Link
