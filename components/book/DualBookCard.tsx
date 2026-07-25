"use client";

import Image from "next/image";
import Link from "next/link";
import type { Book } from "@/lib/types";

interface DualBookCardProps {
  books: [Book, Book];
}

export function DualBookCard({ books }: DualBookCardProps) {
  const [first, second] = books;

  return (
    <div className="w-[351px] shrink-0 rounded-[12px] border border-[#eaeae6] bg-[#f3f2ed] p-[11px]">
      <div className="flex gap-2">
        {[first, second].map((book) => (
          <div
            key={book.id}
            className="relative h-[245px] w-1/2 overflow-hidden rounded-[9px] bg-black/5"
          >
            {book.coverUrl ? (
              <Image
                src={book.coverUrl}
                alt={book.title}
                fill
                sizes="170px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center px-1 text-center text-[10px] text-muted-foreground">
                {book.title}
              </div>
            )}
          </div>
        ))}
      </div>

      <Link href={`/book/${first.id}`} className="mt-3 block">
        <p className="truncate text-xs font-medium text-[#303030]">
          {first.title}
        </p>
        <p className="truncate text-xs text-[#1142be]">{first.author}</p>
      </Link>

      <button
        type="button"
        className="mt-3 w-full rounded-[6px] bg-[#121212] py-2 text-xs font-medium text-white transition-opacity hover:opacity-90"
      >
        Read &amp; Chat
      </button>
    </div>
  );
}