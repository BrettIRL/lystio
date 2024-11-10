import { Skeleton } from '@/components/ui/skeleton';

interface ListingSekeletonProps {
  count: number;
}

export function ListingSekeleton({ count }: ListingSekeletonProps) {
  return [...Array(count)].map((_, i) => (
    <div key={i} className="overflow:hidden rounded-md">
      <Skeleton className="aspect-[19/15] w-full" />
      <Skeleton className="mt-4 h-4 w-full" />
      <Skeleton className="mt-4 h-4 w-full" />
      <div className="mt-4 grid grid-cols-3 gap-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  ));
}
