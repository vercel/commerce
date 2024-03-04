import { LoginMessage } from 'components/auth/login-message';
export const runtime = 'edge'; //this needs to be here on thie page. I don't know why

export default async function LoginPage() {
  return (
    <>
      <div className="mx-auto max-w-screen-2xl px-4">
        <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-black md:p-12 lg:flex-row lg:gap-8">
          <div className="h-full w-full">
            <LoginMessage />
          </div>
        </div>
      </div>
    </>
  );
}
