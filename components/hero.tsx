import Link from 'next/link';
import Navbar from './layout/navbar';

export default function Hero() {
  return (
    <div className="relative min-h-screen">
      <video
        autoPlay
        muted
        loop
        className="absolute left-0 top-0 z-0 h-full w-full object-cover"
        src="/hero.mp4"
      ></video>
      <Navbar />
      <Link href="search/blommor">
        <div className="font-petrona absolute inset-0 flex h-full w-1/2 items-center justify-center text-5xl text-white">
          Blommor
        </div>
      </Link>
      <Link href="search/gront">
        <div className="font-petrona absolute inset-0 left-1/2 flex h-full w-1/2 items-center justify-center text-5xl text-white">
          Grönt
        </div>
      </Link>
    </div>
  );
}
