import { ArrowPathIcon } from '@heroicons/react/16/solid';
import { ProductVariant } from 'lib/shopify/types';
import Price from './price';
import Tooltip from './tooltip';

type CoreChargeProps = {
  variant?: ProductVariant;
  sm?: boolean;
};

const CoreCharge = ({ variant, sm = false }: CoreChargeProps) => {
  if (!variant || !variant.coreCharge?.amount || variant.waiverAvailable) return null;

  const coreChargeDisplay = (
    <Price amount={variant.coreCharge.amount} currencyCode={variant.price.currencyCode} />
  );

  const originalPrice = String(Number(variant.price.amount) - Number(variant.coreCharge.amount));

  return (
    <div className="flex items-center gap-2 rounded-md bg-gray-100 px-3 py-1 text-sm">
      <ArrowPathIcon className="h-3 w-3" />
      <span
        className="flex items-center gap-1"
        data-tooltip-id={!sm ? 'core-charge-explanation' : undefined}
      >
        {sm ? coreChargeDisplay : <>Core Charge: {coreChargeDisplay}</>}
      </span>
      <Tooltip id="core-charge-explanation" className="z-20 max-w-72">
        <p className="flex flex-wrap items-center gap-1 text-sm">
          The core charge of {coreChargeDisplay} is a refundable deposit that is added to the price
          of the part.
        </p>
        <p className="text-sm">
          This charge ensures that the old, worn-out part is returned to the supplier for proper
          disposal or recycling.
        </p>
        <p className="flex flex-wrap items-center gap-1 text-sm">
          When you return the old part, you&apos;ll receive a refund of the core charge, making the
          final price of the part
          <Price amount={originalPrice} currencyCode={variant.price.currencyCode} />
        </p>
      </Tooltip>
    </div>
  );
};

export default CoreCharge;
