import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function OpenSearch({ className }: { className?: string }) {
  return (
    <div className="relative flex h-8 w-8 items-center justify-center text-high-contrast lg:h-11 lg:w-11">
      <MagnifyingGlassIcon
        className={clsx('h-5 transition-all ease-in-out hover:scale-110 ', className)}
      />
    </div>
  );
}
