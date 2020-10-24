import cn from 'classnames'
import { FC } from 'react'

interface Props {
  className?: string
  title: string
  description: string
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
    'transition-transform transform duration-500 text-center ease-out p-6 bg-primary text-base text-sm md:flex md:text-left flex-row justify-center items-center font-medium fixed bottom-0 w-full z-30',
    { 'translate-y-full': hide },
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
