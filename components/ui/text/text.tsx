'use client';

import { cn } from 'lib/utils';
import React, { CSSProperties, FunctionComponent, JSXElementConstructor } from 'react';

interface TextProps {
  variant?: Variant;
  className?: string;
  style?: CSSProperties;
  children?: React.ReactNode | any;
  html?: string;
  onClick?: () => any;
}

type Variant =
  | 'heading'
  | 'body'
  | 'pageHeading'
  | 'productHeading'
  | 'sectionHeading'
  | 'label'
  | 'paragraph'
  | 'listChildHeading';

const Text: FunctionComponent<TextProps> = ({
  style,
  className = '',
  variant = 'body',
  children,
  html,
  onClick
}) => {
  const componentsMap: {
    [P in Variant]: React.ComponentType<any> | string;
  } = {
    body: 'div',
    heading: 'h1',
    pageHeading: 'h1',
    productHeading: 'h1',
    sectionHeading: 'h2',
    listChildHeading: 'h3',
    label: 'div',
    paragraph: 'p'
  };

  const Component:
    | JSXElementConstructor<any>
    | React.ReactElement<any>
    | React.ComponentType<any>
    | string = componentsMap![variant!];

  const htmlContentProps = html
    ? {
        dangerouslySetInnerHTML: { __html: html }
      }
    : {};

  return (
    <Component
      className={cn(
        '',
        {
          ['max-w-prose text-base']: variant === 'body',
          ['max-w-prose font-display text-4xl font-extrabold leading-none md:text-5xl md:leading-none lg:text-6xl lg:leading-none']:
            variant === 'heading',
          ['extrabold max-w-prose font-display text-3xl leading-none md:text-4xl md:leading-none lg:text-5xl lg:leading-none']:
            variant === 'pageHeading',
          ['max-w-prose font-display text-2xl leading-none md:text-3xl md:leading-none lg:text-4xl lg:leading-none']:
            variant === 'productHeading',
          ['max-w-prose font-display text-2xl font-extrabold leading-none md:text-3xl md:leading-none lg:text-4xl lg:leading-none']:
            variant === 'sectionHeading',
          ['text-sm font-medium leading-tight lg:text-base']: variant === 'listChildHeading',
          ['max-w-prose text-lg text-high-contrast lg:text-xl']: variant === 'label',
          ['max-w-prose lg:text-lg 2xl:text-xl']: variant === 'paragraph'
        },
        className
      )}
      onClick={onClick}
      style={style}
      {...htmlContentProps}
    >
      {children}
    </Component>
  );
};

export default Text;
