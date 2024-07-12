'use client';

import { ShieldCheckIcon } from '@heroicons/react/24/outline';
import SideDialog from 'components/side-dialog';
import { Product, ProductVariant } from 'lib/shopify/types';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import WarrantySelector from './warranty-selector';

const Warranty = ({ product }: { product: Product }) => {
  const searchParams = useSearchParams();

  const [openingDialog, setOpeningDialog] = useState<'included' | 'terms-conditions' | null>(null);
  const optionSearchParams = new URLSearchParams(searchParams);

  const selectedVariant = product.variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every(
      (option) => option.value === optionSearchParams.get(option.name.toLowerCase())
    )
  );

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
            title="Warranty for Remanufactured Engines"
            onClose={() => setOpeningDialog(null)}
            open={openingDialog === 'included'}
          >
            <section>
              <p className="mb-2 text-sm">
                Car Part Planet warrants remanufactured engine parts to be free of defects in any
                parts/materials and workmanship for the warranty period indicated from the date of
                installation, assuming the part was (and can be documented as) installed by a
                Licensed Automotive Repair Facility.
              </p>
            </section>

            <section>
              <p className="mb-1 mt-2 text-sm font-semibold">Gasoline Engines</p>
              <p className="text-sm">
                Gas engines that come standard in small automobiles and trucks up to 11,000 gross
                volume weight.
              </p>
            </section>

            <section>
              <p className="mb-1 mt-2 text-sm font-semibold">Year 2000 and Older</p>
              <p className="text-sm">
                3-years / unlimited mileage, $50/ hour labor reimbursement rate. Parts and labor are
                paid only upon inspected and approved claims.
              </p>
            </section>

            <section>
              <p className="mb-1 mt-2 text-sm font-semibold">Year 2001 and Newer</p>
              <p className="text-sm">
                5-years / unlimited mileage, $50/ hour labor reimbursement rate. Parts and labor are
                paid only on approved claims after factory inspection. Purchases made prior to
                January 1, 2018, carry a warranty of 3 years with unlimited mileage. A first-time
                part replacement is free.
              </p>
            </section>

            <section>
              <p className="mb-1 mt-2 text-sm font-semibold">
                Gas Engines in Fleet Vehicles and Small Trucks
              </p>
              <p className="text-sm">
                3-years / 75,000 miles, $50/ hour labor reimbursement rate. Parts and labor are paid
                only on inspected and approved claims. First-time part replacement is free.
              </p>
            </section>

            <section>
              <p className="mb-1 mt-2 text-sm font-semibold">
                Gas Engines Large Trucks (more than 11,000 G.V.W.)
              </p>
              <p className="text-sm">
                12 months / 12,000 miles, $50/ hour Mitchell labor reimbursement rate is only on
                inspected and approved claims. First-time part replacement is FREE.
              </p>
            </section>

            <section>
              <p className="mb-1 mt-2 text-sm font-semibold">
                Diesel Engines (Vehicles exceeding 11,000 G.V.W.)
              </p>
              <p className="text-sm">
                12 months / 12,000 miles, $50/ hour Mitchell labor reimbursement rate is only on
                inspected and approved claims. First-time part replacement is FREE.
              </p>
            </section>

            <section>
              <p className="mb-1 mt-2 text-sm font-semibold">Marine Engines</p>
              <p className="text-sm">
                18 months / unlimited hours, $50/ hour is the warranty labor reimbursement rate with
                a cap of $800;
              </p>
            </section>

            <section className="mt-5">
              <p className="mb-2 text-sm">
                If it is determined that the part must be replaced, the original part must be
                returned before any warranty claims will be paid out.
              </p>
              <p className="text-sm">
                Please visit our warranty page at https://carpartplanet.com/warranty-info for our
                full warranty disclosure.
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
      <WarrantySelector />
    </div>
  );
};

export default Warranty;
