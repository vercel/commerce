import cn from 'classnames'
import { FC, ReactNode, Component } from 'react'
import s from './Grid.module.css'

interface Props {
  className?: string
  children?: any
  items: [any] | any
  layout?: 'A' | 'B' | 'C' | 'D' | 'normal'
  wrapper?: ReactNode | Component | any
}

const DefaultWrapper: FC<Props> = ({ children }) => <div>{children}</div> // DEFAULT ITEMS WRAPPER

const Grid: FC<Props> = ({
  items = [],
  className,
  layout = 'A',
  wrapper: Component = DefaultWrapper,
}) => {
  const rootClassName = cn(
    s.root,
    {
      [s.layoutA]: layout === 'A',
      [s.layoutB]: layout === 'B',
      [s.layoutC]: layout === 'C',
      [s.layoutD]: layout === 'D',
      [s.layoutNormal]: layout === 'normal',
    },
    className
  )
  return (
    <div className={rootClassName}>
      {items.map((data: any) => (
        <Component {...data} />
      ))}
    </div>
  )
}

export default Grid
