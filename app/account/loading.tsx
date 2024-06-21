import Divider from 'components/divider';
import Heading from 'components/ui/heading';
import Skeleton from 'components/ui/skeleton';

export default function Loading() {
  return (
    <div className="p-6">
      <Heading className="pb-4" as="h1">
        Orders
      </Heading>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="flex w-full flex-col rounded border bg-white p-6">
          <div className="flex flex-col gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-20 w-20 flex-none" />
                <Skeleton />
              </div>
            </div>
          </div>
          <Divider />
          <div className="flex flex-col gap-4">
            <div>
              <Skeleton className="mb-2 h-5 w-14" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="w-20" />
          </div>
          <Skeleton className="mt-4 h-11" />
        </div>
      </div>
    </div>
  );
}
