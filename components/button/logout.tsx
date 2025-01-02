'use client';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();
  return (
    <button
      type="button"
      className="w-full rounded-md bg-indigo-500 p-3 text-white"
      onClick={() => {
        signOut({ callbackUrl: '/' });
      }}
    >
      Logout
    </button>
  );
}
