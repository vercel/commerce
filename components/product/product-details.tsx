import {
  BeakerIcon,
  BoltIcon,
  CogIcon,
  CpuChipIcon,
  CubeTransparentIcon
} from '@heroicons/react/24/outline';
import { Product } from 'lib/shopify/types';

const ProductDetails = ({ product }: { product: Product }) => {
  return (
    <div className="mb-3 flex flex-col gap-3">
      <span className="font-medium">Details</span>
      <div className="grid grid-cols-4 gap-y-3 text-sm">
        {product.transmissionType && (
          <div className="flex flex-row items-center gap-2">
            <CubeTransparentIcon className="size-4 text-primary" />
            {product.transmissionType}
          </div>
        )}

        {product.transmissionSpeeds && product.transmissionSpeeds.length && (
          <div className="flex flex-row items-center gap-2">
            <BoltIcon className="size-4 text-primary" />
            {`${product.transmissionSpeeds[0]}-Speed`}
          </div>
        )}
        {product.driveType && (
          <div className="flex flex-row items-center gap-2">
            <CogIcon className="size-4 text-primary" />
            {product.driveType}
          </div>
        )}
        {product.engineCylinders?.length && (
          <div className="flex flex-row items-center gap-2">
            <BeakerIcon className="size-4 text-primary" />
            {`${product.engineCylinders[0]} Cylinders`}
          </div>
        )}
        {product.transmissionCode?.length && (
          <div className="flex flex-row items-center gap-2">
            <CpuChipIcon className="size-4 text-primary" />
            {product.transmissionCode[0]}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
