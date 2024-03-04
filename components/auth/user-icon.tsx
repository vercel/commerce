'use client';
import { UserIcon as User2Icon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

function UserButton(props: any) {
  const buttonClasses =
    'relative flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white';
  //const disabledClasses = 'cursor-not-allowed opacity-60 hover:opacity-60';

  return (
    <>
      <button
        aria-label="My Profile"
        className={clsx(buttonClasses, {
          'hover:opacity-90': true
        })}
      >
        {/*Purposesly a href here and NOT Link component b/c of router caching*/}
        <a href="/account">
          <User2Icon className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </a>
      </button>
    </>
  );
}

export function UserIcon() {
  return <UserButton />;
}
