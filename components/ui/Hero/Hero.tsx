import cn from 'classnames'
import React, { FC } from 'react'
import s from './Hero.module.css'
import { Container } from '@components/ui'
import { RightArrow } from '@components/icon'
interface Props {
  className?: string
  headline: string
  description: string
}

const Hero: FC<Props> = ({ headline, description, className }) => {
  const rootClassName = cn('bg-black py-40 min-h-72', className)
  return (
    <div className={rootClassName}>
      <Container>
        <div className="mx-auto grid grid-cols-2">
          <h2 className="text-4xl leading-10 font-extrabold text-white sm:text-5xl sm:leading-none sm:tracking-tight lg:text-6xl">
            {headline}
          </h2>
          <div className="flex flex-col justify-between">
            <p className="mt-5 text-xl leading-7 text-accent-2">
              {description}
            </p>
            <a className="block text-white pt-3 font-bold hover:underline flex flex-row cursor-pointer">
              <span>Read it here</span>
              <RightArrow width="20" heigh="20" className="ml-1" />
            </a>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Hero
