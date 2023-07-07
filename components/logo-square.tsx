import clsx from 'clsx';
import LogoIcon from './icons/logo';

export default function LogoSquare({ size }: { size: 'sm' | undefined }) {
  return (
    <div
      className={clsx(
        'flex items-center justify-center border border-gray-200 dark:border-gray-700',
        {
          'h-[40px] w-[40px] rounded-xl': !size,
          'h-[30px] w-[30px] rounded-lg': size === 'sm'
        }
      )}
    >
      <LogoIcon className="h-3 w-3" />
    </div>
  );
}
