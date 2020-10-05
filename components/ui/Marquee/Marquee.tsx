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
  variant = 'primary',
  // min = 'none',
}) => {
  const rootClassName = cn(
    s.root,
    {
      [s.primary]: variant === 'primary',
      [s.secondary]: variant === 'secondary',
    },
    className
  )

  // return (
  //   <div className={rootClassName}>
  //     <div className={s.container}>
  //       {items.map((p: any) => (
  //         <Component {...p} />
  //       ))}
  //     </div>
  //   </div>
  // )

  return (
    <Ticker>
      {({ index }) => (
        <div className={rootClassName}>
          <div className={s.container}>
            {items.map((p: any) => (
              <Component {...p} key={index} />
            ))}
          </div>
        </div>
      )}
    </Ticker>
  )
}

export default M
