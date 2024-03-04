'use client';
import clsx from 'clsx';
import { LogOutIcon, TriangleIcon } from '@heroicons/react/24/outline';
import { doLogout } from './actions';
import LoadingDots from 'components/loading-dots';
import { useFormState, useFormStatus } from 'react-dom';
import { Alert, AlertDescription, AlertTitle } from 'components/ui/alert';

function SubmitButton(props: any) {
  const { pending } = useFormStatus();
  const buttonClasses =
    'relative flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white';
  return (
    <>
      <button
        onClick={(e: React.FormEvent<HTMLButtonElement>) => {
          if (pending) e.preventDefault();
        }}
        aria-label="Log Out"
        aria-disabled={pending}
        className={clsx(buttonClasses, {
          'hover:opacity-90': true,
          'cursor-not-allowed opacity-60 hover:opacity-60': pending
        })}
      >
        <div className="absolute left-0 ml-4">
          {pending ? <LoadingDots className="mb-3 bg-white" /> : <LogOutIcon className="h-5" />}
        </div>
        {pending ? 'Logging out...' : 'Log Out'}
      </button>
      {props?.message && (
        <Alert className="my-5" variant="destructive">
          <TriangleIcon className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{props?.message}</AlertDescription>
        </Alert>
      )}
    </>
  );
}

export function AccountProfile() {
  const [message, formAction] = useFormState(doLogout, null);

  return (
    <form action={formAction}>
      <SubmitButton message={message} />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
