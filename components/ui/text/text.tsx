'use client'

import { cn } from 'lib/utils'
import React, {
  CSSProperties,
  FunctionComponent,
  JSXElementConstructor,
} from 'react'

interface TextProps {
  variant?: Variant
  className?: string
  style?: CSSProperties
  children?: React.ReactNode | any
  html?: string
  onClick?: () => any
}

type Variant =
  | 'heading'
  | 'body'
  | 'pageHeading'
  | 'productHeading'
  | 'sectionHeading'
  | 'label'
  | 'paragraph'
  | 'listChildHeading'

const Text: FunctionComponent<TextProps> = ({
  style,
  className = '',
  variant = 'body',
  children,
  html,
  onClick,
}) => {
  const componentsMap: {
    [P in Variant]: React.ComponentType<any> | string
  } = {
    body: 'div',
    heading: 'h1',
    pageHeading: 'h1',
    productHeading: 'h1',
    sectionHeading: 'h2',
    listChildHeading: 'h3',
    label: 'div',
    paragraph: 'p',
  }

  const Component:
    | JSXElementConstructor<any>
    | React.ReactElement<any>
    | React.ComponentType<any>
    | string = componentsMap![variant!]

  const htmlContentProps = html
    ? {
        dangerouslySetInnerHTML: { __html: html },
      }
    : {}

  return (
    <Component
      className={cn(
        '',
        {
          ['text-base max-w-prose']: variant === 'body',
          ['max-w-prose text-4xl font-display font-bold leading-none md:text-5xl md:leading-none lg:leading-none lg:text-6xl']:
            variant === 'heading',
          ['max-w-prose text-3xl font-display font-bold leading-none md:text-4xl md:leading-none lg:leading-none lg:text-5xl']:
            variant === 'pageHeading',
          ['max-w-prose text-2xl font-display leading-none md:text-3xl md:leading-none lg:leading-none lg:text-4xl']:
          variant === 'productHeading',
          ['max-w-prose text-2xl font-display font-bold leading-none md:text-3xl md:leading-none lg:leading-none lg:text-4xl']:
          variant === 'sectionHeading',
          ['text-sm font-semibold leading-tight lg:text-base']:
            variant === 'listChildHeading',
          ['text-sm max-w-prose lg:text-base 2xl:text-lg']: variant === 'label',
          ['max-w-prose lg:text-lg 2xl:text-xl']: variant === 'paragraph',
        },
        className
      )}
      onClick={onClick}
      style={style}
      {...htmlContentProps}
    >
      {children}
    </Component>
  )
}

export default Text
