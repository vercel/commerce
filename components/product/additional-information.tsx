import { Product } from 'lib/shopify/types';
import Details from './details';
import ShippingPolicy from './shipping-policy';
import WarrantyPolicy from './warranty-policy';

const AdditionalInformation = ({ product }: { product: Product }) => {
  return (
    <div className="my-5 w-full divide-y">
      <Details product={product} />
      <WarrantyPolicy />
      <ShippingPolicy />
    </div>
  );
};

export default AdditionalInformation;
