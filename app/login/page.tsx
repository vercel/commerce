'use client';

import { Button, Input } from '@nextui-org/react';
import { getSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    const res = await signIn('credentials', { username, password, redirect: false });
    if (res?.ok) {
      const session = await getSession();
      const roles = session?.user?.roles ?? [];

      if (roles.includes('wcfm_vendor') || roles.includes('administrator')) {
        window.location.href = `${process.env.NEXT_PUBLIC_WOOCOMMERCE}/sso-login?sso_token=${session!.user.token}`;
      } else {
        router.replace('/');
      }
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <section className="mx-auto mt-10 max-w-screen-xl px-4 pb-10">
      <h1 className="mb-12 text-center text-4xl font-bold">Login</h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="flex flex-col items-center justify-center rounded-xl bg-gray-50 p-8 shadow-md dark:bg-gray-900">
          <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-gray-100">
            Sei un cliente?
          </h2>
          <div className="w-full max-w-md">
            {error && <p className="mb-2 text-red-500">{error}</p>}
            <form onSubmit={handleLogin} className="flex flex-col">
              <div className="mt-2">
                <Input
                  type="text"
                  id="username"
                  label="Username"
                  labelPlacement="outside"
                  placeholder="Insert username"
                  size="lg"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="mt-6">
                <Input
                  type="password"
                  id="password"
                  label="Password"
                  labelPlacement="outside"
                  placeholder="Insert password"
                  size="lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mt-6">
                <Button
                  type="submit"
                  className="w-full bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  Login
                </Button>
              </div>
              <span className="mt-6 block text-center text-sm text-gray-600 dark:text-gray-300">
                Don't have an account?{' '}
                <a href="/signup" className="text-indigo-600 hover:underline">
                  Sign up
                </a>
              </span>
            </form>
          </div>
        </div>

        {/* Box Venditore */}
        <div className="flex flex-col items-center rounded-xl bg-gray-50 p-8 shadow-md dark:bg-gray-900">
          <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-gray-100">
            Sei un venditore?
          </h2>
          <p className="mb-6 text-center text-gray-600 dark:text-gray-300">
            Accedi alla tua area riservata per gestire i tuoi prodotti e ordini.
          </p>
          <a href={process.env.NEXT_PUBLIC_WOOCOMMERCE} target="_blank" rel="noopener noreferrer">
            <Button className="w-full bg-indigo-600 text-white hover:bg-indigo-700">Accedi</Button>
          </a>
        </div>
      </div>
    </section>
  );
}
