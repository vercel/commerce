import clsx from 'clsx';
import LogoIcon from './icons/logo';

export default function LogoSquare() {
  return (
    <div className={clsx('flex h-[40px] w-[40px] flex-none items-center justify-center')}>
      <LogoIcon className="h-[16px] w-[16px]" />
    </div>
  );
}
