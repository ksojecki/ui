import { Skeleton } from '@ksojecki/ui/feedback';

export default function SkeletonBasic() {
  return (
    <div className="flex max-w-sm flex-col gap-2">
      <Skeleton className="h-6 w-1/2" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
    </div>
  );
}
