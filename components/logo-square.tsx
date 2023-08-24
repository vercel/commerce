import clsx from 'clsx';
import Logo from './icons/logo';

export default function LogoSquare({ size }: { size?: 'sm' | undefined }) {
  return (
    <div
      className={clsx('flex flex-none items-center justify-center', {
        'h-[40px] w-[40px]': !size,
        'h-[30px] w-[30px]': size === 'sm'
      })}
    >
      <Logo
        className={clsx({
          'h-[16px] w-[16px]': !size,
          'h-[10px] w-[10px]': size === 'sm'
        })}
      />
    </div>
  );
}
