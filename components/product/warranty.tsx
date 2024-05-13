import { ShieldCheckIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import WarrantySelector from './warranty-selector';

const Warranty = () => {
  return (
    <div className="flex flex-col text-xs lg:text-sm">
      <div className="mb-3 flex flex-row items-center space-x-1 divide-x divide-gray-400 leading-none lg:space-x-3">
        <div className="flex flex-row items-center space-x-2 text-base font-medium">
          <ShieldCheckIcon className="h-5 w-5" />
          <span>Warranty</span>
        </div>
        <div className="pl-2">
          <Link href="#" className="text-xs text-blue-800 hover:underline lg:text-sm">
            What&apos;s Included
          </Link>
        </div>
        <div className="pl-2">
          <Link href="#" className="text-xs text-blue-800 hover:underline lg:text-sm">
            Terms & Conditions
          </Link>
        </div>
      </div>
      <WarrantySelector />
    </div>
  );
};

export default Warranty;
