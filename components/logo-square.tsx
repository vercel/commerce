import clsx from 'clsx';
import LogoIcon from './icons/logo';

export default function LogoSquare({ size }: { size?: 'sm' | undefined }) {
  return (
    <div
      className={clsx(
        'flex flex-none items-center justify-center border-none border-neutral-200 bg-white dark:border-neutral-700 dark:bg-black',
        {
          'h-[120px] w-[120px] rounded-xl': !size,
          'h-[80px] w-[80px] rounded-lg': size === 'sm'
        }
      )}
    >
      <LogoIcon
        className={clsx({
          'h-[120px] w-[120px]': !size,
          'h-[80px] w-[80px]': size === 'sm'
        })}
      />
    </div>
  );
}
