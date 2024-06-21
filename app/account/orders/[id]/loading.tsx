import Skeleton from 'components/ui/skeleton';

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl p-6">
      <div className="mb-6 flex justify-between">
        <div className="flex items-start gap-2">
          <Skeleton className="mt-1 h-6 w-6" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-4 w-36" />
          </div>
        </div>
        <div>
          <Skeleton className="h-9 w-32" />
        </div>
      </div>
      <div className="flex items-start gap-6">
        <div className="flex flex-1 flex-col gap-6">
          <Skeleton className="h-72" />
          <Skeleton className="h-72" />
        </div>
        <div className="hidden md:block md:basis-5/12">
          <Skeleton className="h-80" />
        </div>
      </div>
    </div>
  );
}
