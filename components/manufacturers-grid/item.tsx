import ImageDisplay from 'components/page/image-display';
import { Metaobject } from 'lib/shopify/types';
import { Suspense } from 'react';
import { twMerge } from 'tailwind-merge';

const ManufacturerItem = ({
  manufacturer,
  className
}: {
  manufacturer: Metaobject;
  className?: string;
}) => {
  return (
    <div className={twMerge('flex w-full flex-row items-center justify-between', className)}>
      <span className="text-sm leading-5">{manufacturer.display_name}</span>
      <div className="hidden md:block">
        <Suspense>
          <ImageDisplay
            fileId={manufacturer.logo as string}
            title={manufacturer.display_name || 'Logo'}
            className="aspect-1 h-7"
            unoptimized
          />
        </Suspense>
      </div>
    </div>
  );
};

export default ManufacturerItem;
