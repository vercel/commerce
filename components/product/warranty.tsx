import { ShieldCheckIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import WarrantySelector from './warranty-selector';

type WarrantyProps = {
  productType: string | null;
};

const Warranty = ({ productType }: WarrantyProps) => {
  return (
    <div className="flex flex-col text-sm">
      <div className="mb-3 flex flex-row items-center space-x-2 text-base font-medium">
        <ShieldCheckIcon className="h-7 w-7" />
        <span> Protect your {productType ?? 'product'}</span>
      </div>
      <div className="mb-1 flex flex-row items-center space-x-3 divide-x divide-gray-400 leading-none">
        <span>Extended Warranty</span>
        <Link href="#" className="pl-2 text-blue-800 hover:underline">
          What&apos;s Included
        </Link>
        <Link href="#" className="pl-2 text-blue-800 hover:underline">
          Terms & Conditions
        </Link>
      </div>
      <WarrantySelector />
    </div>
  );
};

export default Warranty;
