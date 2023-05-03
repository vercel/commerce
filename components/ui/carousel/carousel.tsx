'use client'

import 'glider-js/glider.min.css'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import React from 'react'
import Glider from 'react-glider'

export interface CarouselItemProps {
  children: React.ReactNode
}

export const CarouselItem: React.FC<CarouselItemProps> = ({
  children,
}: CarouselItemProps) => {
  return <div className="">{children}</div>
}

export interface CarouselProps {
  children: JSX.Element | JSX.Element[] | any
  gliderClasses?: string
  hasArrows?: boolean
  hasDots?: boolean
  gliderItemWrapperClasses?: string
  slidesToShow?: number
  slidesToScroll?: number
  responsive?: any
}

export const Carousel: React.FC<CarouselProps> = ({
  children,
  gliderClasses,
  hasArrows = true,
  hasDots = true,
  gliderItemWrapperClasses,
  slidesToShow = 1,
  slidesToScroll = 1,
  responsive,
}) => {
  return (
    <div className="flex flex-col">
      <Glider
        className={`flex w-full relative ${gliderClasses}`}
        draggable
        slidesToShow={slidesToShow}
        scrollLock
        slidesToScroll={slidesToScroll}
        hasArrows={hasArrows}
        hasDots={hasDots}
        iconLeft={<ArrowLeft className="stroke-current" />}
        iconRight={<ArrowRight className="stroke-current" />}
        responsive={[responsive]}
        skipTrack
      >
        <div className={`flex w-full ${gliderItemWrapperClasses} `}>
          {React.Children.map(children, (child) => {
            return React.cloneElement(child)
          })}
        </div>
      </Glider>
    </div>
  )
}
