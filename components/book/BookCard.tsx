"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { IconButton } from "@/components/ui/IconButton";
import { Button } from "@/components/ui/Button";
import { useWishlistStore } from "@/lib/store/useWishlistStore";
import type { Book } from "@/lib/types";

const sizeClasses = {
  compact: { wrapper: "w-[161px]", cover: "h-[176px]" },
  standard: { wrapper: "w-[191px]", cover: "h-[252px]" },
} as const;

interface BookCardProps {
  book: Book;
  variant?: keyof typeof sizeClasses;
}

export function BookCard({ book, variant = "standard" }: BookCardProps) {
  const { wrapper, cover } = sizeClasses[variant];

  // Selector functions (the arrow functions passed to useWishlistStore)
  // mean this component only re-renders when THIS book's wishlisted
  // status changes -- not on every wishlist update elsewhere in the app.
  const isWishlisted = useWishlistStore((state) => state.isWishlisted(book.id));
  const toggleWishlist = useWishlistStore((state) => state.toggle);

  return (
    <div
      className={`${wrapper} shrink-0 rounded-[9px] border border-[#eaeae6] bg-[#f3f2ed] p-[11px]`}
    >
      <div className={`relative ${cover} rounded-[9px] overflow-hidden bg-black/5`}>
        {book.coverUrl ? (
          <Image
            src={book.coverUrl}
            alt={book.title}
            fill
            sizes="(max-width: 768px) 40vw, 200px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center px-2 text-center text-xs text-muted-foreground">
            {book.title}
          </div>
        )}

        <IconButton
          icon={
            <Heart
              size={15}
              strokeWidth={1.5}
              fill={isWishlisted ? "#c62123" : "none"}
            />
          }
          aria-label={
            isWishlisted
              ? `Remove ${book.title} from wishlist`
              : `Add ${book.title} to wishlist`
          }
          className="absolute right-2 top-2 h-8 w-8 bg-[#f3f2ed]"
          onClick={(e) => {
            e.preventDefault(); // card is wrapped in a Link -- stop it navigating
            toggleWishlist(book);
          }}
        />
      </div>

      <Link href={`/book/${book.id}`} className="mt-3 block">
        <p className="truncate text-xs font-medium text-[#303030]">
          {book.title}
        </p>
        <p className="truncate text-xs text-[#1142be]">{book.author}</p>
        <Button className="mt-3">Read &amp; Chat</Button>
      </Link>
    </div>
  );
}