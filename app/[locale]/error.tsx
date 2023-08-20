'use client';

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="mx-auto my-4 flex max-w-xl flex-col rounded-lg p-8 font-serif text-xl text-white md:px-12 md:py-24">
      <h2 className="text-xl font-bold">Oh no!</h2>
      <p className="my-2">
        There was an issue with our store. This could be a temporary issue, please try again.
      </p>
      <button
        className="mx-auto mt-4 flex w-full items-center justify-center bg-white/10 p-4 tracking-wide text-white transition-opacity duration-150 hover:opacity-90"
        onClick={() => reset()}
      >
        Try Again
      </button>
    </div>
  );
}
