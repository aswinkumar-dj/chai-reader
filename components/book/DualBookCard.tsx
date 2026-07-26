"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useWishlistStore } from "@/lib/store/useWishlistStore";
import type { Book } from "@/lib/types";

interface DualBookCardProps {
  books: [Book, Book];
}

function MiniWishlistButton({ book }: { book: Book }) {
  const isWishlisted = useWishlistStore((state) => state.isWishlisted(book.id));
  const toggle = useWishlistStore((state) => state.toggle);

  return (
    <button
      type="button"
      aria-label={
        isWishlisted
          ? `Remove ${book.title} from wishlist`
          : `Add ${book.title} to wishlist`
      }
      onClick={(e) => {
        e.preventDefault();
        toggle(book);
      }}
      className="absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-[#f3f2ed] shadow-sm transition-transform hover:scale-110"
    >
      <Heart
        size={13}
        strokeWidth={1.5}
        fill={isWishlisted ? "#c62123" : "none"}
        className={isWishlisted ? "text-[#c62123]" : "text-[#303030]"}
      />
    </button>
  );
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
            <MiniWishlistButton book={book} />
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