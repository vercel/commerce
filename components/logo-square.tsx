import Image from 'next/image';

const { STORE_PREFIX } = process.env;
export default function LogoSquare({ dark = false }: { dark?: boolean }) {
  return (
    <div className="h-12 md:h-[55px]">
      {dark ? (
        <Image
          src={`/${STORE_PREFIX}/dark-logo.svg`}
          alt="Logo"
          width={327}
          height={61}
          className="h-full w-full"
        />
      ) : (
        <Image
          src={`/${STORE_PREFIX}/logo.svg`}
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
