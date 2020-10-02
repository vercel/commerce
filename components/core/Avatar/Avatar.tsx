import cn from 'classnames'
import { FC } from 'react'
import s from './Avatar.module.css'

interface Props {
  className?: string
  children?: any
}

const Avatar: FC<Props> = ({ className }) => {
  const rootClassName = cn(s.root, className)
  return (
    <div className={rootClassName}>
      <img
        className="inline-block h-8 w-8 rounded-full"
        src="https://vercel.com/api/www/avatar/61182a9f6bda512b4d9263c9c8a60aabe0402f4c?s=204"
        alt=""
      ></img>
    </div>
  )
}

export default Avatar
