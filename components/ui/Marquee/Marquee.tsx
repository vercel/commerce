import cn from 'classnames'
import s from './Marquee.module.css'
import { FC, ReactNode, Component, Children } from 'react'
import Ticker from 'react-ticker'

interface MarqueeProps {
  className?: string
  children?: ReactNode[] | Component[] | any[]
  variant?: 'primary' | 'secondary'
}

const Marquee: FC<MarqueeProps> = ({
  className = '',
  children,
  variant = 'primary',
}) => {
  const rootClassName = cn(
    s.root,
    {
      [s.primary]: variant === 'primary',
      [s.secondary]: variant === 'secondary',
    },
    className
  )

  return (
    <div className={rootClassName}>
      <Ticker offset={80}>
        {() => (
          <div className={s.container}>
            {Children.map(children, (child) => ({
              ...child,
              props: {
                ...child.props,
                className: cn(child.props.className, `${variant}`),
              },
            }))}
          </div>
        )}
      </Ticker>
    </div>
  )
}

export default Marquee
