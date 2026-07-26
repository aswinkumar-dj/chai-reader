import type { Review } from "@/lib/mock-data";

export function ReviewItem({ name, text }: Review) {
  return (
    <div className="flex gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#433e38]/10 text-xs font-semibold text-[#433e38]">
        {name[0]}
      </div>
      <div>
        <p className="text-sm font-medium text-foreground">{name}</p>
        <p className="mt-0.5 text-sm text-muted-foreground">{text}</p>
      </div>
    </div>
  );
}