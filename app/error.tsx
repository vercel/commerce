'use client';

import { useRouter } from 'next/navigation';

export default function Error({ resetAction }: { resetAction?: () => void }) {
  const router = useRouter();

  // '/'로 이동하는 defaultReset 함수
  const defaultReset = () => {
    router.push('/'); // 메인 페이지로 이동
  };

  return (
    <div className="mx-auto my-4 flex max-w-xl flex-col rounded-lg border border-neutral-200 bg-white p-8 md:p-12 dark:border-neutral-800 dark:bg-black">
      <h2 className="text-xl font-bold">Oh no!</h2>
      <p className="my-2">
        There was an issue with our storefront. This could be a temporary issue, please try your
        action again.
      </p>
      <button
        className="mx-auto mt-4 flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white hover:opacity-90"
        onClick={resetAction || defaultReset}
      >
        Try Again
      </button>
    </div>
  );
}
