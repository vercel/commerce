import { cn } from '@/lib/utils';
import { Bars3Icon } from '@heroicons/react/24/outline';

export default function OpenMobileMenu({ className }: { className?: string }) {
  return (
    <div className="relative flex h-8 w-8 items-center justify-center text-high-contrast">
      <Bars3Icon
        className={cn(
          'h-6 w-6 translate-y-px transform stroke-current transition-all ease-in-out hover:scale-110 ',
          className
        )}
      />
    </div>
  );
}
