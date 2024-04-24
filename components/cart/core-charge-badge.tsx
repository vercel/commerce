import CoreCharge from 'components/core-charge';
import { ProductVariant } from 'lib/shopify/types';

type CoreChargeBadgeProps = {
  selectedOptions: {
    name: string;
    value: string;
  }[];
  variants: ProductVariant[];
};

const CoreChargeBadge = ({ variants, selectedOptions }: CoreChargeBadgeProps) => {
  const selectedOptionsMap = new Map(selectedOptions.map((option) => [option.name, option.value]));
  console.log({ selectedOptionsMap, variants });
  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every((option) => option.value === selectedOptionsMap.get(option.name))
  );

  console.log({ variant });
  return <CoreCharge variant={variant} sm />;
};

export default CoreChargeBadge;
