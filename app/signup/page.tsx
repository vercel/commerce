'use client';

import { useState } from 'react';
import { z } from 'zod';

type FormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const customerSchema = z
  .object({
    username: z.string().min(3),
    email: z.string().email({ message: 'Invalid email' }),
    password: z.string(),
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
  });

export default function SignUpPage() {
  const initialState = { username: '', email: '', password: '', confirmPassword: '' };
  const [formData, setFormData] = useState<FormData>(initialState);
  const [error, setError] = useState<FormData>(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      customerSchema.parse(formData);
      setError(initialState);
      await fetch('/api/customer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: formData.username,
          first_name: '',
          last_name: '',
          email: formData.email,
          password: formData.password
        })
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorObj: FormData = initialState;
        error.errors.forEach((err) => {
          const key = err.path[0] as keyof FormData;
          errorObj[key] = err.message as string;
        });
        console.log(errorObj);
        setError(errorObj);
      }
    }
  };

  return (
    <section className="mx-auto mt-4 grid max-w-screen-2xl justify-center gap-4 px-4 pb-4">
      <h1 className="text-2xl font-bold">Sign up</h1>
      <div className="flex h-screen justify-center">
        <form onSubmit={handleSignup}>
          <div className="mt-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
            />
            {error['username'] && <p className="text-red-500">{error['username']}</p>}
          </div>
          <div className="mt-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
            />
            {error['email'] && <p className="text-red-500">{error['email']}</p>}
          </div>
          <div className="mt-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
            />
            {error['password'] && <p className="text-red-500">{error['password']}</p>}
          </div>
          <div className="mt-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
            />
            {error['confirmPassword'] && <p className="text-red-500">{error['confirmPassword']}</p>}
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-lg font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
