'use client';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();
  return (
    <button
      type="button"
      className="rounded-md py-3"
      onClick={() => {
        signOut({ callbackUrl: '/' });
      }}
    >
      Logout
    </button>
  );
}
