"use client";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="mx-auto my-12 flex max-w-xl flex-col border border-seam bg-coal p-8 md:p-12">
      <p className="font-mono text-[10px] tracking-[0.3em] text-clay uppercase">
        Signal lost
      </p>
      <h2 className="font-display mt-3 text-2xl font-bold tracking-[0.12em] uppercase">
        Something broke trail
      </h2>
      <p className="my-4 leading-relaxed text-bone/70">
        There was an issue with our storefront. This could be a temporary
        problem — try your action again.
      </p>
      <button
        className="font-display mx-auto mt-4 flex w-full items-center justify-center bg-bone p-4 text-sm font-semibold tracking-[0.2em] text-night uppercase transition-colors hover:bg-field"
        onClick={() => reset()}
      >
        Try Again
      </button>
    </div>
  );
}
