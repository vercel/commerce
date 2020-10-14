import cn from 'classnames'
import { FC } from 'react'
import { random } from 'lodash'
import { useState } from 'react'
interface Props {
  className?: string
  children?: any
}

function getRandomPairOfColors() {
  const colors = ['#37B679', '#DA3C3C', '#3291FF', '#7928CA', '#79FFE1']
  const getRandomIdx = () => random(0, colors.length - 1)
  let idx = getRandomIdx()
  let idx2 = getRandomIdx()

  // Has to be a different color
  while (idx2 === idx) {
    idx2 = getRandomIdx()
  }

  // Returns a pair of colors
  return [colors[idx], colors[idx2]]
}

const Avatar: FC<Props> = ({}) => {
  const [bg] = useState(getRandomPairOfColors)

  return (
    <div
      className="inline-block h-8 w-8 rounded-full border-2 border-accents-2"
      style={{
        backgroundImage: `linear-gradient(140deg, ${bg[0]}, ${bg[1]} 100%)`,
      }}
    >
      {/* Add an image - We're generating a gradient as placeholder 
      <img></img> */}
    </div>
  )
}

export default Avatar
