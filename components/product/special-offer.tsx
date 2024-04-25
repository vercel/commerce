import { CurrencyDollarIcon, ShieldCheckIcon, UsersIcon } from '@heroicons/react/24/outline';
import { TruckIcon } from '@heroicons/react/24/solid';

const SpecialOffer = () => {
  return (
    <>
      <div className="mb-3 text-base font-medium tracking-tight">Special Offers</div>
      <div className="flex flex-col space-y-2 pl-2 text-sm tracking-normal text-neutral-800 lg:text-base dark:text-white">
        <p className="flex items-center gap-3">
          <TruckIcon className="h-4 w-4 text-secondary lg:h-5 lg:w-5" /> Flat Rate Shipping
          (Commercial Address)
        </p>
        <p className="flex items-center gap-3">
          <ShieldCheckIcon className="h-4 w-4 text-secondary lg:h-5 lg:w-5" /> Up to 5 Years
          Unlimited Miles Warranty
        </p>
        <p className="flex items-center gap-3">
          <UsersIcon className="h-4 w-4 text-secondary lg:h-5 lg:w-5" /> Excellent Customer Support
        </p>
        <p className="flex items-center gap-3">
          <CurrencyDollarIcon className="h-4 w-4 text-secondary lg:h-5 lg:w-5" /> No Core Charge for
          30 days
        </p>
      </div>
    </>
  );
};

export default SpecialOffer;
