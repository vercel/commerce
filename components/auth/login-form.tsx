'use client';
import clsx from 'clsx';
import { doLogin } from './actions';
import { useFormState, useFormStatus } from 'react-dom';

function SubmitButton(props: any) {
  const { pending } = useFormStatus();
  const buttonClasses =
    'relative flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white';
  //const disabledClasses = 'cursor-not-allowed opacity-60 hover:opacity-60';

  return (
    <>
      {props?.message && <div className="my-5">{props?.message}</div>}
      <button
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
            <span>Logging In...</span>
          </>
        ) : (
          <>
            <span>Log-In</span>
          </>
        )}
      </button>
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
