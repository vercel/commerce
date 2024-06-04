import Link from 'next/link';

export default function Quicklinks() {
  return (
    <div>
      Quicklinks Block
      <Link href="/tests">Test Menu</Link>
      <Link href="/diseases">Diseases And Conditions</Link>
    </div>
  );
}
