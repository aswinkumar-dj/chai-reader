"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useWishlistStore } from "@/lib/store/useWishlistStore";
import { BookCard } from "@/components/book/BookCard";

export default function WishlistPage() {
  const items = useWishlistStore((state) => state.items);

  return (
    <main className="p-8">
      <h1 className="text-2xl font-semibold text-foreground">My Wishlist</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {items.length} {items.length === 1 ? "book" : "books"} saved
      </p>

      {items.length === 0 ? (
        <div className="mt-16 flex flex-col items-center text-center">
          <Heart size={40} strokeWidth={1.2} className="text-muted-foreground" />
          <p className="mt-4 text-muted-foreground">
            Your wishlist is empty. Tap the heart on any book to save it here.
          </p>
          <Link
            href="/"
            className="mt-4 text-sm font-medium text-[#1142be] hover:underline"
          >
            Browse books
          </Link>
        </div>
      ) : (
        <div className="mt-8 flex flex-wrap gap-4">
          {items.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </main>
  );
}