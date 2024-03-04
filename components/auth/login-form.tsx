'use client';
import { ExclamationTriangleIcon, UserIcon as LogInIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { doLogin } from './actions';
import LoadingDots from 'components/loading-dots';
import { useFormState, useFormStatus } from 'react-dom';
import { Alert, AlertTitle } from 'components/ui/alert';
import { Button } from 'components/ui/button';

function SubmitButton(props: any) {
  const { pending } = useFormStatus();
  const buttonClasses =
    'relative flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white';
  //const disabledClasses = 'cursor-not-allowed opacity-60 hover:opacity-60';

  return (
    <>
      {props?.message && (
        <Alert className="my-5" variant="destructive">
          <ExclamationTriangleIcon className="mr-2 h-4 w-4" />
          <AlertTitle>{props?.message}</AlertTitle>
        </Alert>
      )}
      <Button
        onClick={(e: React.FormEvent<HTMLButtonElement>) => {
          if (pending) e.preventDefault();
        }}
        aria-label="Log in"
        aria-disabled={pending}
        className={clsx(buttonClasses, {
          'hover:opacity-90': true,
          'cursor-not-allowed opacity-60 hover:opacity-60': pending
        })}
      >
        {pending ? (
          <>
            <LoadingDots className="mr-2 h-4 w-4" />
            <span>Logging In</span>
          </>
        ) : (
          <>
            <LogInIcon className="hidden md:mr-2 md:flex md:h-4 md:w-4" />
            <span>Log-In</span>
          </>
        )}
      </Button>
    </>
  );
}

export function LoginShopify() {
  const [message, formAction] = useFormState(doLogin, null);

  return (
    <form action={formAction}>
      <SubmitButton message={message} />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
