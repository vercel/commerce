'use client';

import clsx from 'clsx';
import Price from 'components/price';
import { Product } from 'lib/shopify/types';
import { useSearchParams } from 'next/navigation';
import DisclosureSection from './disclosure-section';

const Details = ({ product }: { product: Product }) => {
  const searchParams = useSearchParams();
  const variants = product.variants;

  const variant = variants.find((variant) =>
    variant.selectedOptions.every(
      (option) => option.value === searchParams.get(option.name.toLowerCase())
    )
  );

  const details = [
    ...(product.transmissionTag
      ? [
          {
            title: 'Transmission Tag',
            value: product.transmissionTag.join()
          }
        ]
      : []),
    ...(product.transmissionCode
      ? [
          {
            title: 'Transmission Code',
            value: product.transmissionCode.join()
          }
        ]
      : []),
    ...(product.transmissionSpeeds
      ? [
          {
            title: 'Transmission Speeds',
            value: product.transmissionSpeeds.map((speed) => `${speed}-Speed`).join()
          }
        ]
      : [])
  ];
  return (
    <DisclosureSection title="Product Details" defaultOpen>
      <div className="flex w-full items-center p-1">
        <span className="basis-2/5">Condition</span>
        <span>{variant?.condition || 'N/A'}</span>
      </div>
      <div className="flex w-full items-center bg-gray-100 p-1">
        <span className="basis-2/5">Price</span>
        <Price
          amount={variant?.price.amount || product.priceRange.minVariantPrice.amount}
          currencyCode={
            variant?.price.currencyCode || product.priceRange.minVariantPrice.currencyCode
          }
        />
      </div>
      <div className="flex w-full items-center p-1">
        <span className="basis-2/5">Warranty</span>
        <span />
      </div>
      <div className="flex w-full items-center bg-gray-100 p-1">
        <span className="basis-2/5">Cylinders</span>
        <span>{product.engineCylinders?.map((cylinder) => `${cylinder} Cylinders`).join()}</span>
      </div>

      {details.map(({ title, value }, index) => (
        <div
          key={index}
          className={clsx('flex w-full items-center p-1', { 'bg-gray-100': index % 2 !== 0 })}
        >
          <span className="basis-2/5">{title}</span>
          <span>{value}</span>
        </div>
      ))}
    </DisclosureSection>
  );
};

export default Details;
