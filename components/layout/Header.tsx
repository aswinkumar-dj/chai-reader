"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, Heart, ShoppingCart } from "lucide-react";

export function Header() {
  const [query, setQuery] = useState("");

  return (
    <header className="flex items-center justify-between gap-6 px-4 py-6 lg:px-0">
      {/* Search bar -- pill shape, matches Figma exactly (white bg,
          #e4e4e4 border, 22px radius = fully rounded at this height) */}
      <div className="flex h-[47px] w-full max-w-[718px] items-center gap-4 rounded-[22px] border border-[#e4e4e4] bg-white px-8">
        <Search size={20} strokeWidth={1.5} className="shrink-0 text-[#1f1f1f] opacity-80" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search book title or author..."
          className="w-full bg-transparent text-sm text-foreground placeholder:text-[#7c7c7c] placeholder:opacity-80 focus:outline-none"
        />
      </div>

      {/* Wishlist / cart / login */}
      <div className="flex shrink-0 items-center gap-6">
        <Link href="/wishlist" aria-label="Wishlist">
          <Heart size={22} strokeWidth={1.5} className="text-[#1f1f1f] transition-transform hover:scale-110" />
        </Link>
        <Link href="/cart" aria-label="Cart">
          <ShoppingCart size={22} strokeWidth={1.5} className="text-[#1f1f1f] transition-transform hover:scale-110" />
        </Link>
        <Link
          href="/login"
          className="rounded-full border border-[#2b2638] px-6 py-2 text-sm text-[#3a3a3a] transition-colors hover:bg-black/5"
        >
          Login
        </Link>
      </div>
    </header>
  );
}