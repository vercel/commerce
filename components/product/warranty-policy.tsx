import {
  ArrowPathIcon,
  ArrowsRightLeftIcon,
  CurrencyDollarIcon,
  FlagIcon
} from '@heroicons/react/24/outline';
import DisclosureSection from './disclosure-section';

const { SITE_NAME } = process.env;

const WarrantyPolicy = () => {
  return (
    <DisclosureSection title="Warranty">
      <div className="mb-3 font-medium">Year 2001 and Newer</div>
      <div className="flex items-center p-1">
        <span className="basis-1/2">Personal/Individual Transmission Warranty</span>
        <span>60 Months/ Unlimited Mileage</span>
      </div>
      <div className="flex items-center bg-gray-100 p-1">
        <span className="basis-1/2">Commercial Transmissions Warranty</span>
        <span>Prior to 03/01/2020 18 Months/ 100,000 Miles</span>
      </div>
      <div className="flex items-center p-1">
        <span className="basis-1/2">Commercial Transmissions Warranty</span>
        <span>Effective 03/01/2020 36 Months/ Unlimited Mileage</span>
      </div>
      <div className="flex items-center bg-gray-100 p-1">
        <span className="basis-1/2">Continuously Variable Transmission (CVT) Warranty</span>
        <span>36 Months/ Unlimited Mileage</span>
      </div>
      <div className="flex items-center p-1">
        <span className="basis-1/2">Manual Transmission Warranty</span>
        <span>36 Months/ Unlimited Miles</span>
      </div>
      <div className="my-3 font-medium">Year 2000 and Older</div>
      <div className="flex items-center p-1">
        <span className="basis-1/2">Personal/Individual Transmission Warranty</span>
        <span>36 Months/ Unlimited Mileage</span>
      </div>
      <div className="flex items-center bg-gray-100 p-1">
        <span className="basis-1/2">Commercial Transmissions Warranty</span>
        <span>18 Months/ 100,000 Miles</span>
      </div>
      <div className="flex items-center p-1">
        <span className="basis-1/2">Commercial Transmissions Warranty</span>
        <span>36 Months/ Unlimited Mileage</span>
      </div>
      <div className="flex items-center bg-gray-100 p-1">
        <span className="basis-1/2">Continuously Variable Transmission (CVT) Warranty</span>
        <span>36 Months/ Unlimited Miles</span>
      </div>
      <div className="my-5">
        <div className="mb-1 flex items-center gap-2 font-medium">
          <ArrowsRightLeftIcon className="size-4 text-primary" />
          Easy, Hassle-Free, Transferable Warranty
        </div>
        <p>
          At {SITE_NAME}, we offer an easy, transferable, hassle-free warranty. Instead of being
          associated only with you, the warranty is attached to your Vehicle Identification Number.
          As such, the warranty is transferable with vehicle ownership, which means you never have
          to worry about any paperwork or fees involved. Please note, that the used parts warranty
          is not transferable.
        </p>
      </div>
      <div className="my-5">
        <div className="mb-1 flex items-center gap-2 font-medium">
          <FlagIcon className="size-4 text-primary" />
          Nationwide Coverage
        </div>
        <p>
          Whether you&apos;re in California, Chicago, New York, Florida, or anywhere in between, you
          are covered with a nationwide warranty. This warranty covers you anywhere in the
          continental U.S.
        </p>
      </div>
      <div className="my-5">
        <div className="mb-1 flex items-center gap-2 font-medium">
          <ArrowPathIcon className="size-4 text-primary" />
          Instant Replacement
        </div>
        <p>
          With instant replacement, your replacement transmission will be sent out as soon as you
          submit your claim. This way you can spend less time waiting and more time doing whatever
          needs to be done.
        </p>
      </div>

      <div className="my-5">
        <div className="mb-1 flex items-center gap-2 font-medium">
          <CurrencyDollarIcon className="size-4 text-primary" />
          Paid Parts & Labor
        </div>
        <p>
          When you have your work performed in a certified shop, your {SITE_NAME} warranty will pay
          for parts and labor at $50 an hour, which is the Mitchell labor reimbursement rate.
        </p>
      </div>
    </DisclosureSection>
  );
};

export default WarrantyPolicy;
