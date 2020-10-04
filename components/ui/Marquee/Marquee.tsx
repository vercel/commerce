import cn from 'classnames'
import s from './Marquee.module.css'
import { FC } from 'react'
import Ticker from 'react-ticker'

interface Props {
  className?: string
  children?: any
  items: any[]
  wrapper?: React.Component | any
  variant?: 'primary' | 'secondary'
}

const DefaultWrapper: FC<Props> = ({ children }) => <div>{children}</div> // DEFAULT PRODUCT WRAPPER

const M: FC<Props> = ({
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

  const flickityOptions = {
    initialIndex: 2,
  }

  return (
    <Ticker>
      {({ index }) => (
        <div className={rootClassName}>
          {items.map((p: any) => (
            <Component {...p} key={index} />
          ))}
        </div>
      )}
    </Ticker>
  )
}

export default M
