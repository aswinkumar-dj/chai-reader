import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Book } from "@/lib/types";

interface WishlistState {
  items: Book[];
  isWishlisted: (bookId: string) => boolean;
  toggle: (book: Book) => void;
  remove: (bookId: string) => void;
}

// persist() wraps the store so its state is automatically saved to
// localStorage and restored on page load -- without this, the wishlist
// would reset every time you refreshed the browser.
export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      isWishlisted: (bookId) => get().items.some((b) => b.id === bookId),

      toggle: (book) => {
        const exists = get().isWishlisted(book.id);
        set({
          items: exists
            ? get().items.filter((b) => b.id !== book.id)
            : [...get().items, book],
        });
      },

      remove: (bookId) => {
        set({ items: get().items.filter((b) => b.id !== bookId) });
      },
    }),
    {
      name: "chai-reader-wishlist", // localStorage key
    }
  )
);