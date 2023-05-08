'use client'

import SanityImage from '../sanity-image'

interface USPSectionProps {
  usps: any
  title: string
  mobileLayout: string
  desktopLayout: string
  imageFormat: 'square' | 'portrait' | 'landscape'
}

const USPSection = ({ usps }: USPSectionProps) => {
  const desktopGridLayout = `lg:grid-cols-${usps.length}`
  return (
    <div
      className={`w-full px-4 lg:px-16 py-16 lg:py-24 grid grid-cols-2 gap-x-4 gap-y-6 lg:gap-x-12 ${desktopGridLayout}`}
    >
      {usps.map((usp: any, index: number) => (
        <div
          key={index}
          className={`w-full flex flex-col items-center text-center`}
        >
          <div className="w-20 h-20 lg:w-24 lg:h-24 mb-4 lg:mb-8">
            <SanityImage
              className="object-cover"
              image={usp?.image}
              alt={usp.name || 'USP image'}
              width={96}
              height={96}
              sizes="96px"
            />
          </div>
          <h3 className="mb-2 lg:mb-4 text-xl lg:text-2xl">{usp.title}</h3>
          <p className="text-sm lg:text-base !text-low-contrast max-w-xs">
            {usp.text}
          </p>
        </div>
      ))}
    </div>
  )
}

export default USPSection