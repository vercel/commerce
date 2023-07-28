import Image from "next/image";

export default function LogoIcon(props: React.ComponentProps<'img'>) {
  return (
    <Image width="100" height="50" src="/logo-square-black.png" alt="scape squared logo" />
  );
}
