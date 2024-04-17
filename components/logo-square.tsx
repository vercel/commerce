import clsx from 'clsx';
import LogoIcon from './icons/logo';

export default function LogoSquare({ sm }: { sm?: boolean }) {
  return (
    <div className={clsx('flex h-[40px] w-[40px] flex-none items-center justify-center')}>
      <LogoIcon
        className={clsx('h-[20px] w-[20px]', {
          'lg:h-[26px] lg:w-[26px]': !sm,
          'lg:h-[20px]lg:w-[20px]': sm
        })}
      />
    </div>
  );
}
