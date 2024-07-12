'use client';

import { ShieldCheckIcon } from '@heroicons/react/24/outline';
import SideDialog from 'components/side-dialog';
import { Product, ProductVariant } from 'lib/shopify/types';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import WarrantySelector from './warranty-selector';

const Warranty = ({ product, siteName }: { product: Product; siteName: string | undefined }) => {
  const searchParams = useSearchParams();

  const [openingDialog, setOpeningDialog] = useState<'included' | 'terms-conditions' | null>(null);
  const optionSearchParams = new URLSearchParams(searchParams);

  const selectedVariant = product.variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every(
      (option) => option.value === optionSearchParams.get(option.name.toLowerCase())
    )
  );

  const warrantyYears = selectedVariant?.warranty_years || '3';

  return (
    <div className="flex flex-col text-xs lg:text-sm">
      <div className="mb-3 flex flex-row items-center space-x-1 divide-x divide-gray-400 leading-none lg:space-x-3">
        <div className="flex flex-row items-center space-x-2 text-base font-medium">
          <ShieldCheckIcon className="h-5 w-5" />
          <span>Warranty</span>
        </div>
        <div className="pl-2">
          <button
            onClick={() => setOpeningDialog('included')}
            className="text-xs text-blue-800 hover:underline lg:text-sm"
          >
            What&apos;s Included
          </button>
          <SideDialog
            title="Warranty Details"
            onClose={() => setOpeningDialog(null)}
            open={openingDialog === 'included'}
          >
            <section>
              <h3>Remanufactured Engines</h3>
            </section>

            <section>
              <p className="mb-2 text-sm">
                {siteName} warrants remanufactured engine parts to be free of defects in any
                parts/materials and workmanship for the warranty period indicated from the date of
                installation, assuming the part was (and can be documented as) installed by a
                Licensed Automotive Repair Facility.
              </p>
            </section>

            <section>
              <p className="mb-1 mt-2 text-sm font-bold">Gasoline Engines</p>
              <p className="text-sm">
                Gas engines installed in non-fleet or commercial automobiles and light trucks up to
                11,000 GVW.
              </p>
            </section>

            <section>
              <p className="mb-1 mt-2 text-sm font-semibold">Year 2000 and Older</p>
              <p className="text-sm">
                3-years / unlimited mileage, $50/hour labor reimbursement rate. Parts and labor are
                paid only upon inspected and approved claims. Warranty claim reimbursement cannot
                exceed the total cost of the part purchased.
              </p>
            </section>

            <section>
              <p className="mb-1 mt-2 text-sm font-semibold">Year 2001 and Newer</p>
              <p className="text-sm">
                5-years / unlimited mileage, $50/hour labor reimbursement rate. Parts and labor are
                paid only on approved claims after factory inspection. Purchases made prior to
                January 1, 2018, carry a warranty of 3 years with unlimited mileage. A first-time
                part replacement is free. Warranty claim reimbursement cannot exceed the total cost
                of the part purchased.
              </p>
            </section>

            <section>
              <p className="mb-1 mt-2 text-sm font-semibold">
                Gas Engines in Commercial Fleet Vehicles and Light Trucks
              </p>
              <p className="text-sm">
                3-years / 75,000 miles, $50/hour labor reimbursement rate. Parts and labor are paid
                only on inspected and approved claims. First-time part replacement is free. Warranty
                claim reimbursement cannot exceed the total cost of the part purchased.
              </p>
            </section>

            <section>
              <p className="mb-1 mt-2 text-sm font-semibold">
                Gas Engines in Medium/Heavy Duty Trucks (exceeding 11,000 GVW)
              </p>
              <p className="text-sm">
                12 months / 12,000 miles, $50/hour labor reimbursement rate is only on inspected and
                approved claims. First-time part replacement is FREE. Warranty claim reimbursement
                cannot exceed the total cost of the part purchased.
              </p>
            </section>

            <section>
              <p className="mb-1 mt-2 text-sm font-semibold">
                Diesel Engines (Vehicles exceeding 11,000 G.V.W.)
              </p>
              <p className="text-sm">
                12 months / 12,000 miles, $50/hour labor reimbursement rate is only on inspected and
                approved claims. First-time part replacement is FREE. Warranty claim reimbursement
                cannot exceed the total cost of the part purchased.
              </p>
            </section>

            <section>
              <p className="mb-1 mt-2 text-sm font-bold">Marine Engines</p>
              <p className="text-sm">
                18 months / unlimited miles. $50/hour labor reimbursement rate with a cap of $800.
                In the event that it is determined that the part must be replaced, the original part
                must be returned to the remanufacturing facility before any warranty labor
                consideration and reimbursement. You must sae your proof of purchase receipt. If
                you're not able to provide proof of the original purchase date at the time of
                warranty service, the manufacturing date of the product will be used to determine
                the warranty period. Warranty claim reimbursement cannot exceed the total cost of
                the part purchased.
              </p>
            </section>

            <section>
              <p className="mb-1 mt-2 text-sm font-semibold">WHAT IS NOT COVERED</p>
              <p className="text-sm">
                Normal Wear: Remanufactured engine products, like all mechanical devices, need
                periodic parts service and replacement to perform correctly. Our warranty would not
                apply if damage to the product has occurred because of misuse, lack of routine
                maintenance, shipping, handling, ware-housing or improper installation. Similarly,
                warranty is void if the serial number of the product has been removed or the product
                has been altered or modified with aftermarket performance enhancing parts.
              </p>
            </section>

            <section>
              <p className="mb-1 mt-2 text-sm font-semibold">WARRANTY WILL BE VOID IF:</p>
              <p className="text-sm">
                Engine was not properly installed. Engine was used for racing. Engine was used
                without proper lubrication or cooling regardless of reason. Engine is not installed
                within 30 days after delivery. Warranty will cover only a one-time claim per product
                purchased from us. Our warranty claim representative will work with you to ensure
                your eperience is a complete success. We reserve the right to charge any applicable
                fees in connection with processing your warranty claim.
                {siteName} warrants the original purchaser only. We guarantee that any used engine
                sold engine sold by {siteName} shall be free from knocking, excessive oil
                consumption and cracks in the block, and is subject to the following terms and
                conditions.
              </p>
            </section>

            <section>
              <h3>Used Engines</h3>
            </section>

            <section>
              <p className="mb-1 mt-2 text-sm font-semibold">Used Engine Definition</p>
              <p className="text-sm">
                The term used engine shall mean, a used engine assembly (basic block, cylinder heads
                and internal components) supplied by {siteName} of the original manufacturer. All
                other accessories attached, left on the block for the convenience purposes only and
                are not guaranteed or warrantied. Subject to the limitations listed below,{' '}
                {siteName} at its discretion will either send a re-placement engine of the same kind
                that is available at the time or refund the customer purchase price if the engine is
                defective and no replacement is available. {siteName} will not be responsible for
                any labor cost incurred by the customer, unless prior agreement is made.
              </p>
            </section>

            <section>
              <p className="mb-1 mt-2 text-sm font-semibold">Warranty Limitations</p>
              <p className="text-sm">
                {siteName} warranty applies to the used engines ONLY. This warranty will not apply
                if: Repair or replacement required as a result of any accident or misuse. Repair or
                replacement of any engine, including specifcally, without limitation, to all
                components of the cooling, fuel, electrical, engine control system, and all ignition
                system components, belts, hoses and flters. Engine was used for competition racing
                or related purposes. Engine has been repaired or remodeled to which any part or
                accessory is not conforming to original manufacturer specifications has been
                installed. Engine is damaged as a result of overheating or lack of lubrication.
                Engine is returned with the heat tabs missing or melted.
                {siteName} warranty does not apply for an initial installation.
                {siteName} warranty is limited to one-time replacement. Warranty reimbursement
                cannot exceed the purchase price.
                {siteName} warranty claim must be submitted and authorized by {siteName} warranty
                technician prior to any work being performed. Purchaser needs to submit
                documentation, as required within 5 business days, otherwise your claim will be
                denied, no exceptions. Vehicle use shall be immediately discontinued once the issue
                or problem has been identifed, otherwise warranty will be void.
              </p>
            </section>

            <section>
              <p className="mb-1 mt-2 text-sm font-semibold">Limited Liability</p>
              <p className="text-sm">
                The {siteName} liability is solely and exclusively limited to supplying a
                replacement engine whenever one is available or refunding customer with purchase
                price. {siteName} does not assume any liability associated with labor costs,
                replacement of engine oil, transmission fuid and antifreeze, or damage to other
                engine or transmission parts or components towing charges, telephone calls, freight,
                lost profts, lost time, substitute transportation or replacement vehicle or any
                other consequential damages. RE assumes no responsibility for any failure resulting
                from improper installation, modifcation of the product faulty or incompatible parts
                and accessories and/or abnormal use of operation. State and federal laws regulate
                odometer mileage for most used automobiles, but odometer mileage determinations for
                used engines, transmissions and their parts are not practically possible.
                Determination of mileage use for used engines cannot be done with certainty since
                the engines are often sold and/or transferred apart from the original vehicle in
                which they were originally installed. Therefore all representations of mileage are
                estimates.
                {siteName} offers an extensive engine and transmission warranty regardless of the
                mileage, based upon our expertise and evaluation of our products. Extended
                warranties are also available at the additional cost. Contact our customer service
                department for details.
              </p>
            </section>

            <section className="mt-5">
              <p className="mb-2 text-sm">
                If it is determined that the part must be replaced, the original part must be
                returned before any warranty claims will be paid out.
              </p>
              <p className="text-sm">
                Please visit our
                <Link
                  href="/warranty-info"
                  target="_blank"
                  className="text-blue-800 hover:underline"
                >
                  warranty page
                </Link>
                for our full warranty disclosure.
              </p>
            </section>
          </SideDialog>
        </div>
        <div className="pl-2">
          <Link
            href="/warranty-info"
            target="_blank"
            className="text-xs text-blue-800 hover:underline lg:text-sm"
          >
            Terms & Conditions
          </Link>
        </div>
      </div>
      <WarrantySelector years={warrantyYears} />
    </div>
  );
};

export default Warranty;
