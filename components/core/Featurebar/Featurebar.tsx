import cn from 'classnames'
import { FunctionComponent } from 'react'
import s from './Featurebar.module.css'

interface Props {
  className?: string
  title: string
  description: string
}

const Featurebar: FunctionComponent<Props> = ({
  title,
  description,
  className,
}) => {
  const rootClassName = cn(s.root, className)
  return (
    <div className={rootClassName}>
      <span className={s.title}>{title}</span>
      <span className={s.separator} />
      <span className={s.description}>{description}</span>
    </div>
  )
}

export default Featurebar
