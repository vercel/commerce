import Image from 'next/image';
import SKLogo from './icons/logo.svg';

export default function LogoSquare({ size }: { size?: 'sm' | undefined }) {
  return (
    <div className={'flex items-center'}>
      <Image
        src={SKLogo}
        alt="Logo"
        width={size === 'sm' ? 10 : 50}
        height={size === 'sm' ? 10 : 50}
        layout="fixed"
      />
    </div>
  );
}
