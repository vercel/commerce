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
              <p className="mb-1 mt-5 text-sm font-semibold">WHAT DOES “NO HASSLE” MEAN?</p>
              <p className="text-sm">
                Transferrable
                <br />
                The warranty is attached to the VIN and fully transferrable with vehicle ownership;
                no fees or paperwork involved.
                <br />
                <br />
                Nationwide Coverage
                <br />
                You are covered anywhere (and everywhere) in the continental United States.
                <br />
                <br />
                Instant Replacement
                <br />
                We send out a replacement transmission as soon as a warranty claim is submitted so
                you are back on the road as quickly as possible.
                <br />
                <br />
                Paid Parts & Labor
                <br />
                For warranty work done in a certifed shop, we pay parts and labor. Authorized
                repairs on approved claims (after factory inspection of returned parts) will be
                reimbursed at a rate not to exceed the Mitchell Repair Manual published applicable
                fat rate schedule. Hourly rates for all authorized repairs will be paid in
                accordance with rate but not to exceed $50.00 an hour. Do-it yourself repairs,
                repairs performed by unlicensed repair facilities, or repairs made to units not
                originally installed by licensed auto repair facility, labor will not be reimbursed.
              </p>
            </section>

            <section>
              <p className="mb-2 mt-2 text-sm">
                {siteName} is not responsible for any charges associated with improper transmission
                installation and or labor costs.
                <br />
                {siteName} will not assume towing, shipping, transportation charges or rental car
                costs Modifed vehicles will have no warranty coverage. If return or exchange was
                authorized by {siteName}, the part needs to be received in the same assembled
                condition as it was originally shipped to the customer.
              </p>
            </section>

            <section>
              <p className="mb-2 mt-2 text-sm">
                {siteName} warrants remanufactured parts to be free of defects in any
                parts/materials and workmanship for the warranty period indicated from the date of
                installation, assuming the part was (and can be documented as) installed by a
                Licensed Automotive Repair Facility.
              </p>
            </section>

            <section>
              <h2 className="mb-2 mt-4 font-bold">Remanufactured Engines</h2>
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
                paid only upon inspected and approved claims.
              </p>
            </section>

            <section>
              <p className="mb-1 mt-2 text-sm font-semibold">Year 2001 and Newer</p>
              <p className="text-sm">
                5-years / unlimited mileage, $50/hour labor reimbursement rate. Parts and labor are
                paid only on approved claims after factory inspection. Purchases made prior to
                January 1, 2018, carry a warranty of 3 years with unlimited mileage. A first-time
                part replacement is free.
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
                approved claims. First-time part replacement is FREE.
              </p>
            </section>

            <section>
              <p className="mb-1 mt-2 text-sm font-semibold">
                Diesel Engines (Vehicles exceeding 11,000 G.V.W.)
              </p>
              <p className="text-sm">
                12 months / 12,000 miles, $50/hour labor reimbursement rate is only on inspected and
                approved claims. First-time part replacement is FREE.
              </p>
            </section>

            <section>
              <p className="mb-1 mt-2 text-sm font-bold">Marine Engines</p>
              <p className="text-sm">
                18 months / unlimited miles. $50/hour labor reimbursement rate with a cap of $800.
              </p>
            </section>

            <section>
              <h2 className="mb-2 mt-4 font-bold">Used Engines</h2>
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
              <p className="mb-2 text-sm">
                We guarantee that any used engine sold engine sold by {siteName} shall be free from
                knocking, excessive oil consumption and cracks in the block, and is subject to the
                following terms and conditions.
              </p>
            </section>

            <section>
              <h2 className="mb-2 mt-4 font-bold">Remanufactured Transmissions</h2>
            </section>

            <section>
              <p className="text-sm">
                A remanufactured and improved torque converter is included with every transmission.
                To eliminate the possibility of front seal leaks, vibration, and premature bushing
                wear, all torque converters are tested for leaks, lock-up, concentricity, and
                balance. Every fully remanufactured valve body, with complete system correction and
                recalibration kit, is tested independently. All wear-prone valves are restored to
                stringent specifcations and vacuum tested to confrm proper function. Each
                remanufactured transmission is hot, cold, load, and simulated road tested using our
                proprietary CARS (Computer-Aided Road Simulation) dynamometer program. All
                remanufactured transmissions are backed by the industry&apos;s best, no-hassle
                nationwide warranty. Warranty claim reimbursement cannot exceed the total cost of
                the part purchased.
              </p>
            </section>

            <section>
              <p className="mb-1 mt-2 text-sm font-semibold">Year 2000 and Older</p>
              <p className="text-sm">
                Personal: 36 Months/Unlimited Miles
                <br />
                Commercial: 18 Months/100,000 Miles <br />
                CVT Transmissions: 36 Months/Unlimited Miles <br />
                Manual Transmissions: 36 Months/Unlimited Miles
              </p>
            </section>

            <section>
              <p className="mb-1 mt-2 text-sm font-semibold">Year 2001 and Newer</p>
              <p className="text-sm">
                Personal: 60 Months/Unlimited Miles <br />
                Commercial:
                <br />
                Prior to 3/1/2020 18 Months/100,000 Miles
                <br />
                After 3/1/2020 36 Months/Unlimited miles
                <br />
                CVT Transmissions: 36 Months/Unlimited Miles
                <br />
                Manual Transmissions: 36 Months/Unlimited Miles
              </p>
            </section>

            <section>
              <h2 className="mb-2 mt-4 font-bold">Used Transmissions</h2>
            </section>

            <section>
              <p className="text-sm">
                {siteName}&apos;s used transmission warranty is limited to manufacturing defects of
                the following parts: transmission housing, torque converter (included for automatic
                transmissions) and all internal components, including gears and shafts. The warranty
                does not cover any external wiring, sensors, or other external parts that can be
                transferred from your current transmission. {siteName} warranty does not cover any
                attached accessory parts, such as switches, sensors, cables, electronics etc.
              </p>
            </section>

            <section>
              <p className="mb-1 mt-2 text-sm font-semibold">Year 2000 and Older</p>
              <p className="text-sm">
                Personal: 6 Months/ 6,000 miles (parts only)
                <br />
                Commercial: 6 Months/ 6,000 miles (parts only)
                <br />
                CVT Transmissions: 6 Months/ 6,000 miles (parts only)
                <br />
                Manual Transmissions: 6 Months/ 6,000 miles (parts only)
              </p>
            </section>

            <section>
              <p className="mb-1 mt-2 text-sm font-semibold">Years 2001 and Newer</p>
              <p className="text-sm">
                Personal: 1 Year/ 12,000 miles (parts only)
                <br />
                Commercial: 6 Months/ 6,000 miles (parts only)
                <br />
                CVT Transmissions: 6 Months/ 6,000 miles (parts only)
                <br />
                Manual Transmissions: 6 Months/ 6,000 miles (parts only)
              </p>
            </section>

            <section>
              <p className="mb-1 mt-2 text-sm font-semibold">WHAT IS NOT COVERED</p>
              <p className="text-sm">
                Normal Wear: Like all mechanical devices, these parts need periodic parts service
                and replacement to perform correctly.
                <br />
                Our warranty would not apply if damage to the product has occurred because of
                misuse, lack of routine maintenance, shipping, handling, ware-housing or improper
                installation.
              </p>
            </section>

            <section>
              <p className="mb-1 mt-2 text-sm font-semibold">WARRANTY WILL BE VOID IF:</p>
              <p className="text-sm">
                Part was not properly installed.
                <br />
                Part was used for racing.
                <br />
                Repair or replacement required as a result of any accident or misuse.
                <br />
                Transmission was used without proper lubrication or cooling regardless of the
                reason.
                <br />
                Engine is damaged as a result of overheating or lack of lubrication.
                <br />
                Part has been repaired or remodeled to which any part or accessory is not conforming
                to original manufacturer specifications has been installed.
                <br />
                Engine is returned with the heat tabs missing or melted.
                <br />
                {siteName} will not assume towing, shipping, lodging, transportation charges or
                rental car costs.
                <br />
                Falsifying any information will automatically void your warranty.
                <br />
                The mileage stated is approximate whenever is available to the best of our
                knowledge.
                <br />
                {siteName} warranty does not apply to oil leaks/damage on engines due to seals,
                gaskets and flters that has not been replaced.
                <br />
                If the engine was disassembled or altered in any way without {siteName} written
                authorization the warranty will be void.
                <br />
                The part is not installed within 30 days after delivery.
                <br />
                Used transmission warranty will cover only a one-time claim per product purchased
                from us.
                <br />
                The serial number of the product has been removed. If the part is not received in
                the same condition there will be absolutely NO REFUND under any circumstances.
                <br />
                If transmission was disassembled or altered in any way without {siteName} written
                authorization the warranty will be void.
                <br />
                If core is not returned or paid for, warranty will be voided.
              </p>
            </section>

            <section>
              <p className="text-sm">
                Vehicle needs be be at the repair facility at the time the warranty is filed.
                {siteName} warranty does not apply for an initial installation.
                {siteName} warranty claim must be submitted and authorized by
                {siteName} warranty technician prior to any work being performed. Purchaser needs to
                submit documentation, as required within 5 business days, otherwise your claim will
                be denied, no exceptions. <br />
                Vehicle use shall be immediately discontinued once the issue or problem has been
                identified, otherwise warranty will be void.
              </p>
            </section>

            <section>
              <p className="mb-1 mt-2 text-sm font-semibold">Limited Liability</p>
              <p className="text-sm">
                The {siteName} liability is solely and exclusively limited to supplying a
                replacement part whenever one is available or refunding customer with purchase
                price. Warranty claim reimbursement cannot exceed the total cost of the part
                purchased. {siteName} warranty is limited to a one-time replacement. {siteName}{' '}
                warrants the original purchaser only. We reserve the right to charge any applicable
                fees in connection with processing your warranty claim.
              </p>
            </section>

            <section>
              <p className="text-sm">
                {siteName} does not assume any liability associated with labor costs, replacement of
                engine oil, transmission fuid and antifreeze, or damage to other engine or
                transmission parts or components towing charges, telephone calls, freight, lost
                profts, lost time, substitute transportation or replacement vehicle or any other
                consequential damages. {siteName} assumes no responsibility for any failure
                resulting from improper installation, modifcation of the product faulty or
                incompatible parts and accessories and/or abnormal use of operation. State and
                federal laws regulate odometer mileage for most used automobiles, but odometer
                mileage determinations for used engines, transmissions and their parts are not
                practically possible. Determination of mileage use for used engines cannot be done
                with certainty since the engines are often sold and/or transferred apart from the
                original vehicle in which they were originally installed. Therefore all
                representations of mileage are estimates.
              </p>
            </section>

            <section>
              <p className="text-sm">
                In the event that it is determined that the part must be replaced, the original part
                must be returned to the remanufacturing facility before any warranty labor
                consideration and reimbursement. You must save your proof of purchase receipt. If
                you are not able to provide proof of the original purchase date at the time of
                warranty service, the manufacturing date of the product will be used to determine
                the warranty period. Warranty claim reimbursement cannot exceed the total cost of
                the part purchased.
              </p>
            </section>

            <section>
              <p className="text-sm">
                {siteName} offers an extensive engine and transmission warranty regardless of the
                mileage, based upon our expertise and evaluation of our products. Extended
                warranties are also available at the additional cost. Contact our customer service
                department for details.
              </p>
            </section>

            <section className="mt-5">
              <p className="mb-2 text-sm">
                {siteName} warranty claim representative will work with you to ensure your
                experience is a complete success. We reserve the right to charge any applicable fees
                in connection with processing of your warranty claim. Used transmission warranty is
                for the original purchaser only and is not transferrable. If it is determined that
                the part must be replaced, the original part must be returned before any warranty
                claims will be paid out.
              </p>
              <p className="text-sm">
                Please visit our{' '}
                <Link href="/warranty-info" target="_blank" className="text-blue-800 underline">
                  warranty page
                </Link>{' '}
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
