import Image from 'next/image';

export default function LogoSquare({ dark = false }: { dark?: boolean }) {
  return (
    <div className="h-12 md:h-[55px]">
      {dark ? (
        <Image src="/dark-logo.svg" alt="Logo" width={327} height={61} className="h-full w-full" />
      ) : (
        <Image
          src="/logo.svg"
          alt="Logo"
          width={327}
          height={61}
          className="h-full w-full"
          priority
        />
      )}
    </div>
  );
}
