'use client';
import { ArrowRightEndOnRectangleIcon } from '@heroicons/react/24/outline';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();
  return (
    <button
      type="button"
      className="flex flex-row items-center rounded-md py-1 hover:text-indigo-500"
      onClick={() => {
        signOut({ callbackUrl: '/' });
      }}
    >
      <ArrowRightEndOnRectangleIcon className="me-2 h-4" />
      Logout
    </button>
  );
}
