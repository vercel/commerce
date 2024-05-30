'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useGlobalTransition } from 'lib/transition';
import { useRouter } from 'next/navigation';

export default function Search({ value }: { value: string }) {
  const router = useRouter();
  const { startTransition } = useGlobalTransition();

  function searchAction(formData: FormData) {
    const search = formData.get('search') as string;
    console.log('starting transition...');
    startTransition(() => {
      router.push(`/search?q=${search}`);
    });
  }

  return (
    <form action={searchAction} className="w-max-[550px] relative w-full lg:w-80 xl:w-full">
      <input
        key={value}
        type="text"
        name="search"
        placeholder="Search for products..."
        autoComplete="off"
        defaultValue={value}
        className="w-full rounded-lg border bg-white px-4 py-2 text-sm text-black placeholder:text-neutral-500 dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
      />
      <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
        <MagnifyingGlassIcon className="h-4" />
      </div>
    </form>
  );
}
