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
    <div
      className="inline-block h-8 w-8 rounded-full border border-accent"
      style={{
        backgroundImage: 'linear-gradient(160deg, #F9CB28, #FF4D4D 100%)',
      }}
    >
      {/* <img></img> */}
    </div>
  )
}

export default Avatar
