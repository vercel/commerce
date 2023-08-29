import { cn } from '@/lib/utils';
import { UserCircleIcon } from '@heroicons/react/24/outline';

export default function OpenUserMenu({ className }: { className?: string }) {
  return (
    <div className="relative flex h-8 w-8 items-center justify-center text-high-contrast lg:h-11 lg:w-11">
      <UserCircleIcon
        className={cn('h-5 stroke-current transition-all ease-in-out hover:scale-110 ', className)}
      />
    </div>
  );
}
