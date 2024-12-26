'use client';

import { Dialog, Transition } from '@headlessui/react';
import { UserCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useCart } from 'components/cart/cart-context';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Fragment, useEffect, useState } from 'react';

export default function LoginModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const openLogin = () => setIsOpen(true);
  const closeLogin = () => setIsOpen(false);

  const {setNewCart} = useCart();
  const {data} = useSession();

  useEffect(() => {
    if (data?.user.token) {
      setIsLogged(true);
    }
  }, [data]);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const res = await signIn('credentials', {username, password, redirect: false});
      const cart = await (await fetch('/api/cart')).json();
      setNewCart(cart);
      closeLogin();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <button className="me-2" aria-label="Open cart" onClick={openLogin}>
        <div className="relative flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white">
          <UserCircleIcon className="h-4 transition-all ease-in-out hover:scale-110" />
        </div>
      </button>
      <Transition show={isOpen}>
        <Dialog onClose={closeLogin} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-[.5px]"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100 backdrop-blur-[.5px]"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="fixed bottom-0 right-0 top-0 flex h-full w-full flex-col border-l border-neutral-200 bg-white/80 p-6 text-black backdrop-blur-xl md:w-[390px] dark:border-neutral-700 dark:bg-black/80 dark:text-white">
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">Login</p>
                <button aria-label="Close cart" onClick={closeLogin}>
                  <div className="relative flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white">
                    <XMarkIcon className="h-6 transition-all ease-in-out hover:scale-110" />
                  </div>
                </button>
              </div>
              {!isLogged ? ( <form onSubmit={handleLogin}>
                <div className="mt-4">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
                    required
                  />
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
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
                    required
                  />
                </div>
                <div className="mt-6">
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-lg font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Login
                  </button>
                </div>
              </form>) : (
                <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
                  <p className="mt-6 text-center text-2xl font-bold">You are logged in.</p>
                  <button className="mt-6 flex" onClick={() => signOut()}>
                    Sign out
                  </button>
                </div>
              )}
             
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
