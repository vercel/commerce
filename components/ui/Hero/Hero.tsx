import React, { FC } from 'react'
import { Container } from '@components/ui'
import { ArrowRight } from '@components/icons'
import s from './Hero.module.css'
import Link from 'next/link'
interface HeroProps {
  className?: string
  headline: string
  description: string,
  linkText?: string,
  linkUrl?: string
}

const Hero: FC<Props> = ({ headline, description, linkText, linkUrl }) => {

  return (
    <div className="bg-accent-9 border-b border-t border-accent-2">
      <Container>
        <div className={s.root}>
          <h2 className="text-4xl leading-10 font-extrabold text-white sm:text-5xl sm:leading-none sm:tracking-tight lg:text-6xl">
            {headline}
          </h2>
          <div className="flex flex-col justify-between">
            <p className="mt-5 text-xl leading-7 text-accent-2 text-white">
              {description}
            </p>
			{ linkText && linkUrl &&
            <Link href={linkUrl}>
              <a className="text-white pt-3 font-bold hover:underline flex flex-row cursor-pointer w-max-content">
                {linkText}
                <RightArrow width="20" heigh="20" className="ml-1" />
              </a>
            </Link>
			}
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Hero
