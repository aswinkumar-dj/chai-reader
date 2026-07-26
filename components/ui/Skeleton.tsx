export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded-[9px] bg-black/[0.06] ${className}`} />
  );
}