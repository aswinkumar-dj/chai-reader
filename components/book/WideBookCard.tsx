"use client";

import Image from "next/image";
import Link from "next/link";
import type { Book } from "@/lib/types";

export function WideBookCard({ book }: { book: Book }) {
  return (
    <div className="flex h-[170px] gap-4 rounded-[12px] border border-border bg-white p-4">
      <div className="relative h-full w-[85px] shrink-0 overflow-hidden rounded-[8px] bg-black/5">
        {book.coverUrl ? (
          <Image
            src={book.coverUrl}
            alt={book.title}
            fill
            sizes="85px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center px-1 text-center text-[10px] text-muted-foreground">
            {book.title}
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <Link href={`/book/${book.id}`} className="min-w-0">
          <p className="truncate text-[15px] font-semibold text-foreground">
            {book.title}
          </p>
        </Link>
        <p className="mt-2 line-clamp-3 flex-1 text-xs leading-relaxed text-muted-foreground">
          {book.description ||
            "No description available for this title yet."}
        </p>

        <button
          type="button"
          className="mt-3 w-full rounded-[6px] bg-[#121212] py-2 text-xs font-medium text-white transition-opacity hover:opacity-90"
        >
          Read &amp; Chat
        </button>
      </div>
    </div>
  );
}