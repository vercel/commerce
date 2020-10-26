import cn from 'classnames'
import { FC } from 'react'

import s from './Featurebar.module.css'

interface Props {
  className?: string
  title: string
  description?: string
  hide?: boolean
  action?: React.ReactNode
}

const Featurebar: FC<Props> = ({
  title,
  description,
  className,
  action,
  hide,
}) => {
  const rootClassName = cn(
    s.root,
    {
      'transition-transform transform duration-500 ease-out translate-y-full': hide,
    },
    className
  )
  return (
    <div className={rootClassName}>
      <span className="block md:inline">{title}</span>
      <span className="block mb-6 md:inline md:mb-0 md:ml-2">
        {description}
      </span>
      {action && action}
    </div>
  )
}

export default Featurebar
