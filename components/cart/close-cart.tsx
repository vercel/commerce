import { XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function CartIcon({ className }: { className?: string }) {
  return (
    <div className="relative flex h-11 w-11 items-center justify-center rounded-md border border-gray-200 text-black transition-colors dark:border-gray-700 dark:text-white">
      <XMarkIcon className={clsx('h-6 transition-all ease-in-out hover:scale-110 ', className)} />
    </div>
  );
}
