"use client";

import { Trash2 } from "lucide-react";
import { useWishlistStore } from "@/lib/store/useWishlistStore";
import { Breadcrumb } from "@/components/ui/BreadCrumb";

export default function SettingsPage() {
  const items = useWishlistStore((state) => state.items);
  const clearAll = useWishlistStore((state) => state.items.forEach);

  function handleClearWishlist() {
    if (items.length === 0) return;
    if (confirm(`Remove all ${items.length} books from your wishlist?`)) {
      useWishlistStore.setState({ items: [] });
    }
  }

  return (
    <main className="p-8">
      <Breadcrumb items={[{ label: "Browse", href: "/" }, { label: "Settings" }]} />

      <h1 className="mt-2 text-2xl font-semibold text-foreground">
        Settings
      </h1>

      <section className="mt-8 max-w-lg rounded-[12px] border border-border bg-white p-6">
        <h2 className="font-medium text-foreground">Wishlist</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {items.length} {items.length === 1 ? "book" : "books"} currently
          saved.
        </p>
        <button
          type="button"
          onClick={handleClearWishlist}
          disabled={items.length === 0}
          className="mt-4 flex items-center gap-2 rounded-[6px] border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Trash2 size={16} />
          Clear Wishlist
        </button>
      </section>
    </main>
  );
}