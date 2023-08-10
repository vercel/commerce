import { UserCircleIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function OpenUserMenu({ className }: { className?: string }) {
  return (
    <div className="relative flex h-10 w-10 items-center justify-center text-high-contrast">
      <UserCircleIcon
        className={clsx(
          'h-5 stroke-current transition-all ease-in-out hover:scale-110 ',
          className
        )}
      />
    </div>
  );
}
