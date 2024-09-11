'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Form from 'next/form';
import { useSearchParams } from 'next/navigation';

export default function Search() {
  const searchParams = useSearchParams();

  return (
    <Form
      action="/search"
      className="w-max-[550px] flex w-full gap-[10px] px-5 py-4 lg:w-80 xl:w-full"
    >
      <div className="flex h-full items-center text-lightText">
        <MagnifyingGlassIcon className="h-4 stroke-2" />
      </div>
      <input
        key={searchParams?.get('q')}
        type="text"
        name="q"
        placeholder="eg. Finos Rerserva"
        autoComplete="off"
        defaultValue={searchParams?.get('q') || ''}
        className="w-full bg-inherit text-base text-lightText placeholder:text-lightText/50 md:text-sm"
      />
    </Form>
  );
}
