import { headers } from 'next/headers';
export const runtime = 'edge';
export default async function AuthorizationPage() {
  const headersList = headers();
  const access = headersList.get('x-shop-access');
  if (!access) {
    console.log('ERROR: No access header');
    throw new Error('No access header');
  }
  console.log('Authorize Access code header:', access);
  if (access === 'denied') {
    console.log('Access Denied for Auth');
    throw new Error('No access allowed');
  }

  return (
    <>
      <div className="mx-auto max-w-screen-2xl px-4">
        <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-black md:p-12 lg:flex-row lg:gap-8">
          <div className="h-full w-full">Loading...</div>
        </div>
      </div>
    </>
  );
}
