import cn from 'classnames'
import { FC, useState } from 'react'
import { getRandomPairOfColors } from '@lib/colors'

interface Props {
  className?: string
  children?: any
}

const Avatar: FC<Props> = ({}) => {
  const [bg] = useState(getRandomPairOfColors)

  return (
    <div
      className="inline-block h-8 w-8 rounded-full border-2 border-primary hover:border-secondary focus:border-secondary transition linear-out duration-150"
      style={{
        backgroundImage: `linear-gradient(140deg, ${bg[0]}, ${bg[1]} 100%)`,
      }}
    >
      {/* Add an image - We're generating a gradient as placeholder  <img></img> */}
    </div>
  )
}

export default Avatar
