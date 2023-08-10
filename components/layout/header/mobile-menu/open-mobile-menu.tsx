import { Bars3Icon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function OpenMobileMenu({ className }: { className?: string }) {
  return (
    <div className="relative flex h-11 w-11 items-center justify-center text-high-contrast">
      <Bars3Icon
        className={clsx(
          'h-5 stroke-current transition-all ease-in-out hover:scale-110 ',
          className
        )}
      />
    </div>
  );
}
