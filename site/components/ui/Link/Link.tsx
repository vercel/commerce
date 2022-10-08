import NextLink, { LinkProps as NextLinkProps } from 'next/link'

const Link: React.FC<
  NextLinkProps & {
    children?: React.ReactNode
  }
> = ({ href, children, ...props }) => {
  return (
    <NextLink href={href}>
      <a {...props}>{children}</a>
    </NextLink>
  )
}

export default Link
