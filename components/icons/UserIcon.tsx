import { UserCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default async function UserIcon() {
  return (
    <Link href={'/login'} className="ms-2" aria-label="login">
      <div className="relative flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white">
        <UserCircleIcon className="h-4 transition-all ease-in-out hover:scale-110" />
      </div>
    </Link>
  );
}
