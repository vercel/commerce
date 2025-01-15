import clsx from 'clsx';

export default function ProductSuspense() {
  return (
    <div className="md:col-span-2 md:row-span-1">
      <span className="relative block aspect-square h-full w-full">
        <div
          className={clsx(
            'group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border border-neutral-200 bg-white hover:border-blue-600 dark:border-neutral-800 dark:bg-black'
          )}
        >
          <div
            className={clsx(
              'relative h-full w-full bg-gray-200 object-contain dark:bg-black',
              'transition duration-300 ease-in-out group-hover:scale-105'
            )}
          >
            <div
              className={clsx(
                'absolute bottom-0 left-0 flex w-full px-4 pb-4 @container/label',
                'lg:px-20 lg:pb-[35%]'
              )}
            >
              <div className="flex items-center rounded-full border bg-white/70 p-1 text-xs font-semibold text-black backdrop-blur-md dark:border-neutral-800 dark:bg-black/70 dark:text-white">
                <span className="mr-4 line-clamp-2 flex-grow pl-2 leading-none tracking-tight"></span>
              </div>
            </div>
          </div>
        </div>
      </span>
    </div>
  );
}
