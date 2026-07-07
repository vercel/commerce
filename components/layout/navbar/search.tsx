"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Form from "next/form";
import { useSearchParams } from "next/navigation";

export default function Search() {
  const searchParams = useSearchParams();

  return (
    <Form
      action="/search"
      className="w-max-[550px] relative w-full lg:w-80 xl:w-full"
    >
      <input
        key={searchParams?.get("q")}
        type="text"
        name="q"
        placeholder="SEARCH ROASTS"
        autoComplete="off"
        defaultValue={searchParams?.get("q") || ""}
        className="w-full border border-seam bg-coal px-4 py-2 font-mono text-xs tracking-[0.18em] text-bone uppercase placeholder:text-bone/35 focus:border-bone/40"
      />
      <div className="absolute top-0 right-0 mr-3 flex h-full items-center">
        <MagnifyingGlassIcon className="h-4 text-bone/50" />
      </div>
    </Form>
  );
}

export function SearchSkeleton() {
  return (
    <form className="w-max-[550px] relative w-full lg:w-80 xl:w-full">
      <input
        placeholder="SEARCH ROASTS"
        className="w-full border border-seam bg-coal px-4 py-2 font-mono text-xs tracking-[0.18em] text-bone uppercase placeholder:text-bone/35"
      />
      <div className="absolute top-0 right-0 mr-3 flex h-full items-center">
        <MagnifyingGlassIcon className="h-4 text-bone/50" />
      </div>
    </form>
  );
}
