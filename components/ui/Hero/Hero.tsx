import React, { FC } from 'react'
import { Container } from '@components/ui'
import { RightArrow } from '@components/icon'
interface Props {
  className?: string
  headline: string
  description: string
}

const Hero: FC<Props> = ({ headline, description }) => {
  return (
    <div className="bg-black">
      <Container>
        <div className="mx-auto grid grid-cols-1 py-32 md:grid-cols-2 gap-4">
          <h2 className="text-4xl leading-10 font-extrabold text-white sm:text-5xl sm:leading-none sm:tracking-tight lg:text-6xl">
            {headline}
          </h2>
          <div className="flex flex-col justify-between">
            <p className="mt-5 text-xl leading-7 text-accent-2 text-white">
              {description}
            </p>
            <a className="text-white pt-3 font-bold hover:underline flex flex-row cursor-pointer w-max-content">
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
