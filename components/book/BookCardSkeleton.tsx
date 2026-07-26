import { Skeleton } from "@/components/ui/Skeleton";

export function BookCardSkeleton() {
  return (
    <div className="w-[191px] shrink-0 rounded-[9px] border border-[#eaeae6] bg-[#f3f2ed] p-[11px]">
      <Skeleton className="h-[252px] w-full" />
      <Skeleton className="mt-3 h-3 w-3/4" />
      <Skeleton className="mt-2 h-3 w-1/2" />
      <Skeleton className="mt-3 h-8 w-full rounded-[6px]" />
    </div>
  );
}