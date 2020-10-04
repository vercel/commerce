import cn from 'classnames'
import React, { FC } from 'react'
import s from './Hero.module.css'
import { Container } from '@components/ui'
interface Props {
  className?: string
  headline: string
  description: string
}

const Hero: FC<Props> = ({ headline, description, className }) => {
  const rootClassName = cn(s.root, className)
  return (
    <div className={rootClassName}>
      <Container>
        <div className="max-w-xl">
          <h2 className="text-4xl leading-10 font-extrabold text-white sm:text-5xl sm:leading-none sm:tracking-tight lg:text-6xl">
            {headline}
          </h2>
          <p className="mt-5 text-xl leading-7 text-gray-400">{description}</p>
        </div>
      </Container>
    </div>
  )
}

export default Hero
