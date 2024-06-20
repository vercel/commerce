import {
  ArrowPathIcon,
  CurrencyDollarIcon,
  ShieldCheckIcon,
  StarIcon,
  TruckIcon,
  UsersIcon
} from '@heroicons/react/24/outline';

const SpecialOffer = () => {
  return (
    <div className="mt-10 grid grid-cols-2 gap-y-5 xl:grid-cols-3">
      <div className="flex items-start gap-3">
        <TruckIcon className="size-12 text-primary" />
        <div className="flex flex-col">
          <span className="font-medium uppercase">Flat Rate Shipping</span>
          <span className="text-sm font-light">
            We offer a flat $299 shipping fee to commercial addresses
          </span>
        </div>
      </div>
      <div className="flex items-start gap-3">
        <CurrencyDollarIcon className="size-10 text-primary" />
        <div className="flex flex-col">
          <span className="font-medium uppercase">Best Price Guarantee</span>
          <span className="text-sm font-light">
            We will match or beat any competitor&apos;s pricing
          </span>
        </div>
      </div>
      <div className="flex items-start gap-3">
        <ShieldCheckIcon className="size-8 text-primary" />
        <div className="flex flex-col">
          <span className="font-medium uppercase">Unbeatable Warranty</span>
          <span className="text-sm font-light">Up to 5 years with unlimited miles</span>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <UsersIcon className="size-10 text-primary" />
        <div className="flex flex-col">
          <span className="font-medium uppercase">Excellent Support</span>
          <span className="text-sm font-light">
            End-to-end, expert care from our customer service team
          </span>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <ArrowPathIcon className="size-10 text-primary" />
        <div className="flex flex-col">
          <span className="font-medium uppercase">Core Charge Waiver</span>
          <span className="text-sm font-light">
            Avoid the core charge by returning within 30 days
          </span>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <StarIcon className="size-10 text-primary" />
        <div className="flex flex-col">
          <span className="font-medium uppercase">Free Core Return</span>
          <span className="text-sm font-light">
            Unlike competitors, we pay for the return of your core
          </span>
        </div>
      </div>
    </div>
  );
};

export default SpecialOffer;
