import { CheckCircleIcon } from '@heroicons/react/24/solid';

const WarrantyActivatedBadge = () => {
  return (
    <span className="inline-flex items-center gap-x-2 rounded-md bg-green-50 px-2.5 py-2 text-sm font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
      <CheckCircleIcon className="h-5 w-5 text-green-500" aria-hidden="true" />
      Warranty Activated
    </span>
  );
};

export default WarrantyActivatedBadge;
