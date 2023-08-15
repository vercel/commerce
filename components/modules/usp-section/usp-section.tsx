'use client';

import SanityImage from '../../ui/sanity-image';

interface USPSectionProps {
  usps: [] | any;
}

const USPSection = ({ usps }: USPSectionProps) => {
  const desktopGridLayout = usps.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3';

  return (
    <div className="px-4 lg:px-8 2xl:px-16">
      <div
        className={`grid w-full grid-cols-2 gap-x-4 gap-y-6 lg:gap-8 2xl:gap-x-16 ${desktopGridLayout}`}
      >
        {usps.map((usp: any, index: number) => (
          <div key={index} className={`flex w-full flex-col items-center text-center`}>
            {usp?.image && (
              <div className="h-20 w-20 lg:h-24 lg:w-24">
                <SanityImage
                  className="object-cover"
                  image={usp?.image}
                  alt={usp.name || 'USP image'}
                  width={96}
                  height={96}
                  sizes="96px"
                />
              </div>
            )}
            <h2 className="mt-4 text-xl lg:mt-8 lg:text-2xl">{usp.title}</h2>
            {usp.text && (
              <p className="mt-2 max-w-xs text-sm text-low-contrast lg:mt-4 lg:text-base">
                {usp.text}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default USPSection;
