'use client'

import SanityImage from '../../ui/sanity-image';

interface USPSectionProps {
  usps: [] | any
}

const USPSection = ({ usps }: USPSectionProps) => {
  const desktopGridLayout = usps.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3';

  return (
    <div className="px-4 lg:px-8 2xl:px-16">
      <div
      className={`w-full grid grid-cols-2 gap-x-4 gap-y-6 lg:gap-8 2xl:gap-x-16 ${desktopGridLayout}`}
      >
        {usps.map((usp: any, index: number) => (
          <div
            key={index}
            className={`w-full flex flex-col items-center text-center`}
          >
            <div className="w-20 h-20 lg:w-24 lg:h-24">
              <SanityImage
                className="object-cover"
                image={usp?.image}
                alt={usp.name || 'USP image'}
                width={96}
                height={96}
                sizes="96px"
              />
            </div>
            <h2 className="text-xl mt-4 lg:mt-8 lg:text-2xl">{usp.title}</h2>
            {usp.text && (
              <p className="text-sm mt-2 text-low-contrast max-w-xs lg:text-base lg:mt-4">
                {usp.text}
              </p>
            )}
          </div>
        ))}
      </div>

    </div>
  )
}

export default USPSection