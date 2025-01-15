'use client';

import { Button, Input } from '@nextui-org/react';
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
      <div className="flex justify-center">
        <form onSubmit={handleSignup} className="flex w-full max-w-md flex-col">
          <div className="mt-4">
            <Input
              type="text"
              name="username"
              label="Username"
              labelPlacement="outside"
              placeholder="Insert username"
              size="lg"
              value={formData.username}
              onChange={handleChange}
              isInvalid={!!error['username']}
              errorMessage={error['username']}
            />
          </div>
          <div className="mt-6">
            <Input
              type="email"
              name="email"
              label="Email"
              labelPlacement="outside"
              placeholder="Insert email"
              size="lg"
              value={formData.email}
              onChange={handleChange}
              isInvalid={!!error['email']}
              errorMessage={error['email']}
              className="mt-1 block w-full"
            />
          </div>
          <div className="mt-6">
            <Input
              type="password"
              name="password"
              label="Password"
              labelPlacement="outside"
              placeholder="Insert password"
              size="lg"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full"
            />
          </div>
          <div className="mt-6">
            <Input
              type="password"
              name="confirmPassword"
              label="Confirm password"
              labelPlacement="outside"
              placeholder="Insert confirm password"
              size="lg"
              value={formData.confirmPassword}
              onChange={handleChange}
              isInvalid={!!error['confirmPassword']}
              errorMessage={error['confirmPassword']}
              className="mt-1 block w-full"
            />
          </div>
          <div className="mt-6">
            <Button
              type="submit"
              className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-lg font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Sign up
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
