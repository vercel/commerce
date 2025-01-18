import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="p-4">
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/" className="hover:text-indigo-500">
        Return Home
      </Link>
    </div>
  );
}
