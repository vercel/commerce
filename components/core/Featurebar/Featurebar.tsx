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
    'hidden py-2 px-6 bg-accents-1 border-b border-accents-2 text-base text-sm text-gray-600 md:flex flex-row justify-center items-center font-medium border-b border-accents-1',
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
