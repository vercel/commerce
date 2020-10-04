import cn from 'classnames'
import s from './Marquee.module.css'
import { FC } from 'react'

interface Props {
  className?: string
  children?: any
  items: any[]
  wrapper?: React.Component | any
  variant?: 'primary' | 'secondary'
}

const DefaultWrapper: FC<Props> = ({ children }) => <div>{children}</div> // DEFAULT PRODUCT WRAPPER

const Marquee: FC<Props> = ({
  className = '',
  items,
  wrapper: Component = DefaultWrapper,
  variant = 'white',
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
      {items.map((p: any) => (
        <Component {...p} />
      ))}
    </div>
  )
}

export default Marquee
