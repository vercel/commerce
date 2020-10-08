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
    'hidden py-4 px-6 bg-black text-white md:flex flex-row justify-center items-center;',
    className
  )
  return (
    <div className={rootClassName}>
      <span className="text-white font-medium">{title}</span>
      <span className={s.separator} />
      <span className="text-white font-medium">{description}</span>
    </div>
  )
}

export default Featurebar
