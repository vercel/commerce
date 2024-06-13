'use client';

import { Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react';
import { ArrowRightIcon } from '@heroicons/react/16/solid';
import { Menu } from 'lib/shopify/types';
import { Fragment } from 'react';
import OpenProfile from './open-profile';
import { useFormState, useFormStatus } from 'react-dom';
import { doLogin } from 'components/auth/actions';
import { Button } from 'components/button';

type ProfilePopoverProps = {
  menu: Menu[];
};

function SubmitButton(props: any) {
  const { pending } = useFormStatus();

  return (
    <>
      {props?.message && <div className="my-5">{props?.message}</div>}
      <Button
        onClick={(e: React.FormEvent<HTMLButtonElement>) => {
          if (pending) e.preventDefault();
        }}
        aria-label="Log in"
        aria-disabled={pending}
      >
        {pending ? (
          <>
            <span>Logging In...</span>
          </>
        ) : (
          <>
            <span>Log-In</span>
          </>
        )}
      </Button>
    </>
  );
}
const ProfilePopover = ({ menu }: ProfilePopoverProps) => {
  const [message, formAction] = useFormState(doLogin, null);

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
            <form action={formAction}>
              <SubmitButton message={message} />
              <p aria-live="polite" className="sr-only" role="status">
                {message}
              </p>
            </form>
            {menu.length ? (
              <ul className="mt-2 flex w-full flex-col divide-y text-sm">
                {menu.map((menuItem) => (
                  <li className="cursor-pointer py-2 hover:underline" key={menuItem.title}>
                    <a
                      className="flex w-full flex-row items-center justify-between"
                      href={menuItem.path}
                    >
                      {menuItem.title} <ArrowRightIcon className="h-3" />
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </PopoverPanel>
      </Transition>
    </Popover>
  );
};

export default ProfilePopover;
