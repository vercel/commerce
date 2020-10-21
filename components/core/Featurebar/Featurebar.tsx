import cn from 'classnames'
import { FC } from 'react'
import s from './Featurebar.module.css'

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
    'transition-transform transform duration-500 ease-out p-6 bg-primary text-base text-sm md:flex flex-row justify-center items-center font-medium fixed bottom-0 w-full z-10',
    { 'translate-y-full': hide },
    className
  )
  return (
    <div className={rootClassName}>
      <span>{title}</span>
      <span className={s.separator} />
      <span>{description}</span>
      {action && action}
    </div>
  )
}

export default Featurebar
