import Link from 'next/link';

export default function Navbar() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/news">News</Link>
      <Link href="/careers">Careers</Link>
      <Link href="/help">Help</Link>
    </nav>
  );
}
