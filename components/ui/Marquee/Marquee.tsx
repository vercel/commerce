import cn from 'classnames'
import s from './Marquee.module.css'
import { FC, ReactNode, Component } from 'react'
import Ticker from 'react-ticker'
import { useInView } from 'react-intersection-observer'

interface Props {
  className?: string
  children?: ReactNode[] | Component[] | any[]
  variant?: 'primary' | 'secondary'
}

const Maquee: FC<Props> = ({
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
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: '200px 0px',
  })

  return (
    <div className={rootClassName} ref={ref}>
      {inView ? (
        <Ticker offset={80}>
          {() => <div className={s.container}>{children}</div>}
        </Ticker>
      ) : null}
    </div>
  )
}

export default Maquee
