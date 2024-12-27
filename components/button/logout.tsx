'use client';
import { signOut } from 'next-auth/react';

export default function LogoutButton() {
  return (
    <button
      type="button"
      className="w-full rounded-md bg-indigo-500 p-3 text-white"
      onClick={() => signOut({ callbackUrl: '/' })}
    >
      Logout
    </button>
  );
}
