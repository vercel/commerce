import cn from 'classnames'
import { FC } from 'react'
import s from './Featurebar.module.css'

interface Props {
  className?: string
  title: string
  description: string
}

const Featurebar: FC<Props> = ({ title, description, className }) => {
  const rootClassName = cn(
    'hidden py-2 px-6 bg-gray-100 text-sm text-gray-600 md:flex flex-row justify-center items-center font-medium',
    className
  )
  return (
    <div className={rootClassName}>
      <span>{title}</span>
      <span className={s.separator} />
      <span>{description}</span>
    </div>
  )
}

export default Featurebar
