'use client';
import { CloseButton, Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react';
import { ArrowRightIcon } from '@heroicons/react/16/solid';
import { Button } from 'components/button';
import useAuth from 'hooks/use-auth';
import { Menu } from 'lib/shopify/types';
import Link from 'next/link';
import { Fragment } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { doLogin, doLogout } from './actions';
import OpenProfile from './open-profile';

type ProfilePopoverProps = {
  menu: Menu[];
};

function SignInButton({ message }: { message: string | null }) {
  const { pending } = useFormStatus();

  return (
    <>
      {message && <div className="my-5">{message}</div>}
      <Button
        type="submit"
        aria-label="Log in"
        aria-disabled={pending}
        disabled={pending}
        isLoading={pending}
        loadingText="Signing In..."
        className="w-full"
      >
        Sign In
      </Button>
    </>
  );
}

const LogoutButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} type="submit" variant="outlined" className="w-full">
      {pending ? 'Logging Out...' : 'Log Out'}
    </Button>
  );
};
const ProfilePopover = ({ menu }: ProfilePopoverProps) => {
  const [message, action] = useFormState(doLogin, null);
  const [, logoutAction] = useFormState(doLogout, null);
  const { isAuthenticated, loading } = useAuth();

  return (
    <Popover className="relative">
      <PopoverButton aria-label="Open Profile Menu" className="flex">
        <OpenProfile />
      </PopoverButton>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <PopoverPanel className="absolute -right-10 z-50 mt-2 w-72 max-w-lg px-4 sm:px-0 lg:right-0">
          <div className="flex flex-col gap-2 overflow-hidden rounded-md bg-white px-4 py-3 text-black shadow-xl ring-1 ring-black/5">
            <span className="text-sm font-medium">My Account</span>
            {!isAuthenticated && !loading && (
              <form action={action}>
                <SignInButton message={message} />
              </form>
            )}
            {menu.length ? (
              <ul className="flex w-full flex-col divide-y text-sm">
                {isAuthenticated && (
                  <li className="cursor-pointer py-2 hover:underline">
                    <CloseButton
                      as={Link}
                      className="flex w-full flex-row items-center justify-between"
                      href="/account"
                    >
                      My Orders <ArrowRightIcon className="h-3" />
                    </CloseButton>
                  </li>
                )}
                {menu.map((menuItem) => (
                  <li className="cursor-pointer py-2 hover:underline" key={menuItem.title}>
                    <CloseButton
                      as={Link}
                      className="flex w-full flex-row items-center justify-between"
                      href={menuItem.path}
                    >
                      {menuItem.title} <ArrowRightIcon className="h-3" />
                    </CloseButton>
                  </li>
                ))}
              </ul>
            ) : null}
            {isAuthenticated && !loading && (
              <form action={logoutAction}>
                <LogoutButton />
              </form>
            )}
          </div>
        </PopoverPanel>
      </Transition>
    </Popover>
  );
};

export default ProfilePopover;
