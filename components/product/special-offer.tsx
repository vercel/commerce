import { CurrencyDollarIcon, ShieldCheckIcon, UsersIcon } from '@heroicons/react/24/outline';
import { TruckIcon } from '@heroicons/react/24/solid';

const SpecialOffer = () => {
  return (
    <>
      <div className="mb-3 text-base font-medium tracking-tight">Special Offers</div>
      <div className="flex flex-col space-y-2 pl-2 tracking-normal text-neutral-800">
        <p className="flex items-center gap-3">
          <TruckIcon className="h-5 w-5 text-secondary" /> Flat Rate Shipping (Commercial Address)
        </p>
        <p className="flex items-center gap-3">
          <ShieldCheckIcon className="h-5 w-5 text-secondary" /> Up to 5 Years Unlimited Miles
          Warranty
        </p>
        <p className="flex items-center gap-3">
          <UsersIcon className="h-5 w-5 text-secondary" /> Excellent Customer Support
        </p>
        <p className="flex items-center gap-3">
          <CurrencyDollarIcon className="h-5 w-5 text-secondary" /> No Core Charge for 30 days
        </p>
      </div>
    </>
  );
};

export default SpecialOffer;
