'use client';

import { Button, Input } from '@nextui-org/react';
import { signIn } from 'next-auth/react';
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
      router.replace('/');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <section className="mx-auto mt-4 grid max-w-screen-2xl justify-center gap-4 px-4 pb-4">
      <h1 className="text-2xl font-bold">Login</h1>
      <div className="flex w-full max-w-md flex-col">
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleLogin} className="flex flex-col">
          <div className="mt-4">
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
              className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-lg font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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
    </section>
  );
}
