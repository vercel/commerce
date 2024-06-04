import Image from 'next/image';
import Link from 'next/link';

const ButtonLink = ({ link }: { link: { text: string; url: string } }) => {
  return (
    <Link href={link.url} className="relative w-fit px-5 py-2 text-white">
      <Image
        src="background.svg"
        alt="button background"
        className="absolute inset-0 -z-10 h-full w-full rounded object-cover"
        fill
      />
      <div className="text-sm font-medium leading-5 tracking-wide">{link.text}</div>
    </Link>
  );
};

export default ButtonLink;
