import { Separator } from '../ui/separator';
import { Skeleton } from '../ui/skeleton';

export function LoadingCart() {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-20 w-20 rounded-md" />
        <div className="flex-grow space-y-2">
          <Skeleton className="h-6 w-[200px]" />
        </div>
        <div className="text-right">
          <Skeleton className="ml-auto h-4 w-[50px]" />
          <Skeleton className="ml-auto mt-2 h-4 w-[30px]" />
        </div>
      </div>
      <Separator />
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-[100px]" />
        <Skeleton className="h-6 w-[50px]" />
      </div>
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-[80px]" />
        <Skeleton className="h-6 w-[100px]" />
      </div>
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-[80px]" />
        <Skeleton className="h-6 w-[90px]" />
      </div>
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-[60px]" />
        <Skeleton className="h-6 w-[110px]" />
      </div>
    </div>
  );
}
